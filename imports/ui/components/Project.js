import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import ProjectButtons from './ProjectButtons.js';
import Item from './Item.js';
import moment from 'moment';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			project: {},
			description: '',
			items: [],
			total: '0'
		};

		// Our session state makes sure that we are notified when
		// there are unsavedChanges and the window changes page.
		Session.set('unsavedChanges', false);
		
		this.createNewItem = this.createNewItem.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleLinkChange = this.handleLinkChange.bind(this);
		this.handleChangeDescription = this.handleChangeDescription.bind(this);
		this.handleSaveItems = this.handleSaveItems.bind(this);
		this.handleRemoveItem = this.handleRemoveItem.bind(this);
		this.toggleMakePublic = this.toggleMakePublic.bind(this);
	}

	componentWillMount() {
		// Sets the state to the project identified by the url parameter
		const project = this.props.projects
			.find(project => this.props.projectId === project._id);
		if (project) {
			this.setState({ 
				project: project, 
				description: project.description,
				items: project.items, 
				total: project.items.reduce((a, b) => a + Number(b["price"]), 0), 
			});
		}
	}

	createNewItem() {
		// Creates an item into the project's 'items' array with
		// a random 16-character id. 
		let id = this.generateRandomId();
		this.setState({ 
			items: this.state.items.concat([{
				id: id,
				name: '',
				price: '0',
				link: '',
				error: false
			}])
		});
		Meteor.call('items.update', 
			this.state.project._id, 
			this.state.description,
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
			index = items.indexOf(items.find(i => i.id === itemId)),
			// If the link enter does not contain http:// or https://
			// protocols, add it to the link before saving.
			link = (e.target.value.search(/^http[s]?\:\/\//) === -1) ? 
				'https://' + e.target.value : e.target.value;

		items[index].link = link;
		this.setState({ items: items });
		if (!Session.get('unsavedChanges')) {
			Session.set('unsavedChanges', true);
		}
	}

	handlePriceChange(itemId, e) {
		const items = this.state.items,
			index = items.indexOf(items.find(i => i.id === itemId));
		items[index].price = e.target.value;
		// The handleGetTotal method handles all the item updating 
		// to the database.
		this.handleGetTotal(items);
	}

	handleRemoveItem(item) {
		const items = this.state.items.filter(i => i !== item);
		this.handleGetTotal(items);
	}

	handleChangeDescription(e) {
		const description = e.target.value;
		this.setState({ description: description });
	}

	handleGetTotal(items) {
		const total = items.reduce((a, b) => a + Number(b["price"]), 0);
		this.setState({items: items, total: total });
		Meteor.call('items.update', 
			this.state.project._id, 
			this.state.description.trim(),
			this.state.items, 
			this.state.total 
		);
		if (!Session.get('unsavedChanges')) {
			Session.set('unsavedChanges', true);
		}
	}

	handleSaveItems(e) {
		if (this.state.items.filter(i => i.name === '').length !== 0) {
			alert('You cannot have blank item names!');
		} else if (isNaN(this.state.total)) {
			alert('Your total must be a number!');
		} else {
			Meteor.call( 'items.update', 
				this.state.project._id, 
				this.state.description.trim(),
				this.state.items, 
				this.state.total 
			);
			if (Session.get('unsavedChanges')) {
				Session.set('unsavedChanges', false);
			}
			alert('Saved!');
		}
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

	componentWillUpdate() {
	  const commentsWindow = ReactDOM.findDOMNode(this);
	  this.scrollHeight = commentsWindow.scrollHeight;
	  this.scrollTop = commentsWindow.scrollTop;
	}
	 
	componentDidUpdate() {
	  const commentsWindow = ReactDOM.findDOMNode(this);
	  commentsWindow.scrollTop = this.scrollTop + (commentsWindow.scrollHeight - this.scrollHeight);
	}

	generateRandomId() {
		let randomId = '';
        for (let i = 0; i < 16; i++) {
            randomId += 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
            	.charAt( Math.floor( Math.random() * (62) ));
        }
		return randomId;
	}

	render() {
		const project = this.state.project,
			items = this.state.items,
			total = this.state.total;
		return (
			<section className="project-page">
				<section className="project-section">

					{/* Project total that is floating right*/}
					<span className="project-total">
					    <input type="text"
					    	readOnly
					    	value={total.toFixed(2)} />
					</span>
					<h1 className="project-name">{ project.name }</h1>
					<section className="project-date">
						{ moment(project.createdAt.toISOString()).calendar() }
				  	</section>
				  	<section className="project-description">
				  		<p>Description:</p>
				  		<textarea className="project-description-textarea"
							value={this.state.description}
							onChange={this.handleChangeDescription} 
							placeholder="Add a short description about your project." />
				  	</section>
					<section>

						{/*************************************************
							Extra protection in the case that anyone other
							than the project owner gets to this component.
						**************************************************/}
						{ this.props.currentUser ? 
							(this.props.currentUser._id === project.owner ? 
								<ProjectButtons 
									owner={project.owner}
									privacy={this.state.project.private}
									currentUser={this.props.currentUser}
									createNewItem={this.createNewItem} 
									toggleMakePublic={this.toggleMakePublic}
									handleSaveItems={this.handleSaveItems} />
							: '' )
						: '' }
					</section>
					<section className="project-items">

						{/************************************************
							Conditional to display a message if there no
							items in the project or nothing if there are.
						*************************************************/}
						{ items.length === 0 ? 
							<h1 className="project-add-item-prompt">
								Add an item below.
							</h1> 
						: '' }

						{/**********************************************
							Displays the item inputs that are editable.
							This also displays the delete button.
						***********************************************/}
						{ items.length !== 0 ?
							items.map((item, i) => (
							<section key={item.id} >
								<Item
									id={item.id}
									name={item.name}
									price={item.price}
									link={item.link}
									projectId={project._id}
									handleNameChange={this.handleNameChange}
									handlePriceChange={this.handlePriceChange}
									handleLinkChange={this.handleLinkChange} />
								<input type="button"
									className="project-btn-delete project-btn btn"
									onClick={() => this.handleRemoveItem(item)}
									value="Delete" />
								<section className="project-item-clear">
								</section>
							</section> ))
						: ''}
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
