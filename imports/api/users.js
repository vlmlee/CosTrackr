import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

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
	'users.changeEmail' (id, email) {
		check(id, String);
		check(id, String);
		
		Meteor.users.update(id, {
			$set: {
				'emails.0.address': email 
			}
		});
	},
	'users.updateBio' (id, bio) {
		check(id, String);
		check(bio, String);

		Meteor.users.update(id, {
			$set: {
				'profile.bio': bio
			}
		});
	},
	'users.updateWebsite' (id, website) {
		check(id, String);
		check(website, String);

		Meteor.users.update(id, {
			$set: {
				'profile.website': website
			}
		});
	},
	'users.updateProfilePicture' (id, imageData) {
		check(id, String);

		Meteor.users.update(id, {
			$set: {
				'profile.profilePicture': imageData
			}
		}, { $upsert: true });
	}
});