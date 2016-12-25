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
		const projectList = this.props.projects;
		this.setState({ projects: projectList });
	}

	handleRemoveProject(projectId) {
		Meteor.call('projects.remove', projectId);
		const projects = this.props.projects
			.filter(project => project._id !== projectId);
		this.setState({ projects: projects });
	}

	fillEmptyRow() {
		let emptyArray = [];
		let offset = (this.props.pageId === 'main') ? 5 : 4;
		let numberOfEmptyBoxes = this.state.search ? 
			((offset - this.state.projects.length % offset === offset) ? 0 
				: (offset - this.state.projects.length % offset)) :
			((offset - this.props.projects.length % offset === offset) ? 0 
				: (offset - this.props.projects.length % offset));
		for (i = 0; i < numberOfEmptyBoxes; i++) {
			emptyArray.push('');
		}
		return emptyArray.map((each,i) => 
			<div 
				key={i} 
				className="empty-box">
			</div>
		);
	}

	handleSearch(e) {
		if (e.target.value) {
			const regex = e.target.value.toLowerCase();
			const searchProjects = this.props.projects.filter(project => project.name.toLowerCase().includes(regex));
			this.setState({ search: true, projects: searchProjects });
		} else {
			this.setState({ search: false });
		}
	}

	render() {
		console.log(this.state.projects);
		return (
			<div>
				<SearchBar 
					handleSearch={this.handleSearch} />
				{this.state.search ?
					<section className="list-of-projects"> 
						{ this.state.projects.map(project => (
							<ProjectBox 
								key={project._id}
								id={project._id}
								name={project.name}
								owner={project.owner}
								createdAt={project.createdAt}
								total={project.total}
								currentUser={this.props.currentUser}
								handleRemoveProject={this.handleRemoveProject} />
						))}
						{this.fillEmptyRow()}
					</section>
					: <section className="list-of-projects"> 
						{ this.props.projects.map(project => (
							<ProjectBox 
								key={project._id}
								id={project._id}
								name={project.name}
								owner={project.owner}
								createdAt={project.createdAt}
								total={project.total}
								currentUser={this.props.currentUser}
								handleRemoveProject={this.handleRemoveProject} />
						))}
						{this.fillEmptyRow()}
					</section> 
				}
			</div>
		);
	}
}

ListOfProjects.propTypes = {
	projects: PropTypes.array.isRequired,
	currentUser: PropTypes.object,
};