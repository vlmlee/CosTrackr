import React, { Component, Proptypes } from 'react';
import moment from 'moment';

export default class ProjectEdit extends Component {
	constructor(props) {
		super(props);	
	}
	
	render() {
		let project = this.props.project;
		return (
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
				    	value={project.total.toFixed(2)}  />
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
				</section>
			</section>
		);
	}
}