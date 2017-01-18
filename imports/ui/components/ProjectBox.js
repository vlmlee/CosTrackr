import React, { Component, PropTypes } from 'react';
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
			'min-height': '80%',
    		width: '60%',
    		top: '30%',
    		left: '45%',
		    zIndex: 99,
		    'border-radius': '5px',
		    padding: '30px',
		    backgroundColor: 'rgba(255, 255, 255, 1)'
		};
		return (
			<section className="project-box">
				<section className="project-box-date">{this.props.createdAt ? moment(this.props.createdAt.toISOString())
					.format('MMM Do YYYY') : '' }
				</section>
				<section className="project-box-total">
					{this.props.total.toFixed(2)}
				</section>
				<p className="project-box-name">
					{this.props.name}
				</p>
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
								<h1>Hello</h1>
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

// href={"/project/"+this.props.id}