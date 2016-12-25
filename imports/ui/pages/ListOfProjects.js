import React, { Component, PropTypes } from 'react';
import ProjectBox from '../components/ProjectBox.js';
import CreateNewProjectForm from '../components/CreateNewProjectForm.js';

export default class ListOfProjects extends Component {
	fillEmptyRow() {
		let offset, emptyArray = [];
		if (this.props.pageId === 'main') {
			offset = 5;
		} else {
			offset = 4;
		}
		let numberOfEmptyBoxes = (offset - this.props.projects.length % offset === offset) ? 0 
			: (offset - this.props.projects.length % offset);
		for (i = 0; i < numberOfEmptyBoxes; i++) {
			emptyArray.push('');
		}
		return emptyArray.map(each => <div className="empty-box"></div>);
	}

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
				{this.fillEmptyRow()}
			</section>
		);
	}
}

ListOfProjects.propTypes = {
	projects: PropTypes.array.isRequired,
	currentUser: PropTypes.object,
};