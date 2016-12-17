import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '../api/projects.js';
import { Comments } from '../api/comments.js';

import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { };
	}

	render() {
		return (
			<div>
				<Header />
				{this.props.main(this.props)} 
				{this.props.section}
				<Footer />
			</div>
		);
	}
}

App.propTypes = {
	projects: PropTypes.array.isRequired,
	comments: PropTypes.array.isRequired,
	currentUser: PropTypes.object,
};

export default AppContainer = createContainer(props => {
	Meteor.subscribe('projects');
	Meteor.subscribe('comments');

	return {
		projects: Projects.find({}, { sort: { createdAt: -1 } }).fetch(),
		comments: Comments.find({}).fetch(),
		currentUser: Meteor.user(),
	};
}, App);