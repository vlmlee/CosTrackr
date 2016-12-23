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
		ReactDOM.findDOMNode(this.refs.comments).scrollTop = ReactDOM.findDOMNode(this.refs.comments).scrollHeight;
	}

	render() {
		return (
			<div>
				<section  
					ref="comments"
					className="comments">
					{ (this.props.comments != '') ? (
						<div>
							{this.props.comments.map(comment => (
								<section 
									key={comment._id} >
									<Comment 
										id={comment._id}
										username={this.props.currentUser.username}
										text={comment.text}
										createdAt={comment.createdAt.toString()}
										projectId={comment.projectId} />
										{ this.props.currentUser ? 
											( this.props.currentUser._id === comment.owner ? 
												<input
													type="button"
													className="btn red inline"
													onClick={() => this.handleDeleteComment(comment._id)}
													value="Delete" />
											: '' ) 
										: '' }
								</section>
							))}
						</div>) 
					: <div className="no-comments"> No comments. </div> }
				</section>
				<section>
					<form 
						className="comment-form"
						onSubmit={this.handleSubmitComment}>
						<textarea
							ref="comment"
							className="comment-textbox"
							value={this.state.value}
							onChange={this.handleChange} />
						<input 
							type="submit" 
							className="btn green block submit"
							value="Submit" />
					</form>
				</section>
			</div>
		);
	}
}

Comments.propTypes = {
	projectId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
}

