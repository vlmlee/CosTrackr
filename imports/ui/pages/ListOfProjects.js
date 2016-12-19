import React, { Component, PropTypes } from 'react';
import ProjectBox from '../components/ProjectBox.js';

export default class ListOfProjects extends Component {
	handleRemoveProject(projectId) {
		Meteor.call('projects.remove', projectId);
	}

	render() {
		return (
			<div> 
				{this.props.projects.map(project => (
					<section
						key={project._id} >
						<ProjectBox 
							id={project._id}
							name={project.name}
							createdAt={project.createdAt}
							total={project.total} />

						<button
							onClick={() => this.handleRemoveProject(project._id)}>
							Remove Project
						</button>
					</section>
				))} 
			</div>
		);
	}
}

ListOfProjects.propTypes = {
	projects: PropTypes.array.isRequired,
};