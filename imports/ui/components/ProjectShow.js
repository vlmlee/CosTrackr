import React, { Component, PropTypes } from 'react';

export default class ProjectShow extends Component {
	constructor(props) {
		super(props);
		this.handleStarProject = this.handleStarProject.bind(this);
	}

	handleStarProject() {
		Meteor.call('projects.star', this.props.id, this.props.currentUser.username);
	}

	render() {
		console.log(this.props.owner);
		console.log(this.props.currentUser.username);
		return (
			<section>
				<h1>{this.props.name}</h1>
				<p>{this.props.createdAt}</p>
				<p>{this.props.description}</p>
				{ this.props.items.length ? (
					<div>{this.props.items.map(item => {
						<ul key={item._id}>
							<li> {item.name} </li>
							<li> {item.price} </li>
							<li> {item.url} </li>
						</ul>
					})} 
					</div>)
				: '' }
				<input
					type="button"
					className="btn"
					onClick={this.handleStarProject}
					value="star" />
				{ this.props.currentUser.username === this.props.owner ? 
					<a href={"/project/"+this.props.id}>Edit project</a>
				: '' }
			</section>
		);
	}
}

ProjectShow.propTypes = {

};