import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session'

import AppContainer from '../imports/ui/App.js';
import Project from '../imports/ui/components/Project.js';
import Profile from '../imports/ui/components/Profile.js';

import Settings from '../imports/ui/pages/Settings.js';
import LandingPage from '../imports/ui/pages/LandingPage.js';
import ListOfProjects from '../imports/ui/pages/ListOfProjects.js';
import NotFound from '../imports/ui/pages/NotFound.js';

if (Meteor.isClient) {
	Accounts.onLogin(() => {
		FlowRouter.go('profile');
	});
	Accounts.onLogout(() => {
		FlowRouter.go('landing-page');
	});

	/*  
		Below is a FlowRouter workaround that prevents route changes
		when users have unsaved changes based on a Session state.
	
		Solution provided by Kadira:
		https://github.com/kadirahq/flow-router/issues/318#issuecomment-161678673
	*/

	// begin //
	let previousPath,
		isReverting,
		routeCounter = 0,
		routeCountOnPopState;

	function preventRouteChange(targetContext) {
		if (Session.get('unsavedChanges')) {
			if (!confirm('Unsaved changes will be lost.\nAre you sure you want to leave this page?')) {
				return true;
			}
			Session.set('unsavedChanges', false);
		}
		return false;
	}

	window.onpopstate = function () {
		routeCountOnPopState = routeCounter;
	};

	FlowRouter.triggers.exit([function (context, redirect, stop) {
		previousPath = context.path;
	}]);

	FlowRouter.triggers.enter([function (context, redirect, stop) {
		routeCounter++;
	  	if (isReverting) {
	    	isReverting = false;
	    	stop();
	  	} else if (preventRouteChange(context)) {
	    	stop();
	    	isReverting = true;
	    	if (routeCountOnPopState == routeCounter - 1) {
	      		setTimeout(function () {
	        		FlowRouter.go(previousPath);
	      		});
	    	} else {
	      		setTimeout(function () {
	        		history.back();
	      		});
	    	}
		}
	}]);
	// end //
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
			main: (props) => (<ListOfProjects {...props} pageId="main"/>),
		});
	}
});

FlowRouter.route('/project/:projectId', {
	name: 'project',
	triggersEnter: [userLoggedIn()],
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
			main: (props) => (<Profile {...props} username={props.currentUser.username} />),
			section: (props) => (<ListOfProjects {...props} 
				username={props.currentUser.username} 
				pageId="section"/>),
		});
	},
});

FlowRouter.route('/profile/:username', {
	name: 'profiles',
	triggersEnter: [userLoggedIn()],
	action(params) {
		mount(AppContainer, {
			main: (props) => (<Profile {...props} username={params.username} />),
			section: (props) => (<ListOfProjects {...props} 
				username={params.username} 
				pageId="section" />),
		});
	}
});

FlowRouter.route('/settings', {
	name: 'settings',
	triggersEnter: [userLoggedIn()],
	action() {
		mount(AppContainer, {
			main: (props) => (<Settings currentUser={props.currentUser} />),
		});
	}
});

FlowRouter.notFound = {
	name: 'not-found',
	action() {
		mount(AppContainer, {
			main: () => <NotFound />,
		});
	}
};