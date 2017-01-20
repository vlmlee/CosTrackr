import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import CreateNewProjectForm from './CreateNewProjectForm.js';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exist: false,
			bio: 'Bio',
			website: 'Personal Website',
			joined: ''
		};
	}

	componentWillMount() {
		this.setState({ joined: this.props.currentUser.createdAt });
	}

	handleEditBio() {
		Meteor.call('profile.changeBio');
	}

	render() {
		return (
			<section className="profile"> 
				<section className="profile-picture">
				</section>
				<p className="profile-name">
					{this.props.currentUser.username}
				</p>
				<p className="profile-location">
				</p>

				<CreateNewProjectForm 
					currentUser={this.props.currentUser} />

				<p onClick={this.handleEditBio} > 
					<span className="edit-bio">
						Edit
					</span> 
					{this.state.bio}
				</p>
				<p> Personal Website </p>
				<p> Joined: {moment(this.state.joined.toISOString())
					.format('MMM Do, YYYY')} </p>
			</section>
		);
	}
}

Profile.propTypes = {
	currentUser: PropTypes.object.isRequired,
};

// description
// personal website
// optinal twitter, github, dribbble