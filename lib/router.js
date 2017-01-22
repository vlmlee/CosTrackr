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


// Makes sure users are logged in or redirects them
// to the landing page.
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

/*
	The routes below does not use the spread operator
	in order to prevent unneccessary data loading.
*/

// Individual project page for editing the project.
FlowRouter.route('/project/:projectId', {
	name: 'project',
	triggersEnter: [userLoggedIn()],
	action(params) {
		mount(AppContainer, {
			main: (props) => (<Project projects={props.projects} 
				currentUser={props.currentUser}
				projectId={params.projectId} />),
		});
	}
});

/*
	PageId is set to 'main', 'section', 'profile', and 'profiles'
	to distinguish the each component from each url route to handle
	different layouts.
*/
FlowRouter.route('/projects', {
	name: 'projects',
	action() {
		mount(AppContainer, {
			main: (props) => (<ListOfProjects projects={props.projects}
				comments={props.comments}
				currentUser={props.currentUser}
				id={props.currentUser._id} 
				pageId="main" />),
		});
	}
});

// Current user's profile page.
FlowRouter.route('/profile', {
	name: 'profile',
	triggersEnter: [userLoggedIn()],
	action() {
		mount(AppContainer, {
			main: (props) => (<Profile users={props.users} 
				currentUser={props.currentUser} 
				id={props.currentUser._id}
				pageId="profile" />),
			section: (props) => (<ListOfProjects projects={props.projects}
				comments={props.comments}
				currentUser={props.currentUser}
				id={props.currentUser._id} 
				pageId="section" />),
		});
	},
});

// A user's profile page.
FlowRouter.route('/profiles/:id', {
	name: 'profiles',
	triggersEnter: [userLoggedIn()],
	action(params) {
		mount(AppContainer, {
			main: (props) => (<Profile users={props.users} 
				currentUser={props.currentUser} 
				id={params.id}
				pageId="profiles" />),
			section: (props) => (<ListOfProjects projects={props.projects}
				comments={props.comments}
				currentUser={props.currentUser}
				id={params.id} 
				pageId="section" />),
		});
	}
});

// A user's settings page.
FlowRouter.route('/settings', {
	name: 'settings',
	triggersEnter: [userLoggedIn()],
	action() {
		mount(AppContainer, {
			main: (props) => (<Settings currentUser={props.currentUser} />),
		});
	}
});

// Handles 404 errors.
FlowRouter.notFound = {
	name: 'not-found',
	action() {
		mount(AppContainer, {
			main: () => <NotFound />,
		});
	}
};