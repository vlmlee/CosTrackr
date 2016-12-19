import React, { Component, PropTypes } from 'react';
import Item from './Item.js'
import Comments from './Comments.js';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			items: []
		};
		this.createNewItem = this.createNewItem.bind(this);
		this.handleSaveItems = this.handleSaveItems.bind(this);
		this.handleRemoveItem = this.handleRemoveItem.bind(this);
	}

	componentWillMount() {
		let items = [];
		setTimeout(() => {
			const project = this.props.projects.find(project => this.props.projectId === project._id);

			if (project) {
				items = project.items;
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

	handleSaveItems(e) {
		e.preventDefault();
		Meteor.call('items.update', this.props.projectId, this.state.items);
	}

	handleRemoveItem(itemId, e) {
		e.preventDefault();
		Meteor.call('items.remove', this.props.projectId, itemId);
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
					onSubmit={this.handleSaveItems} >
					{ this.state.items ? 
						this.state.items.map(item => (
							<section key={item.id}>
								<Item
									id={item.id}
									name={item.name}
									price={item.price} />
								<input
									type="button"
									onClick={() => this.handleRemoveItem(item.id)}
									value="Delete" />
							</section> 
					)) : '' }
					<input
						type="submit"
						value="Save" />
				</form>
				<input
					type="button" 
					onClick={ () => this.createNewItem() }
					value="Add new input" />
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
