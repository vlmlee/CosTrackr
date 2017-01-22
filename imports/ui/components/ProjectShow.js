import React, { Component, PropTypes } from 'react';
import Comments from './Comments.js';

export default class ProjectShow extends Component {
	constructor(props) {
		super(props);
		this.handleStarProject = this.handleStarProject.bind(this);
		this.handleUnstarProject = this.handleUnstarProject.bind(this);
	}

	handleStarProject() {
		Meteor.call('projects.star', this.props.id, this.props.currentUser._id);
	}

	handleUnstarProject() {
		Meteor.call('projects.unstar', this.props.id, this.props.currentUser._id);
	}

	render() {
		return (
			<section>
				<h1 className="project-show-name">{this.props.project.name}</h1>
				<span className="project-show-total">{this.props.project.total.toFixed(2)}</span>
				<span className="project-show-total-label">Total:</span>

				<p>
					<span className="project-show-date">
						{this.props.date} 
					</span>
					<span className="project-show-user">
						&nbsp;&nbsp;By: 
						<a href={'/profiles/' + this.props.project.owner}>
							{ this.props.project.username }
						</a>
					</span>
				</p>

				{ this.props.project.stars.indexOf(this.props.currentUser._id) === -1 ?
					<input type="button"
						className="star-btn"
						onClick={this.handleStarProject}
						value="star" />
				: <input type="button"
						className="star-btn"
						onClick={this.handleUnstarProject}
						value="unstar" /> }

				{ this.props.currentUser.username === this.props.project.username ? 
					<a className="project-show-edit-project" 
						href={"/project/"+this.props.id}>
						Edit project
					</a>
				: '' }

				{ this.props.project.description !== '' ? 
					<p className="project-show-description">
						{this.props.project.description}
					</p>
				: ( this.props.currentUser.username === this.props.project.username ? 
					<p className="project-show-description-empty">
						Add a short description about your project.
					</p> 
					: <p className="project-show-description-empty">
						This project's owner hasn't added a description yet.
					</p> ) }

				<section className="project-show-contents">
					<section className="project-show-items"> 
						<div>
							<section className="project-show-labels">
								<span className="project-show-list-item"> &nbsp; Item </span>
								<span className="project-show-price"> Price &nbsp; </span>
							</section>
						</div>

						{ this.props.project.items ? 
							( this.props.project.items.map((item, index) => (
								<section key={index}
									className="project-show-item">

									{ item.name !== '' ? 
										<span className="project-show-item-name">
											{index + 1}) {item.name} 
										</span>
									: '' }

									{ item.price !== '0' ?
										<span className="project-show-item-price"> 
											{item.price} 
										</span>
									: '' }

									<p className="project-show-item-link"> 
										{item.link} 
									</p>
								</section>
							)) )
						: <h2> No current items. </h2> }

					</section>
					<Comments 
						projectId={this.props.id}
						comments={this.props.comments}
						currentUser={this.props.currentUser} />
				</section>
			</section>
		);
	}
}

ProjectShow.propTypes = {
	project: PropTypes.object.isRequired,
	comments: PropTypes.array.isRequired,
	currentUser: PropTypes.object.isRequired,
};