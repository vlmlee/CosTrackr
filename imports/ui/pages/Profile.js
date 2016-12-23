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
				<div>
					{this.props.username}
				</div>

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

