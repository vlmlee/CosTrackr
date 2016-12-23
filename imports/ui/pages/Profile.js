import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import CreateNewProjectForm from '../components/CreateNewProjectForm.js';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<section> 
				This is the profile page 

				<div>
					{this.props.username}
				</div>

			</section>
		);
	}
}

// description
// personal website
// optinal twitter, github, dribbble

