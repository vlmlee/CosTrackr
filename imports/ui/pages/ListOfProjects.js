import React, { Component, PropTypes } from 'react';
import ProjectBox from '../components/ProjectBox.js';
import CreateNewProjectForm from '../components/CreateNewProjectForm.js';
import SearchBar from '../components/SearchBar.js';

export default class ListOfProjects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: []
		};
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentWillMount() {
		const projectList = this.props.projects;
		this.setState({ projects: projectList });
	}

	fillEmptyRow() {
		let offset, emptyArray = [];
		if (this.props.pageId === 'main') {
			offset = 5;
		} else {
			offset = 4;
		}
		let numberOfEmptyBoxes = (offset - this.state.projects.length % offset === offset) ? 0 
			: (offset - this.state.projects.length % offset);
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
		const regex = e.target.value.toLowerCase();
		const searchProjects = this.props.projects.filter(project => project.name.toLowerCase().includes(regex));
		this.setState({ projects: searchProjects });
	}

	render() {
		return (
			<div>
				<SearchBar 
					handleSearch={this.handleSearch} />
				<section className="list-of-projects"> 
					{ this.state.projects.map(project => (
						<ProjectBox 
							key={project._id}
							id={project._id}
							name={project.name}
							owner={project.owner}
							createdAt={project.createdAt}
							total={project.total}
							currentUser={this.props.currentUser} />
					))}
					{this.fillEmptyRow()}
				</section>
			</div>
		);
	}
}

ListOfProjects.propTypes = {
	projects: PropTypes.array.isRequired,
	currentUser: PropTypes.object,
};