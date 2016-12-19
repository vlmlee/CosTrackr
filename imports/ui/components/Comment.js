import React, { PropTypes } from 'react';

const Comment = ({ id, text, createdAt, projectId }) => (
	<ul>
		<li> {id} </li>
		<li> {text} </li> 
		<li> {createdAt} </li>
		<li> {projectId} </li>
	</ul>
);

Comment.propTypes = {
	id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	projectId: PropTypes.string.isRequired,
};

export default Comment;