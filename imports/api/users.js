import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';


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
	'users.changeUsername' (id, username) {
		check(id, String);
		check(username, String);
		Meteor.users.update(id, {
			$set: {
				username: username
			}
		});
	},
	'users.changePassword' (id, password) {
		check(id, String);
		check(password, String);
		Accounts.setPassword(id, password);
	},
	'users.changeEmail' (id, email) {
		check(id, String);
		check(id, String);
		// validate email

		Meteor.users.update(id, {
			$set: {
				'emails.0.address': email 
			}
		});
	}
});