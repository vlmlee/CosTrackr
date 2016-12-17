import React from 'react';

const Comment = (props) => (
	<ul>
		<li> {props.comment.text} </li> 
		<li> {props.comment.createdAt.toString()} </li>
		<li> {props.comment.projectId} </li>
	</ul>
);

export default Comment;