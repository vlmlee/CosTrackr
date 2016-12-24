import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CreateNewProjectForm from '../components/CreateNewProjectForm.js';

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
					{this.props.username}
				</h2>

				<CreateNewProjectForm currentUser={this.props.currentUser} />
			</section>
		);
	}
}

Profile.propTypes = {
	username: PropTypes.string.isRequired,
};

// description
// personal website
// optinal twitter, github, dribbble

