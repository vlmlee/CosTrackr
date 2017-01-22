import React, { Component, PropTypes } from 'react';
import ProjectBox from '../components/ProjectBox.js';
import SearchBar from '../components/SearchBar.js';

export default class ListOfProjects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: false,
			projects: [],
		};

		this.handleRemoveProject = this.handleRemoveProject.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentWillMount() {
		// Filters a user's project and set it to this.state if you are in 
		// a profile page and shows all projects when not. 
		const projects = this.props.pageId === 'section' ? 
			this.props.projects.filter(project => project.owner === this.props.id) 
			: this.props.projects;
		this.setState({ projects: projects });
	}

	handleRemoveProject(projectId) {
		Meteor.call('projects.remove', projectId);
		const projects = this.state.projects.filter(project => project._id !== projectId);
		this.setState({ projects: projects });
	}

	handleSearch(e) {
		const projects = this.props.pageId === 'section' ? 
			this.props.projects.filter(project => project.owner === this.props.id)
				: this.props.projects;
		if (e.target.value) {

			// Filters out projects not containing the input search value.
			const regex = e.target.value.toLowerCase(),
				searchProjects = projects
					.filter(project => project.name.toLowerCase().includes(regex));
			this.setState({ search: true, projects: searchProjects });
		} else {
			this.setState({ search: false });
		}
	}

	fillEmptyRow() {
		const projects = this.props.pageId === 'section' ? 
			( this.state.search ? this.state.projects 
				: this.props.projects.filter(project => project.owner === this.props.id) ) 
		: (this.state.search ? this.state.projects : this.props.projects);

		/*
			We fill up the rest of row of projects with empty boxes to make
			our flex grid work correctly. For the profile page, we want to 
			set grid offset to 3, while for the projects page, we set to 5. 
		*/
		let emptyArray = [];
		const offset = (this.props.pageId === 'section') ? 3 : 5,
			numberOfEmptyBoxes = this.state.search ? 
			((offset - projects.length % offset === offset) ? 0 
				: (offset - projects.length % offset)) :
			((offset - projects.length % offset === offset) ? 0 
				: (offset - projects.length % offset));

		for (i = 0; i < numberOfEmptyBoxes; i++) {
			emptyArray.push('');
		}
		return emptyArray.map((each, index) => 
			<section key={index} 
				className="empty-box">
			</section>
		);
	}

	render() {
		// Determines which projects to display based on if we're searching
		// or if we're in a profile page or not. 
		const projects = this.props.pageId === 'section' ? 
			( this.state.search ? this.state.projects 
				: this.props.projects.filter(project => project.owner === this.props.id) ) 
		: (this.state.search ? this.state.projects : this.props.projects);
		return (
			<section>
				<SearchBar 
					handleSearch={this.handleSearch} />

				{/********************************************************
					If the search state is set to true, we display all
					projects matching the input value of the search form.
					If the search state is set to false, we display the 
					projects normally.
				*********************************************************/}
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
						)) }

						{/*******************************************
							Fills up the empty rows with boxes here.
						********************************************/}
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
						
						{/*******************************************
							Fills up the empty rows with boxes here.
						********************************************/}
						{this.fillEmptyRow()}
					</section> 
				}
			</section>
		);
	}
}

ListOfProjects.propTypes = {
	projects: PropTypes.array.isRequired,
	comments: PropTypes.array.isRequired,
	currentUser: PropTypes.object,
};