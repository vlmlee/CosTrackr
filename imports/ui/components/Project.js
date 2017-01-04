import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Comments from './Comments.js';
import { Session } from 'meteor/session';
import ProjectEdit from './ProjectEdit.js';
import SkyLight from 'react-skylight';

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
		const modalStyles = {
			position: 'fixed',
			height: '80%',
    		width: '60%',
    		top: '30%',
    		left: '45%',
		    zIndex: 99,
		    backgroundColor: 'rgba(255, 255, 255,0.8)'
		};
		let project = this.state.project,
			comments = this.props.comments
				.filter(comment => this.state.project._id === comment.projectId),
			items = this.state.items,
			total = this.state.total;
		return (
			<section className="project-page">
				<h1>{ project.name }</h1>
				<ul>
					{ items ? items.map(item => (
						<div 
							key={item.id}>
							<li>{ item.name }</li>
							<li>{ item.price }</li>
							<li>
								<a href={ 'https://' + item.link }>{ item.link }</a>
							</li>
						</div>
					)) : '' }
				</ul>
				<h2>{ total }</h2>
				<div>
					<input
						type="button"
						className="btn blue"
						value="Edit"
						onClick={() => this.refs.modal.show()} />
				</div>
				<SkyLight 
					hideOverlayClicked
					dialogStyles={modalStyles}
					ref="modal" >
					<ProjectEdit 
						project={project}
						items={items}
						total={total}
						currentUser={this.props.currentUser}
						handleNameChange={this.handleNameChange}
						handlePriceChange={this.handlePriceChange}
						handleLinkChange={this.handleLinkChange}
						createNewItem={this.createNewItem} 
						handleRemoveItem={this.handleRemoveItem}
						handleSaveItems={this.handleSaveItems}
						toggleMakePublic={this.toggleMakePublic} />
				</SkyLight>
				<a href="javascript:history.back()">
					<input
						type="button"
						className="btn orange block back"
						value="‹Back" />
				</a> 
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
