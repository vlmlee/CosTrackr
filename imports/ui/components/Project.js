import React, { Component, PropTypes } from 'react';
import Item from './Item.js'
import Comments from './Comments.js';

export default class Project extends Component {
	constructor(props) {
		super(props);
	}

	createInputField() {
		let project = this.props.projects.find(project => this.props.projectId == project._id);
		let length = project.item.length;
	}

	render() {
		let project = this.props.projects.find(project => this.props.projectId == project._id);
		let comments = this.props.comments.filter(comment => this.props.projectId === comment.projectId);

		return (
			<section>
				{ project ? ( 
					<ul>
						<li> { project.name } </li>
						<li> { project.createdAt.toString() } </li>
					</ul> )
					: '' 
				}

				<button onClick={ () => this.createInputField() }>
					add new input
				</button>

				<Comments 
					projectId={this.props.projectId} 
					comments={comments ? comments : 'No comments'}
					/>
			</section>
		);
	}
}

// <button onClick={ () => this.createInputField() }>
// <button onClick={ () => this.save() }> Save </button>
