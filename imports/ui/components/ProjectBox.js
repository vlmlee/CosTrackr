import React, { Component, PropTypes } from 'react';
import ProjectShow from './ProjectShow.js';
import moment from 'moment';
import SkyLight from 'react-skylight';

export default class ProjectBox extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const modalStyles = {
			position: 'fixed',
			height: 'auto',
			minHeight: '80%',
    		width: '60%',
    		top: '30%',
    		left: '43.5%',
		    zIndex: 99,
		    borderRadius: '5px',
		    padding: '30px',
		    backgroundColor: 'rgba(244, 244, 244, 1)'
		},
		date = this.props.project.createdAt ? 
			moment(this.props.project.createdAt.toISOString())
			.format('MMM Do YYYY') : '';
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
				<section className="star-count">
					<p className="star-count-number">
						{this.props.project.stars.length}
					</p>
				</section>
				<p className="project-box-owner">by {this.props.project.username} </p>
				{ this.props.currentUser ?
					( this.props.currentUser.username === this.props.project.username ? (<div>
							<a className="project-box-link view" 
								onClick={() => this.refs.modal.show()}
								href="" >
								View
							</a>
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
							<a className="project-box-link remove"
								href=""
								onClick={() => 
									this.props.handleRemoveProject(this.props.id)} >
								Remove
							</a>
						</div> )
						: <div>
							<a className="project-box-link view-center" 
								onClick={() => this.refs.modal.show()}
								href="" >
								View
							</a>
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
						</div> )
				: '' }
			</section>
		);
	}
}

ProjectBox.propTypes = {
	id: PropTypes.string,
	project: PropTypes.object.isRequired,
	comments: PropTypes.array.isRequired,
	currentUser: PropTypes.object,
};