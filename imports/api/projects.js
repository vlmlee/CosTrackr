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
	'projects.create' (name) {
		check(name, String);
		if (!this.userId) {
			throw new Meteor.Error('error');
		}
		const project = Projects.findOne({name: name});
		if (!project) {
			Projects.insert({
				name: name,
				createdAt: new Date(),
				owner: this.userId,
				username: Meteor.users.findOne(this.userId).username,
				items: [],
				private: true,
				total: 0
			});
		} else {
			throw new Meteor.Error('error');
		}
	},
	'projects.remove' (projectId) {
		check(projectId, String);
		const project = Projects.findOne(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}
		Projects.remove(projectId);
	},
	'projects.privacy' (projectId, privacy) {
		check(projectId, String);
		check(privacy, Boolean);
		const project = Projects.findOne(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}
		Projects.update(projectId, 
			{ $set: { private: privacy } });
	},
	'items.update' (projectId, items, total) {
		check(projectId, String);
		check(total, Number);
		const project = Projects.findOne(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}
		Projects.update(projectId, 
			{ $set: { items: items, total: total } });
	},
	'items.remove' (projectId, itemId) {
		check(projectId, String);
		check(itemId, String);
		const project = Projects.findOne(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}
		Projects.update(projectId, 
			{ $pull: { items: { id: itemId } } });
	},
	'items.sum' (projectId, total) {
		check(projectId, String);
		check(total, Number);
		const project = Projects.findOne(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}
		Projects.update(projectId, 
			{ $set: { total: total } });
	},
});