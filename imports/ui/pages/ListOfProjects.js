import React, { Component, PropTypes } from 'react';
import ProjectBox from '../components/ProjectBox.js';
import CreateNewProjectForm from '../components/CreateNewProjectForm.js';

export default class ListOfProjects extends Component {
	handleRemoveProject(projectId) {
		Meteor.call('projects.remove', projectId);
	}

	render() {
		return (
			<section> 
				<CreateNewProjectForm currentUser={this.props.currentUser} />
				{this.props.projects.map(project => (
					<section
						key={project._id} >
						<ProjectBox 
							id={project._id}
							name={project.name}
							createdAt={project.createdAt}
							total={project.total} />
						<input
							type="button"
							onClick={() => this.handleRemoveProject(project._id)}
							value="Remove Project" />
					</section>
				))} 
			</section>
		);
	}
}

ListOfProjects.propTypes = {
	projects: PropTypes.array.isRequired,
};