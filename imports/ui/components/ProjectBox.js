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
		};
		let date = this.props.createdAt ? moment(this.props.createdAt.toISOString())
					.format('MMM Do YYYY') : '';
		return (
			<section className="project-box">
				<section className="project-box-date">
					{ date }
				</section>
				<section className="project-box-total">
					{this.props.total.toFixed(2)}
				</section>
				<p className="project-box-name">
					{this.props.name}
				</p>
				<section>
					<span className="star-count">
						{this.props.stars}
					</span>
					<img 
						className="star"
						src={'images/star.svg'} />
				</section>
				<p className="project-box-owner">by {this.props.owner} </p>
				{ this.props.currentUser ?
					( this.props.currentUser.username === this.props.owner ? (
						<div>
							<a  className="project-box-link view" 
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
									name={this.props.name}
									owner={this.props.owner}
									createdAt={date}
									items={this.props.items}
									stars={this.props.stars}
									total={this.props.total}
									currentUser={this.props.currentUser} />
							</SkyLight>
							<a  className="project-box-link remove"
								href=""
								onClick={() => 
									this.props.handleRemoveProject(this.props.id)} >
								Remove
							</a>
						</div> )
					: <a  className="project-box-link view-center" 
						  href={"/project/"+this.props.id}>
						View
					  </a> )
				: '' }
			</section>
		);
	}
}

ProjectBox.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	createdAt: PropTypes.object,
	total: PropTypes.number,
};