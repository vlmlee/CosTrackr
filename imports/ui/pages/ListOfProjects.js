import React, { Component, PropTypes } from 'react';
import ProjectBox from '../components/ProjectBox.js';
import CreateNewProjectForm from '../components/CreateNewProjectForm.js';

export default class ListOfProjects extends Component {
	render() {
		return (
			<section className="list-of-projects"> 
				{ this.props.projects.map(project => (
					<ProjectBox 
						key={project._id}
						id={project._id}
						name={project.name}
						owner={project.owner}
						createdAt={project.createdAt}
						total={project.total}
						currentUser={this.props.currentUser} />
				))} 
			</section>
		);
	}
}

ListOfProjects.propTypes = {
	projects: PropTypes.array.isRequired,
	currentUser: PropTypes.object,
};