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
		if (!this.userId) {
			throw new Meteor.Error('error');
		}

		Projects.insert({
			name: name,
			createdAt: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
			items: [],
			private: true,
			total: 0
		});
	},
	'projects.remove' (projectId) {
		const project = Projects.findOne(projectId);

		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}

		Projects.remove(projectId);
	},
	'projects.privacy' (projectId, privacy) {
		const project = Projects.findOne(projectId);

		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}

		Projects.update(projectId, { $set: {
			private: privacy
		}});
	},
	'items.update' (projectId, items) {
		const project = Projects.findOne(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}

		Projects.update(projectId, { $set: {
			items: items
		}});
	},
	'items.remove' (projectId, itemId) {
		const project = Projects.findOne(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}

		Projects.update(projectId, { $pull: { 
			items: { id: itemId }
		}});
	},
	'items.sum' (projectId, total) {
		const project = Projects.findOne(projectId);
		if (project.owner !== this.userId) {
			throw new Meteor.Error('error');
		}

		Projects.update(projectId, { $set: {
			total: total
		}});
	}
});