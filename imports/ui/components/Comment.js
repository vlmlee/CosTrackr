import React, { PropTypes } from 'react';
import moment from 'moment';

const Comment = ({ username, createdAt, text}) => (
	<section className="comment">
		<p className="comment-username"> {username} </p>
		<p className="comment-text"> {text} </p> 
		<p className="comment-date"> {moment(createdAt).fromNow()} </p>
	</section>
);

Comment.propTypes = {
	username: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	createdAt: PropTypes.object.isRequired,
};

export default Comment;