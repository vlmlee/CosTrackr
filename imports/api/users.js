import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if (Meteor.isServer) {
	Meteor.publish('directory', function publishUsers() {
		return Meteor.users.find({}, {
			fields: {
				username: 1,
				emails: 1,
				createdAt: 1,
				profile: 1,
			}
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