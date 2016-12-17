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

// boilerplate CRUD

Meteor.methods({
	'projects.create' (name) {
		if (!this.userId) {
			throw new Meteor.Error('error');
		}

		Projects.insert({
			name: name,
			createdAt: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
			items: [],
			total: 0
		});
	},
	'projects.remove' (projectId) {
		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}

		Projects.remove(projectId);
	},
	'items.insert' (projectId, name, price) {
		if (!this.userId) {
			throw new Meteor.Error('error');
		}

		const project = Projects.findOne(projectId);

		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}

		Projects.update(projectId, { $push: {
			items: {
				id: { $inc: { seq: 1 } },
				name: name,
				price: price
			}
		}});
	},
	'items.remove' (projectId, itemId) {
		const project = Projects.find(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}

		Projects.update(projectId, { $pull: { 
			items: { id: itemId }
		}});
	},
	'items.sum' (projectId) {
		Projects.update(projectId, { total: 
			{ $sum: "$items.price" }
		});
	}
});