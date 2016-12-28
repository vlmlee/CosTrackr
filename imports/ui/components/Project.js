import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Item from './Item.js';
import ProjectButtons from './ProjectButtons.js';
import Comments from './Comments.js';
import update from 'immutability-helper';
import { Session } from 'meteor/session';
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

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.itemsList).scrollTop = ReactDOM.findDOMNode(this.refs.itemsList).scrollHeight;
	}

	componentWillUpdate() {
		ReactDOM.findDOMNode(this.refs.itemsList).scrollTop = ReactDOM.findDOMNode(this.refs.itemsList).scrollHeight;
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
		const items = this.state.items;
		const index = items.indexOf(items.find(i => i.id === itemId));
		items[index].name = e.target.value;
		this.setState({ items: items });
		if (!Session.get('unsavedChanges')) {
			Session.set('unsavedChanges', true);
		}
	}

	handleLinkChange(itemId, e) {
		const items = this.state.items;
		const index = items.indexOf(items.find(i => i.id === itemId));
		items[index].link = e.target.value;
		this.setState({ items: items });
		if (!Session.get('unsavedChanges')) {
			Session.set('unsavedChanges', true);
		}
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
		let project = this.state.project;
		let comments = this.props.comments
			.filter(comment => this.state.project._id === comment.projectId);
		let total = this.state.total;
		return (
			<section className="project-page">
				<section className="project-section">
					{ project ? ( 
						<section>
							<h1> { project.name } </h1>
							<h3> { project.createdAt ? moment(project.createdAt.toISOString()).calendar() : '' } </h3>
						</section> )
					: '' }
					<span className="total">
					    <input 
					    	type="text"
					    	readOnly
					    	value={total.toString()}  />
					</span>
					<section 
						ref="itemsList"
						className="items">
						{ this.state.items.length === 0 ? <h1 className="add-item-prompt">Add an item below.</h1> : '' }
						{ this.state.items != [] ?
							this.state.items.map((item, i) => (
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
									{ this.state.items.indexOf(item) + 1 }
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
						<a href="javascript:history.back()">
							<input
								type="button"
								className="btn orange block back"
								value="‹Back" />
						</a> 
					</section>
				</section>
				<section className="comments-section">
					<Comments 
						projectId={this.props.projectId}
						currentUser={this.props.currentUser} 
						comments={comments} />
				</section>
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
