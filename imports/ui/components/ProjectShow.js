import React, { Component, PropTypes } from 'react';
import Comments from './Comments.js';

export default class ProjectShow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: '',
		};
		
		this.handleStarProject = this.handleStarProject.bind(this);
		this.handleUnstarProject = this.handleUnstarProject.bind(this);
		this.handleChangeComment = this.handleChangeComment.bind(this);
		this.handleSubmitComment = this.handleSubmitComment.bind(this);
	}

	// Adds the current user's id to the starred list.
	handleStarProject() {
		Meteor.call('projects.star', this.props.id, this.props.currentUser._id);
	}

	// Removes the current user's id from the starred list. 
	handleUnstarProject() {
		Meteor.call('projects.unstar', this.props.id, this.props.currentUser._id);
	}

	handleChangeComment(e) {
		this.setState({ comment: e.target.value });
	}

	handleSubmitComment(e) {
		if (this.state.comment) {
			Meteor.call('comments.insert', this.state.comment, this.props.project._id);
			this.setState({ comment: '' });
		}
	}

	render() {
		return (
			<section>
				<section class="project-heading">
					<h1 className="project-show-name">
						{this.props.project.name}
					</h1>
					<span className="project-show-total">
						{this.props.project.total.toFixed(2)}
					</span>
					<span className="project-show-total-label">
						Total:
					</span>

					<section>
						<span className="project-show-date">
							{this.props.date} 
						</span>
						<span className="project-show-user">
							&nbsp;&nbsp;By: <a href={'/profiles/' + this.props.project.owner}>
								{this.props.project.username}
							</a>
						</span>
					</section>

					{/****************************************************************
						Conditional to display between 'star' and 'unstar' buttons.
						If the user's id is not found within the project's star list,
						then display 'star', and if it is, display 'unstar'. 
					*****************************************************************/}
					{ this.props.project.stars.indexOf(this.props.currentUser._id) === -1 ?
						<input type="button"
							className="project-show-star-btn"
							onClick={this.handleStarProject}
							value="star" />
					: <input type="button"
							className="project-show-star-btn"
							onClick={this.handleUnstarProject}
							value="unstar" /> }

					{/***********************************************************
						Conditional to display an edit link to user if it is the 
						project's owner. If not, does not display it.
					************************************************************/}
					{ this.props.currentUser._id === this.props.project.owner ? 
						<a className="project-show-edit-project" 
							href={"/project/"+this.props.id}>
							Edit project
						</a>
					: '' }

					{/**************************************************************
						Conditional to display the project description or a default
						message if there is no project description.
					***************************************************************/}
					{ this.props.project.description !== '' ? 
						<p className="project-show-description">
							{this.props.project.description}
						</p>
					: ( this.props.currentUser._id === this.props.project.owner ? 
						<p className="project-show-description-empty">
							Add a short description about your project.
						</p> 
						: <p className="project-show-description-empty">
							This project's owner hasn't added a description yet.
						</p> ) }
				</section>
				<section className="project-show-contents">
					<section className="project-show-items"> 
						<section className="project-show-labels">
							<span className="project-show-list-item"> &nbsp; Project Items </span>
							<span className="project-show-price"> Price &nbsp; </span>
						</section>

						{/*****************************************************
							Conditional to display the items in the project or 
							a message stating that there are no items.
						******************************************************/}
						{ this.props.project.items ? 
							( this.props.project.items.map((item, index) => (
								<section key={index}
									className="project-show-item">

									{/**************************************
										Enumerates the items with the index
										of the item. If the item doesn't
										have a name, it doesn't display the
										index or the price.
									***************************************/}
									{ item.name !== '' ? 
										( <section>
											<span className="project-show-item-name">
												&nbsp; {index + 1}) {item.name} 
											</span>
											{ item.price !== '0' ?
												<span className="project-show-item-price"> 
													{parseInt(item.price).toFixed(2)} &nbsp;
												</span>
											: '' } 
										</section> )
									: '' }
									<p className="project-show-item-link"> 
										<a href={item.link}>
											{item.link} 
										</a>
									</p>
								</section>
							)) )
						: <h2> No current items. </h2> }
					</section>

					{/****************************************************
						Displays comments on the right side of the modal.
					*****************************************************/}
					<Comments 
						projectId={this.props.id}
						comments={this.props.comments}
						currentUser={this.props.currentUser} />
				</section>

					{/*****************
						Comment form
					******************/}
					<section className="comment-form" >
						<input type="button" 
							className="comment-submit-btn"
							onClick={this.handleSubmitComment}
							value="Submit" />
						<textarea className="comment-textbox"
							value={this.state.comment}
							onChange={this.handleChangeComment}
							placeholder="Scroll up for older comments" />
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