import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class ProjectBox extends Component {
	constructor(props) {
		super(props);
		this.handleRemoveProject = this.handleRemoveProject.bind(this);
	}

	handleRemoveProject(projectId) {
		Meteor.call('projects.remove', projectId);
	}

	render() {
		return (
			<section className="project-box">
				<ul>
					<li>
						<a href={"/project/"+this.props.id}>
							{this.props.id}
						</a>
					</li>
					<li>{this.props.name}</li>
					<li>{this.props.createdAt ? moment(this.props.createdAt.toISOString()).format('l @ LT') : '' }</li>
					<li>{this.props.total.toFixed(2)}</li>
				</ul>
				{ this.props.currentUser ?
					( this.props.currentUser._id === this.props.owner ? 
						<input
							type="button"
							className="btn red button-project-box"
							onClick={() => this.handleRemoveProject(this.props.id)}
							value="Remove Project" />
					: '' ) 
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