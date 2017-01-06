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
				<main className="app">
					<Header 
						currentUser={this.props.currentUser} />
						<section 
							id="container"
							className="container">
							<section className="main-content">
								{this.props.main(this.props)} 
							</section>
							{ this.props.section ? 
								<aside>
									{this.props.section(this.props)}
								</aside>
							: '' }
						</section>
					<Footer />
				</main>
			);
		} else {
			let opts = {
				lines: 20, 
				length: 2,
				width: 2,
				radius: 42,
				opacity: 0.1,
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
	const subProjects = Meteor.subscribe('projects'),
		subComments = Meteor.subscribe('comments'),
		userSubs = Meteor.subscribe('directory');
	const loading = subProjects.ready() 
		&& subComments.ready()
		&& subComments.ready();

	return {
		projects: Projects.find({}, { sort: { createdAt: -1 } }).fetch(),
		comments: Comments.find({}, {sort: { createdAt: 1 } }).fetch(),
		currentUser: Meteor.user(),
		users: Meteor.users.find().fetch(),
		loading: loading,
	};
}, App);