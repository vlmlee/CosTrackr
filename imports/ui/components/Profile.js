import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CreateNewProjectForm from './CreateNewProjectForm.js';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exist: false,
		};
	}

	componentWillMount() {
		let exist = Meteor.users.findOne({username: 'Lee'});
		this.setState({ exist: exist });
	}

	render() {
		return (
			<section className="profile"> 
				<h2>
					{this.props.currentUser.username}
				</h2>

				<CreateNewProjectForm currentUser={this.props.currentUser} />

				<h2> Bio </h2>
				<h2> Personal Website </h2>
				<h2> Joined: </h2>
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

