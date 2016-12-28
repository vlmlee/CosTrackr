import React, { Component, Proptypes } from 'react';
import ProjectEdit from './ProjectEdit.js';
import SkyLight from 'react-skylight';

export default class ProjectSummary extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{ this.props.project.name }
				{ this.props.project.createdAt }
				<ul>
					{ this.props.project.items.map(item => (
						<li>{item.name}</li>
						<li>{item.price}</li>
						<li>{item.link}</li>
					  )) 
					}
				</ul>
				<button onClick={() => this.refs.modal.show()}>
					Open modal
				</button>
				<SkyLight hideOverlayClicked
				ref="modal"
				title="Simple modal">
					<ProjectEdit />
				</SkyLight>
			</div>
		);
	}
}

ProjectSummary.proptypes = {
	project: Proptypes.object.isRequired,
};