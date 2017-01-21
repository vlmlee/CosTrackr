import React, { Component, PropTypes } from 'react';

const SearchBar = ({ handleSearch }) => (
	<input
		className="input-user search"
		onChange={ (e) => handleSearch(e) }
		placeholder="Search for projects" />
);

SearchBar.proptypes = {
	handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;