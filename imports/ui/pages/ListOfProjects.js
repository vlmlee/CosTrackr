import React, { Component, PropTypes } from 'react';
import ProjectBox from '../components/ProjectBox.js';
import CreateNewProjectForm from '../components/CreateNewProjectForm.js';
import SearchBar from '../components/SearchBar.js';

export default class ListOfProjects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: false,
			projects: []
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.handleRemoveProject = this.handleRemoveProject.bind(this);
	}

	componentWillMount() {
		const projectList = this.props.pageId === 'section' ? 
			this.props.projects
				.filter(project => project.username === this.props.username) 
			: this.props.projects;
		this.setState({ projects: projectList });
	}

	handleRemoveProject(projectId) {
		Meteor.call('projects.remove', projectId);
		const projects = this.state.projects
			.filter(project => project._id !== projectId);
		this.setState({ projects: projects });
	}

	fillEmptyRow() {
		let emptyArray = [],
			offset = (this.props.pageId === 'section') ? 3 : 5,
			numberOfEmptyBoxes = this.state.search ? 
			((offset - this.state.projects.length % offset === offset) ? 0 
				: (offset - this.state.projects.length % offset)) :
			((offset - this.props.projects.length % offset === offset) ? 0 
				: (offset - this.props.projects.length % offset));
		for (i = 0; i < numberOfEmptyBoxes; i++) {
			emptyArray.push('');
		}
		return emptyArray.map((each, index) => 
			<section key={index} 
				className="empty-box">
			</section>
		);
	}

	handleSearch(e) {
		if (e.target.value) {
			const regex = e.target.value.toLowerCase(),
				searchProjects = this.props.projects
					.filter(project => project.name.toLowerCase().includes(regex));
			this.setState({ search: true, projects: searchProjects });
		} else {
			this.setState({ search: false });
		}
	}

	render() {
		let projects = this.props.pageId === 'section' ? ( 
			this.state.search ? this.state.projects 
				: this.props.projects
					.filter(project => project.username === this.props.username)
			) : (this.state.search ? this.state.projects : this.props.projects);
		return (
			<div>
				<SearchBar 
					handleSearch={this.handleSearch} />
				{ this.state.search ?
					<section className="list-of-projects"> 
						{ projects.map(project => (
							<ProjectBox 
								key={project._id}
								id={project._id}
								project={project}
								comments={this.props.comments}
								currentUser={this.props.currentUser}
								handleRemoveProject={this.handleRemoveProject} />
						))}
						{this.fillEmptyRow()}
					</section>
					: <section className="list-of-projects"> 
						{ projects.map(project => (
							<ProjectBox 
								key={project._id}
								id={project._id}
								project={project}
								comments={this.props.comments}
								currentUser={this.props.currentUser}
								handleRemoveProject={this.handleRemoveProject} />
						)) }
						{this.fillEmptyRow()}
					</section> 
				}
			</div>
		);
	}
}

ListOfProjects.propTypes = {
	projects: PropTypes.array.isRequired,
	comments: PropTypes.array.isRequired,
	currentUser: PropTypes.object,
};