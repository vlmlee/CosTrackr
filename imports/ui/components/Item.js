import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

const Item = ({ id, name, price, handleNameChange, handlePriceChange }) => (
	<section>
		<label>{id}</label>
		{ name ? 
			<input
				onChange={handleNameChange.bind(this, id)}
				defaultValue={name} /> :
			<input
				onChange={handleNameChange.bind(this, id)}
				placeholder="Enter an item" /> }

		{ price ? 
			<input 
				onChange={handlePriceChange.bind(this, id)}
				defaultValue={parseInt(price)} /> :
			<input
				onChange={handlePriceChange.bind(this, id)}
				placeholder="Enter a price" /> }
	</section>
);

Item.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	handleNameChange: PropTypes.func.isRequired,
	handlePriceChange: PropTypes.func.isRequired,
};

export default Item;