import React, { Component, PropTypes } from 'react';
import ProjectShow from './ProjectShow.js';
import SkyLight from 'react-skylight';
import moment from 'moment';

export default class ProjectBox extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const modalStyles = {
			position: 'fixed',
			height: 'auto',
			minHeight: '80%',
			minWidth: '680px',
    		width: '60%',
    		top: '29%',
    		left: '43.5%',
		    zIndex: 99,
		    borderRadius: '5px',
		    padding: '30px 30px 30px 50px',
		    backgroundColor: 'rgba(250, 250, 250, 1)'
		},
		date = this.props.project.createdAt ? 
			moment(this.props.project.createdAt.toISOString())
				.format('MMM D YYYY') : '';
		return (
			<section className="project-box">
				<section className="project-box-date">
					{date}
				</section>
				<section className="project-box-total">
					{this.props.project.total.toFixed(2)}
				</section>
				<p className="project-box-name">
					{this.props.project.name}
				</p>
				<section className="project-box-star-count">
					<p className="project-box-star-count-number">
						{this.props.project.stars.length}
					</p>
				</section>
				<p className="project-box-owner"> 

					{/*******************************************
						Conditional to display if the project is 
						private or not.
					********************************************/}
					{ this.props.project.private ? 
						<span className="project-box-privacy">
							(Private) &nbsp; 
						</span> 
					: '' }
					by <a href={'/profiles/' + this.props.project.owner}>
						{this.props.project.username}
					</a>
				</p>

				{/******************************************************
					Conditional to display either 'view/remove' or just
					'view' depending if the current user is the project
					owner or not.
				*******************************************************/}
				{ this.props.currentUser ?
					( this.props.currentUser._id === this.props.project.owner ? 
						( <section>
							<a className="project-box-link project-box-view" 
								onClick={() => this.refs.modal.show()}
								href="" >
								View
							</a>

							{/*********************************************
								Modal activated by view anchor tag 'view',
								and opens the ProjectShow component.
							**********************************************/}
							<SkyLight 
								hideOverlayClicked
								dialogStyles={modalStyles}
								ref="modal" >
								<ProjectShow 
									id={this.props.id}
									date={date}
									project={this.props.project}
									comments={this.props.comments}
									currentUser={this.props.currentUser} />
							</SkyLight>

							{/*****************************************
								Removes the project from the database.
							******************************************/}
							<a className="project-box-link project-box-remove"
								href=""
								onClick={() => 
									this.props.handleRemoveProject(this.props.id)} >
								Remove
							</a>
						</section> )
						: <section>
							<a className="project-box-link project-box-view-center" 
								onClick={() => this.refs.modal.show()}
								href="" >
								View
							</a>
							<SkyLight 
								hideOverlayClicked
								dialogStyles={modalStyles}
								ref="modal" >
								<ProjectShow 
									key={this.props.id}
									id={this.props.id}
									date={date}
									project={this.props.project}
									comments={this.props.comments}
									currentUser={this.props.currentUser} />
							</SkyLight>
						</section> 
					)
				: '' }
			</section>
		);
	}
}

ProjectBox.propTypes = {
	id: PropTypes.string.isRequired,
	project: PropTypes.object.isRequired,
	comments: PropTypes.array.isRequired,
	currentUser: PropTypes.object.isRequired,
};