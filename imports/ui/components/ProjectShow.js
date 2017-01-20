import React, { Component, PropTypes } from 'react';
import Comments from './Comments.js';

export default class ProjectShow extends Component {
	constructor(props) {
		super(props);
		this.handleStarProject = this.handleStarProject.bind(this);
	}

	handleStarProject() {
		Meteor.call('projects.star', this.props.id, this.props.currentUser.username);
	}

	render() {
		return (
			<section>
				<h1>{this.props.project.name}</h1>
				<p>{this.props.date}</p>
				<p>{this.props.project.description}</p>
				<input
					type="button"
					className="btn"
					onClick={this.handleStarProject}
					value="star" />
				{ this.props.currentUser.username === this.props.project.username ? 
					<a href={"/project/"+this.props.id}>Edit project</a>
				: '' }
				{ this.props.project.items.length ? (
					<div>
						{this.props.project.items.map(item => {
							<ul key={item._id}>
								<li> {item.name} </li>
								<li> {item.price} </li>
								<li> {item.url} </li>
							</ul>
						})} 
					</div>)
				: <h2>No current items.</h2> }
				<Comments 
					projectId={this.props.id}
					comments={this.props.comments}
					currentUser={this.props.currentUser} />
			</section>
		);
	}
}

ProjectShow.propTypes = {
	project: PropTypes.object.isRequired,
	comments: PropTypes.array.isRequired,
};