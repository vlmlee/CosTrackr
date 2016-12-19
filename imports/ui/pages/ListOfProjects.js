import React, { Component, PropTypes } from 'react';
import ProjectBox from '../components/ProjectBox.js';

export default class ListOfProjects extends Component {
	render() {
		return (
			<div> 
				{this.props.projects.map(project => (
					<ProjectBox 
						key={project._id} 
						id={project._id}
						name={project.name}
						createdAt={project.createdAt.toString()}
						total={project.total} />
				))} 
			</div>
		);
	}
}

ListOfProjects.propTypes = {
	projects: PropTypes.array.isRequired,
};