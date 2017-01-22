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
			throw new Meteor.Error('You must be logged in to write a comment.');
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
		check(commentId, String);
		const comment = Comments.findOne(commentId);
		if (comment.owner !== this.userId) {
			throw new Meteor.Error('You must be logged in to delete a comment.');
		}
		Comments.remove(commentId);
	},
	'comments.update' (commentId, text) {
		check(commentId, String);
		check(text, String);
		const comment = Comments.findOne(commentId);
		if (comment.owner !== this.userId) {
			throw new Meteor.Error('You must be logged in to edit a comment.');
		}
		Comments.update(commentId, 
			{ $set: { text: text } });
	}
});