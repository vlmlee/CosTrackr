import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Item extends Component {

	removeItem(e) {
		e.preventDefault();
		Meteor.call();
	}

	render() {
		return(
			<div>
				<label>{this.props.id}</label>
				{ this.props.name ? 
					<input
						defaultValue={this.props.name} /> :
					<input
						placeholder="Enter an item" /> }

				{ this.props.price ? 
					<input 
						defaultValue={this.props.price} /> :
					<input
						placeholder="Enter a price" /> }
				<button
					onClick={this.removeItem}>
					Delete
				</button>
			</div>
		);
	}
}

Item.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
};