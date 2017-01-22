import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
	Meteor.publish('projects', function publishProjects() {
		return Projects.find({
			$or: [
				{ private: { $ne: true } },
				{ owner: this.userId }, 
			],
		});
	});
}

Meteor.methods({
	'projects.create' (name, userId) {
		check(name, String);
		if (!this.userId) {
			throw new Meteor.Error('You must be logged in to create a project.');
		}
		const project = Projects.findOne({name: name, owner: userId});
		if (!project) {
			Projects.insert({
				name: name,
				createdAt: new Date(),
				owner: this.userId,
				username: Meteor.users.findOne(this.userId).username,
				description: '',
				items: [],
				private: false,
				total: 0,
				stars: [],
			});
		} else {
			throw new Meteor.Error('Something went wrong. Was not able to create a project.');
		}
	},
	'projects.remove' (projectId) {
		check(projectId, String);
		const project = Projects.findOne(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('You must be the owner of this project to delete it.');
		}
		Projects.remove(projectId);
	},
	'projects.privacy' (projectId, privacy) {
		check(projectId, String);
		check(privacy, Boolean);
		const project = Projects.findOne(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('You must be the owner of this project to change the privacy.');
		}
		Projects.update(projectId, 
			{ $set: { private: privacy } });
	},
	'projects.star' (projectId, id) {
		check(projectId, String);
		check(id, String);

		const project = Projects.findOne(projectId);

		if (project.stars.indexOf(id) === -1) {
			Projects.update(projectId, 
				{ $push: { stars: id } }
			);
		} else {
			throw new Meteor.Error('You have already starred this project!')
		}
	},
	'projects.unstar' (projectId, id) {
		check(projectId, String);
		check(id, String);

		const project = Projects.findOne(projectId);

		if (project.stars.indexOf(id) !== -1) {
			Projects.update(projectId, 
				{ $pull: { stars: id } }
			);
		} else {
			throw new Meteor.Error("You have to star this project first!")
		}
	},
	'items.update' (projectId, items, total) {
		check(projectId, String);
		check(total, Number);
		const project = Projects.findOne(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('You must be the owner of this project to add items to it.');
		}
		Projects.update(projectId, 
			{ $set: { items: items, total: total } });
	},
	'items.remove' (projectId, itemId) {
		check(projectId, String);
		check(itemId, String);
		const project = Projects.findOne(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('You must be the owner of this project to remove items from it.');
		}
		Projects.update(projectId, 
			{ $pull: { items: { id: itemId } } });
	},
});