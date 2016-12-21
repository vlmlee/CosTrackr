import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';

import AppContainer from '../imports/ui/App.js';
import Project from '../imports/ui/components/Project.js';
import UserProjects from '../imports/ui/components/UserProjects.js';

import LandingPage from '../imports/ui/pages/LandingPage.js';
import ListOfProjects from '../imports/ui/pages/ListOfProjects.js';
import Profile from '../imports/ui/pages/Profile.js';
import NotFound from '../imports/ui/pages/NotFound.js';

if (Meteor.isClient) {
	Accounts.onLogin(() => {
		FlowRouter.go('profile');
	});
	Accounts.onLogout(() => {
		FlowRouter.go('landing-page');
	});
}

function userLoggedIn() {
	return function(context, redirect, stop) {
		if (Meteor.userId()) {
			route = FlowRouter.current();
		} else {
			FlowRouter.go('landing-page');
		}
	}
}

FlowRouter.route('/', {
	name: 'landing-page',
	action() {
		mount(AppContainer, {
			main: () => (<LandingPage />),
		});
	}
});

FlowRouter.route('/projects', {
	name: 'projects',
	action() {
		mount(AppContainer, {
			main: (props) => (<ListOfProjects {...props} />),
		});
	}
});

FlowRouter.route('/project/:projectId', {
	name: 'project',
	action(params) {
		mount(AppContainer, {
			main: (props) => (<Project {...props} projectId={params.projectId} />),
		});
	}
});

FlowRouter.route('/profile', {
	name: 'profile',
	triggersEnter: [userLoggedIn()],
	action() {
		mount(AppContainer, {
			main: (props) => (<Profile {...props} />),
			section: (props) => (<ListOfProjects {...props} />),
		});
	},
});

FlowRouter.route('/profile/:username', {
	name: 'profile',
	action(params) {
		mount(AppContainer, {
			main: (props, params) => (<Profile {...props} username={params.username} />),
			section: (props) => (<UserProjects {...props} username={params.username} />),
		});
	}
});

FlowRouter.notFound = {
	action() {
		mount(AppContainer, {
			main: () => <NotFound />,
		});
	}
};