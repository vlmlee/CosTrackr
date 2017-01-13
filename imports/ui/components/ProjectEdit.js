import React, { Component, PropTypes } from 'react';
import ProjectButtons from './ProjectButtons.js';
import Item from './Item.js';
import moment from 'moment';

export default class ProjectEdit extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let project = this.props.project,
			total = this.props.total,
			items = this.props.items,
			currentUser = this.props.currentUser;
		return (
			<section className="project-section">
				{ project ? 
					( <section>
						<h1> { project.name } </h1>
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
					{ items != [] ?
						items.map((item, i) => (
						<div
							key={item.id} >
							<Item
								id={item.id}
								name={item.name}
								price={item.price}
								link={item.link}
								projectId={project._id}
								handleNameChange={this.props.handleNameChange}
								handlePriceChange={this.props.handlePriceChange}
								handleLinkChange={this.props.handleLinkChange} />
							<input
								type="button"
								className="btn red inline"
								onClick={() => this.props.handleRemoveItem(item)}
								value="Delete" />
							<div className="item-index">
								{ items.indexOf(item) + 1 }
							</div>
						</div> ))
					: ''}
				</section>
				<section className="all-buttons">
					{ currentUser ? 
						(currentUser._id === project.owner ? 
							<ProjectButtons 
								owner={project.owner}
								currentUser={currentUser}
								createNewItem={this.props.createNewItem} 
								toggleMakePublic={this.props.toggleMakePublic}
								handleSaveItems={this.props.handleSaveItems} />
						: '' )
					: '' }
				</section>
			</section>
		);
	}
}

ProjectEdit.propTypes = {
	project: PropTypes.object.isRequired,
	total: PropTypes.number.isRequired,
	items: PropTypes.array.isRequired,
	currentUser: PropTypes.object.isRequired,
};