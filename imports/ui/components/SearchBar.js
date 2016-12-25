import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ListOfProjects from '../pages/ListOfProjects.js';

export default class SearchBar extends Component {
	render() {
		return (
			<input
				className="input-user search"
				onChange={this.props.handleSearch}
				placeholder="Search for projects" />
		);
	}
}

SearchBar.proptypes = {
	projects: PropTypes.array.isRequired,
};