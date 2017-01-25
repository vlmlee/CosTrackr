import React, { PropTypes } from 'react';
import moment from 'moment';

const Comment = ({ id, username, createdAt, text}) => (
	<section className="comment">
		<a href={'/profiles/' + id} className="comment-username">{username}</a>
		<p className="comment-text">{text}</p> 
		<p className="comment-date">{moment(createdAt).fromNow()}</p>
	</section>
);

Comment.propTypes = {
	id: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	createdAt: PropTypes.object.isRequired,
};

export default Comment;