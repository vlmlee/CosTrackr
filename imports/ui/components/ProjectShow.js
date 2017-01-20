import React, { Component, PropTypes } from 'react';
import Comments from './Comments.js';

export default class ProjectShow extends Component {
	constructor(props) {
		super(props);
		this.handleStarProject = this.handleStarProject.bind(this);
		this.handleUnstarProject = this.handleUnstarProject.bind(this);
	}

	handleStarProject() {
		Meteor.call('projects.star', this.props.id, this.props.currentUser.username);
	}

	handleUnstarProject() {
		Meteor.call('projects.unstar', this.props.id, this.props.currentUser.username);
	}

	render() {
		return (
			<section>
				<h1>{this.props.project.name}</h1>
				<p>{this.props.date}</p>
				<p>{this.props.project.description}</p>
				{ this.props.project.stars
					.indexOf(this.props.currentUser.username) === -1 ?
					<input type="button"
						className="btn"
						onClick={this.handleStarProject}
						value="star" />
				: <input type="button"
						className="btn"
						onClick={this.handleUnstarProject}
						value="unstar" /> }
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