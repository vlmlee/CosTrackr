import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Comment from './Comment.js';

export default class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmitComment = this.handleSubmitComment.bind(this);
		this.handleDeleteComment = this.handleDeleteComment.bind(this);
	}

	handleChange(e) {
		this.setState({ text: e.target.value.trim() });
	}

	handleSubmitComment(e) {
		if (this.state.text) {
			Meteor.call('comments.insert', this.state.text, this.props.projectId);
			this.setState({ text: '' });
			ReactDOM.findDOMNode(this.refs.comment).value = '';
		}
	}

	handleDeleteComment(commentId) {
		Meteor.call('comments.remove', commentId);
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.comments).scrollTop = ReactDOM.findDOMNode(this.refs.comments).scrollHeight;
	}

	componentWillUpdate() {
	  const commentsWindow = ReactDOM.findDOMNode(this);
	  this.scrollHeight = commentsWindow.scrollHeight;
	  this.scrollTop = commentsWindow.scrollTop;
	}
	 
	componentDidUpdate() {
	  const commentsWindow = ReactDOM.findDOMNode(this);
	  commentsWindow.scrollTop = this.scrollTop + (commentsWindow.scrollHeight - this.scrollHeight);
	}

	render() {
		const comments = this.props.comments
				.filter(comment => this.props.projectId === comment.projectId);
		return (
			<section ref="comments"
				className="comments">

				{/**************************************************
					Conditional that displays the comments if 
					there are any, else it displays a 'No comments' 
					message.
				***************************************************/}
				{ (comments != '') ? (
					<section>
						{ comments.map(comment => (
							<section key={comment._id} >
								<Comment 
									username={comment.username}
									createdAt={comment.createdAt}
									text={comment.text} />

									{/****************************************
										Conditional that displays the delete
										button if the comment owner is the
										current user, otherwise it is blank.
									*****************************************/}
									{ this.props.currentUser ? 
										( this.props.currentUser._id === comment.owner ? 
											<input type="button"
												className="comment-delete-btn"
												onClick={() => this.handleDeleteComment(comment._id)}
												value="Delete" />
										: '' ) 
									: '' }
							</section>
						)) }
					</section> ) 
				: <section className="no-comments"> No comments. </section> }

				{/*******************************************************
					Conditional that displays the number of comments if 
					there are any comments, otherwise it is hidden. 
				********************************************************/}
				<p className="comments-count">
					{ comments.length ? 
						( comments.length === 1 ? 
							<span>{comments.length} comment</span>
						: <span>{comments.length} comments</span> )
					: '' }
				</p>

				{/*****************
					Comment form
				******************/}
				<section className="comment-form" >
					<textarea ref="comment"
						className="comment-textbox"
						value={this.state.value}
						onChange={this.handleChange}
						placeholder="Scroll up for older comments" />
					<input type="button" 
						className="comment-submit-btn"
						onClick={this.handleSubmitComment}
						value="Submit" />
				</section>
			</section>
		);
	}
}

Comments.propTypes = {
	projectId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	currentUser: PropTypes.object.isRequired,
};