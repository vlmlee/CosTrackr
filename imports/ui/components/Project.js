import React, { Component, PropTypes } from 'react';
import Item from './Item.js'
import Comments from './Comments.js';
import update from 'immutability-helper';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			project: {},
			items: [],
			total: 0
		};
		this.createNewItem = this.createNewItem.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleSaveItems = this.handleSaveItems.bind(this);
		this.handleRemoveItem = this.handleRemoveItem.bind(this);
	}

	componentWillMount() {
		let items = [];
		setTimeout(() => {
			const project = this.props.projects.find(project => this.props.projectId === project._id);
			if (project) {
				items = project.items;
				let total = items.reduce((a, b) => a + Number(b["price"]), 0);
				this.setState({ project: project, items: items, total: total });
			}
		}, 0);
	}

	createNewItem() {
		let id = this.generateRandomId();
		this.setState({ items: this.state.items.concat([{
			id: id,
			name: '',
			price: '0',
		}])});
	}

	handleNameChange(itemId, e) {
		const items = this.state.items;
		const index = items.indexOf(items.find(i => i.id === itemId));
		items[index].name = e.target.value;
		this.setState({ items: items });
	}

	handlePriceChange(itemId, e) {
		const items = this.state.items;
		const index = items.indexOf(items.find(i => i.id === itemId));
		items[index].price = e.target.value;
		const project = this.state.project;
		this.getTotal(items);
		this.setState({ items: items, project: project});
	}

	handleSaveItems(e) {
		e.preventDefault();
		Meteor.call('items.update', this.state.project._id, this.state.items);
		Meteor.call('items.sum', this.state.project._id, this.state.total);
		alert('Saved!');
	}

	handleRemoveItem(item) {
		let items = this.state.items.filter(i => i !== item);
		this.setState({ items: items });
		this.getTotal(items);
		Meteor.call('items.update', this.state.project._id, this.state.items);
	}

	getTotal(items) {
		let total = items.reduce((a, b) => a + Number(b["price"]), 0);
		this.setState({ total: total });
	}

	makePublic() {
		Meteor.call('projects.privacy', this.state.project._id, !this.state.project.private);
	}

	generateRandomId() {
		let randomId = '';
        for (var i = 0; i < 16; i++) {
            randomId += 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'.charAt(
                Math.floor(Math.random() * (62)));
        }
		return randomId;
	}

	render() {
		let project = this.state.project;
		let comments = this.props.comments.filter(comment => this.state.project._id === comment.projectId);
		let total = this.state.total;
		return (
			<section>
				{ project ? ( 
					<ul>
						<li> { project.name } </li>
						<li> { project.createdAt ? project.createdAt.toString() : '' } </li>
					</ul> )
				: '' }
				<form 
					onSubmit={this.handleSaveItems} >
					{ this.state.items ? 
						this.state.items.map((item, i) => (
							<section key={item.id}>
								<Item
									id={item.id}
									name={item.name}
									price={item.price}
									projectId={project._id}
									handleNameChange={this.handleNameChange}
									handlePriceChange={this.handlePriceChange} />
								<input
									type="button"
									onClick={() => this.handleRemoveItem(item)}
									value="Delete" />
							</section> 
					)) : '' }
					<input
						type="submit"
						value="Save" />
				</form>
				<span> {total ? total : ''} </span>
				<input
					type="button" 
					onClick={ () => this.createNewItem() }
					value="Add new input" />
				<input
					type="button"
					onClick={ () => this.makePublic() }
					value="Make Public" />
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
};
