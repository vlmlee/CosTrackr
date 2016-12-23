import React, { PropTypes } from 'react';

const Comment = ({ username, createdAt, text}) => (
	<ul>
		<li> {username} </li>
		<li> {createdAt} </li>
		<li> {text} </li> 
	</ul>
);

Comment.propTypes = {
	username: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
};

export default Comment;