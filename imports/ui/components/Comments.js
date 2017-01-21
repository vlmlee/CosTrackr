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
		e.preventDefault();
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
		if (ReactDOM.findDOMNode(this.refs.comments).scrollTop !== ReactDOM.findDOMNode(this.refs.comments).scrollHeight) {
			ReactDOM.findDOMNode(this.refs.comments).scrollTop = ReactDOM.findDOMNode(this.refs.comments).scrollHeight;
		}
	}

	render() {
		let comments = this.props.comments
				.filter(comment => this.props.projectId === comment.projectId)
		return (
			<section  
				ref="comments"
				className="comments">
				{ (comments != '') ? (
					<div>
						{ comments.map(comment => (
							<section 
								key={comment._id} >
								<Comment 
									id={comment._id}
									username={comment.username}
									text={comment.text}
									createdAt={comment.createdAt.toString()}
									projectId={comment.projectId} />
									{ this.props.currentUser ? 
										( this.props.currentUser._id === comment.owner ? 
											<input
												type="button"
												className="comment-delete-btn"
												onClick={() => this.handleDeleteComment(comment._id)}
												value="Delete" />
										: '' ) 
									: '' }
							</section>
						))}
					</div>) 
				: <div className="no-comments"> No comments. </div> }
				<section
					className="comment-form" >
					<textarea
						ref="comment"
						className="comment-textbox"
						value={this.state.value}
						onChange={this.handleChange}
						placeholder="Scroll up for older comments" />
					<input 
						type="button" 
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
}