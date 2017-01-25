import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

const Item = ({ id, name, price, link, handleNameChange, handlePriceChange, handleLinkChange }) => (
	<section>
		{ name ? 
			<input className="item-input-name item-input"
				onChange={handleNameChange.bind(this, id)}
				defaultValue={name} /> :
			<input className="item-input-name item-input"
				onChange={handleNameChange.bind(this, id)}
				placeholder="Enter an item" /> }

		{ price !== 0 ? 
			<input className="item-input-price item-input"
				pattern="[0-9]"
				onChange={handlePriceChange.bind(this, id)}
				defaultValue={parseFloat(price).toFixed(2)} /> :
			<input className="item-input-price item-input"
				pattern="[0-9]"
				onChange={handlePriceChange.bind(this, id)}
				placeholder="Enter a price" /> }

		{ link ? 
			<input className="item-input-link item-input"
				onChange={handleLinkChange.bind(this, id)}
				defaultValue={link} /> :
			<input className="item-input-link item-input"
				onChange={handleLinkChange.bind(this, id)}
				placeholder="Enter an url to the item (optional)" /> }
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