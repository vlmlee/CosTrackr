import React, { Component, PropTypes } from 'react';
import Item from './Item.js'
import ProjectButtons from './ProjectButtons.js';
import Comments from './Comments.js';
import update from 'immutability-helper';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			project: {},
			items: [],
			saved: false,
			total: 0
		};
		this.createNewItem = this.createNewItem.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleSaveItems = this.handleSaveItems.bind(this);
		this.handleRemoveItem = this.handleRemoveItem.bind(this);
		this.toggleMakePublic = this.toggleMakePublic.bind(this);
	}

	componentWillMount() {
		let items = [];
		const project = this.props.projects
			.find(project => this.props.projectId === project._id);
		if (project) {
			items = project.items;
			this.setState({ 
				project: project, 
				items: project.items, 
				total: items.reduce((a, b) => a + Number(b["price"]), 0), 
			});
		}
	}

	createNewItem() {
		let id = this.generateRandomId();
		this.setState({ 
			items: this.state.items.concat([{
				id: id,
				name: '',
				price: '0',
			}])
		});
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
		this.handleGetTotal(items);
	}

	handleRemoveItem(item) {
		let items = this.state.items.filter(i => i !== item);
		this.handleGetTotal(items);
	}

	handleGetTotal(items) {
		let total = items.reduce((a, b) => a + Number(b["price"]), 0);
		this.setState({ items: items, total: total });
	}

	handleSaveItems(e) {
		e.preventDefault();
		Meteor.call( 'items.update', 
			this.state.project._id, 
			this.state.items, 
			this.state.total 
		);
		this.setState({ saved: true });
		alert('Saved!');
	}

	toggleMakePublic() {
		const project = this.state.project;
		project.private = !this.state.project.private;
		this.setState({ project: project });
		Meteor.call('projects.privacy', 
			this.state.project._id, 
			project.private
		);
	}

	generateRandomId() {
		let randomId = '';
        for (var i = 0; i < 16; i++) {
            randomId += 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
            	.charAt( Math.floor( Math.random() * (62) ));
        }
		return randomId;
	}

	render() {
		let project = this.state.project;
		let comments = this.props.comments
			.filter(comment => this.state.project._id === comment.projectId);
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
							</section> ))
					: '' }
					{ this.props.currentUser ? 
						(this.props.currentUser._id === project.owner ? 
							<input
								type="submit"
								value="Save" />
						: '' )
					: '' }
				</form>
				<span> { total ? total.toFixed(2) : '' } </span>
				{ this.props.currentUser ? 
					(this.props.currentUser._id === project.owner ? 
						<ProjectButtons 
							createNewItem={this.createNewItem} 
							toggleMakePublic={this.toggleMakePublic} />
					: '' )
				: '' }
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
	currentUser: PropTypes.object,
};
