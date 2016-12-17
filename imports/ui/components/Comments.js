import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Comment from './Comment.js';

export default class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "Type in a comment"
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ text: e.target.value.trim() });
	}

	handleCommentSubmit(e) {
		e.preventDefault();
		Meteor.call('comments.insert', this.state.text, this.props.projectId);
		ReactDOM.findDOMNode(this.refs.comment).value = '';
	}

	render() {
		return (
			<section>
				<div>
					{ (this.props.comments != '') ? (
						<div>
							{this.props.comments.map(comment => (
								<Comment 
									key={comment._id}
									comment={comment} />
							))}
						</div>) 
					: <div> No comments. </div> }
				</div>
				<div>
					<h2> Add a comment </h2>
					<form 
						onSubmit={this.handleCommentSubmit}>
						<textarea
							ref="comment"
							value={this.state.value}
							onChange={this.handleChange} />
						<input type="submit" value="Submit" />
					</form>
				</div>
			</section>
		);
	}
}

Comments.propTypes = {
	projectId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
}

