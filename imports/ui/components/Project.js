import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import ProjectButtons from './ProjectButtons.js';
import Item from './Item.js';
import SkyLight from 'react-skylight';
import moment from 'moment';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			project: {},
			items: [],
			total: '0'
		};

		Session.set('unsavedChanges', false);
		
		this.createNewItem = this.createNewItem.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleLinkChange = this.handleLinkChange.bind(this);
		this.handleSaveItems = this.handleSaveItems.bind(this);
		this.handleRemoveItem = this.handleRemoveItem.bind(this);
		this.toggleMakePublic = this.toggleMakePublic.bind(this);
	}

	componentWillMount() {
		const project = this.props.projects
			.find(project => this.props.projectId === project._id);
		if (project) {
			this.setState({ 
				project: project, 
				items: project.items, 
				total: project.items.reduce((a, b) => a + Number(b["price"]), 0), 
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
				link: '',
			}])
		});
		Meteor.call( 'items.update', 
			this.state.project._id, 
			this.state.items, 
			this.state.total 
		);
		if (!Session.get('unsavedChanges')) {
			Session.set('unsavedChanges', true);
		}
	}

	handleNameChange(itemId, e) {
		const items = this.state.items,
			index = items.indexOf(items.find(i => i.id === itemId));
		items[index].name = e.target.value;
		this.setState({ items: items });
		if (!Session.get('unsavedChanges')) {
			Session.set('unsavedChanges', true);
		}
	}

	handleLinkChange(itemId, e) {
		const items = this.state.items,
			index = items.indexOf(items.find(i => i.id === itemId));
		items[index].link = e.target.value;
		this.setState({ items: items });
		if (!Session.get('unsavedChanges')) {
			Session.set('unsavedChanges', true);
		}
	}

	handlePriceChange(itemId, e) {
		const items = this.state.items,
			index = items.indexOf(items.find(i => i.id === itemId));
		items[index].price = e.target.value;
		this.handleGetTotal(items);
	}

	handleRemoveItem(item) {
		const items = this.state.items.filter(i => i !== item);
		this.handleGetTotal(items);
	}

	handleGetTotal(items) {
		const total = items.reduce((a, b) => a + Number(b["price"]), 0);
		this.setState({ items: items, total: total });
		Meteor.call( 'items.update', 
			this.state.project._id, 
			this.state.items, 
			this.state.total 
		);
		if (!Session.get('unsavedChanges')) {
			Session.set('unsavedChanges', true);
		}
	}

	handleSaveItems(e) {
		Meteor.call( 'items.update', 
			this.state.project._id, 
			this.state.items, 
			this.state.total 
		);
		if (Session.get('unsavedChanges')) {
			Session.set('unsavedChanges', false);
		}
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
		let project = this.state.project,
			items = this.state.items,
			total = this.state.total;
		return (
			<section className="project-page">
				<section className="project-section">
					<h1>{ project.name }</h1>
					<a href="javascript:history.back()">
						<input
							type="button"
							className="btn orange block back"
							value="‹Back" />
					</a>
					{ project ? 
						( <section>
							<h3> 
								{ project.createdAt ? 
									moment(project.createdAt.toISOString()).calendar() 
								: '' } 
							</h3>
						  </section> )
					: '' }
					<span className="total">
					    <input 
					    	type="text"
					    	readOnly
					    	value={total.toFixed(2)}  />
					</span>
					<section 
						ref="itemsList"
						className="items">
						{ items.length === 0 ? 
							<h1 className="add-item-prompt">
								Add an item below.
							</h1> 
						: '' }
						{ items.length !== 0 ?
							items.map((item, i) => (
							<div
								key={item.id} >
								<Item
									id={item.id}
									name={item.name}
									price={item.price}
									link={item.link}
									projectId={project._id}
									handleNameChange={this.handleNameChange}
									handlePriceChange={this.handlePriceChange}
									handleLinkChange={this.handleLinkChange} />
								<input
									type="button"
									className="btn red inline"
									onClick={() => this.handleRemoveItem(item)}
									value="Delete" />
								<div className="item-index">
									{ items.indexOf(item) + 1 }
								</div>
							</div> ))
						: ''}
					</section>
					<section className="all-buttons">
						{ this.props.currentUser ? 
							(this.props.currentUser._id === project.owner ? 
								<ProjectButtons 
									owner={project.owner}
									currentUser={this.props.currentUser}
									createNewItem={this.createNewItem} 
									toggleMakePublic={this.toggleMakePublic}
									handleSaveItems={this.handleSaveItems} />
							: '' )
						: '' }
					</section>
				</section>
			</section>
		);
	}
}

Project.propTypes = {
	projectId: PropTypes.string.isRequired,
	projects: PropTypes.array.isRequired,
	currentUser: PropTypes.object.isRequired,
};
