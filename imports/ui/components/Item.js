import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

const Item = ({ id, name, price }) => (
	<section>
		<label>{id}</label>
		{ name ? 
			<input
				defaultValue={name} /> :
			<input
				placeholder="Enter an item" /> }

		{ price ? 
			<input 
				defaultValue={price} /> :
			<input
				placeholder="Enter a price" /> }
	</section>
);

Item.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
};

export default Item;