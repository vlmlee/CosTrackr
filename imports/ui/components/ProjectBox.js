import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class ProjectBox extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.currentUser.username, this.props.owner);
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
								href={"/project/"+this.props.id} >
								View
							</a>
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