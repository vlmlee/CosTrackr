import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if (Meteor.isServer) {
	Meteor.publish('users', function publishUsers() {
		return Meteor.users.find({}, {
			_id: 0, 
			username: 1,
			emails: 0,
			createdAt: 1,
			profile: 1,
			services: 0,
		});
	});
}

Meteor.methods({
	'users.exist' (username) {
		const user = Meteor.users.findOne({ username: username });
		if (user) {
			return true;
		}
		return false;
	},
});