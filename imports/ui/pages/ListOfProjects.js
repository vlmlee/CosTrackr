import React, { Component } from 'react';
import ProjectBox from '../components/ProjectBox.js';

export default class ListOfProjects extends Component {
	render() {
		return (
			<div> 
				{this.props.projects.map(project => (
					<ProjectBox 
						key={project._id} 
						project={project} />
				))} 
			</div>
		);
	}
}