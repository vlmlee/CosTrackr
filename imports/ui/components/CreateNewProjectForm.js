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
		let name = e.target.value.trim();
		this.setState({ name: name });
	}

	createNewProject(e) {
		e.preventDefault();
		if (this.state.name !== '') {
			Meteor.call('projects.create', this.state.name);
			ReactDOM.findDOMNode(this.refs.createProject).value = '';
			this.setState({ name: '' });
		}
	}

	render() {
		return (
			<div>
				{ this.props.currentUser ? 
					<form
						onSubmit={this.createNewProject}>
						<input
							ref="createProject"
							onChange={this.handleNameChange} />
						<input 
							type="submit" 
							className="btn blue"
							value="Create project" />
					</form>
				: '' }
			</div>
		);
	}
}
