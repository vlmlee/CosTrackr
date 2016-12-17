import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Item extends Component {
	render() {
		return(
			<div>
				<input
					value={this.props.item.name} />
				<input 
					value={this.props.item.price} />
				<button>
					Delete
				</button>
			</div>
		);
	}
}