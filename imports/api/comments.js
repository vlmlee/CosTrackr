import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
	Meteor.publish('comments', function publishComments() {
		return Comments.find({});
	});
}

Meteor.methods({
	'comments.insert' (text, projectId) {
		check(text, String);
		check(projectId, String);
		if (!this.userId) {
			throw new Meteor.Error('error');
		}
		Comments.insert({
			text: text,
			createdAt: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
			projectId: projectId
		});
	},
	'comments.remove' (commentId) {
		const comment = Comments.findOne(commentId);
		if (comment.owner !== this.userId) {
			throw new Meteor.Error('error');
		}
		Comments.remove(commentId);
	},
	'comments.update' (commentId, text) {
		const comment = Comments.findOne(commentId);
		if (comment.owner !== this.userId) {
			throw new Meteor.Error('error');
		}
		Comments.update(commentId, 
			{ $set: { text: text } });
	}
});