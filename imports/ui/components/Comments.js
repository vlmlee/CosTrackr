import React, { Component, PropTypes } from 'react';
import Comment from './Comment.js';

export default class Comments extends Component {
	render() {
		return (
			<div>
				{this.props.comments.map(comment => (
					<Comment 
						key={comment._id}
						comment={comment}
						/>
				))}
			</div>
		);
	}
}

