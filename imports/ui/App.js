import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Projects } from '../api/projects.js';
import { Comments } from '../api/comments.js';

import AccountsUIWrapper from './components/AccountsUIWrapper.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Spinner from 'react-spin';

class App extends Component {
	render() {
		if (this.props.loading) {
			return (
				<div>
					<Header />
					<main>
						{this.props.main(this.props)} 
					</main>
						{ this.props.section ? 
							<section>
								{this.props.section(this.props)}
							</section>
						: '' }
					<Footer />
				</div>
			);
		} else {
			let opts = {
				lines: 13, 
				length: 32,
				width: 14,
				radius: 42,
				opacity: 0.25,
				speed: 0.6
			};
			return (
				<Spinner config={opts} />
			);
		}
	}
}

App.propTypes = {
	projects: PropTypes.array.isRequired,
	comments: PropTypes.array.isRequired,
	currentUser: PropTypes.object,
};

export default AppContainer = createContainer(props => {
	const subProjects = Meteor.subscribe('projects');
	const subComments = Meteor.subscribe('comments');
	const loading = subProjects.ready() && subComments.ready();

	return {
		projects: Projects.find({}, { sort: { createdAt: -1 } }).fetch(),
		comments: Comments.find({}, {sort: { createdAt: 1 } }).fetch(),
		currentUser: Meteor.user(),
		loading: loading,
	};
}, App);