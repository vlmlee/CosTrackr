import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Item from './Item.js'
import Comments from './Comments.js';
import update from 'immutability-helper';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			project: {},
			items: [],
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
				this.setState({ project: project, items: items });
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
		this.setState({ items: items });
	}

	handleSaveItems(e) {
		e.preventDefault();
		Meteor.call('items.update', this.state.project._id, this.state.items);
		alert('Saved!');
	}

	handleRemoveItem(item) {
		this.setState({ items: this.state.items.filter(i => i !== item)});
		Meteor.call('items.update', this.state.project._id, this.state.items);
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

		console.log(this.state.project.private);
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
