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

			if (project != '') {
				items = project.item;
				this.setState({ items: items });
			}
		}, 400);
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

	handleRemoveItem(itemId) {
		Meteor.call('items.remove', this.props.projectId, itemId);
	}

	render() {
		let project = this.props.projects.find(project => this.props.projectId === project._id);
		let comments = this.props.comments.filter(comment => this.props.projectId === comment.projectId);
		console.log(this.state.items);
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
								<button
									onClick={() => this.handleRemoveItem(item.id)} >
									Delete
								</button>
							</section> 
					)) : '' }
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
