import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import AppContainer from '../imports/ui/App.js';
import ListOfProjects from '../imports/ui/pages/ListOfProjects.js';
import LandingPage from '../imports/ui/pages/LandingPage.js';
import Project from '../imports/ui/components/Project.js';

FlowRouter.route('/', {
	name: 'landing-page',
	action() {
		mount(AppContainer, {
			main: (props) => (<LandingPage {...props} />)
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