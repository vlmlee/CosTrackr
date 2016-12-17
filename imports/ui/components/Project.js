import React, { Component, PropTypes } from 'react';
import Item from './Item.js'
import Comments from './Comments.js';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			items: []
		};
	}

	componentWillMount() {
		let items = [];
		setTimeout(() => {
			const project = this.props.projects.find(project => this.props.projectId === project._id);

			if (project != '') {
				items = project.item;
				this.setState({ items: items });
			}
		}, 500);
	}

	createNewItem() {
		let id = this.state.items.length + 1;
		this.setState({ items: this.state.items.concat([{
			id: id,
			name: '',
			price: 0
		}])});
	}

	saveItems(e) {
		e.preventDefault();
		Meteor.call('items.update', this.props.projectId, this.state.items);
	}

	render() {
		let project = this.props.projects.find(project => this.props.projectId === project._id);
		let comments = this.props.comments.filter(comment => this.props.projectId === comment.projectId);
		return (
			<section>
				{ project ? ( 
					<ul>
						<li> { project.name } </li>
						<li> { project.createdAt.toString() } </li>
					</ul> )
				: '' }

				<form 
					onSubmit={this.saveItems} >
					{ this.state.items.map(item => (
						<Item
							key={item.id}
							id={item.id}
							name={item.name}
							price={item.price} />
					)) }
					<input
						type="submit"
						value="Save" />
				</form>
				<button onClick={ () => this.createNewItem() }>
					add new input
				</button>

				<Comments 
					projectId={this.props.projectId} 
					comments={comments} />
			</section>
		);
	}
}

Project.propTypes = {
	projectId: PropTypes.string.isRequired,
	projects: PropTypes.array.isRequired,
	comments: PropTypes.array.isRequired,
}

// <button onClick={ () => this.createInputField() }>
// <button onClick={ () => this.save() }> Save </button>
