import React, { Component } from 'react';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
		};
		this.handleNameChange = this.handleNameChange.bind(this);
		this.createNewProject = this.createNewProject.bind(this);
	}

	handleNameChange(e) {
		let name = e.target.value.trim();
		this.setState({ name: name });
	}

	createNewProject(e) {
		e.preventDefault();
		Meteor.call('projects.create', this.state.name);
	}

	render() {
		return (
			<section> 
				This is the profile page 
				<form
					onSubmit={this.createNewProject}>
					<input
						onChange={this.handleNameChange} />
					<input 
						type="submit" 
						value="Create project" />
				</form>
			</section>
		);
	}
}