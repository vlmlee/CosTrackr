import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import AppContainer from '../imports/ui/App.js';
import Project from '../imports/ui/components/Project.js';
import UserProjects from '../imports/ui/components/UserProjects.js';

import LandingPage from '../imports/ui/pages/LandingPage.js';
import ListOfProjects from '../imports/ui/pages/ListOfProjects.js';
import Profile from '../imports/ui/pages/Profile.js';
import NotFound from '../imports/ui/pages/NotFound.js';

FlowRouter.route('/', {
	name: 'landing-page',
	action() {
		mount(AppContainer, {
			main: (props) => (<LandingPage {...props} />),
		});
	}
});

FlowRouter.route('/public', {
	name: 'public',
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