import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class CreateNewProjectForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
		};
		
		this.handleNameChange = this.handleNameChange.bind(this);
		this.createNewProject = this.createNewProject.bind(this);
	}

	handleNameChange(e) {
		const name = e.target.value.trim();
		this.setState({ name: name });
	}

	createNewProject(e) {
		e.preventDefault();
		if (this.state.name !== '') {
			Meteor.call('projects.create', this.state.name, this.props.currentUser._id);
			this.setState({ name: '' });
		}
	}

	render() {
		return (
			<section>
				{ this.props.currentUser ? 
					<form onSubmit={this.createNewProject}>
						<input
							ref="createProject"
							className="create-project-input"
							onChange={this.handleNameChange}
							placeholder="Enter the title of your project"
							value={this.state.name} />
						<input 
							type="submit" 
							className="create-project-button btn"
							value="Create project" />
					</form>
				: '' }
			</section>
		);
	}
}

CreateNewProjectForm.propTypes = {
	currentUser: PropTypes.object.isRequired,
}