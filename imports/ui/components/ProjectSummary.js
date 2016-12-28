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
				<p>{ this.props.project.name }</p>
				<p>{ this.props.project.createdAt.toString() }</p>
				{ this.props.project.items.map(item => (
					<ul>
						<li>{item.name}</li>
						<li>{item.price}</li>
						<li>{item.link}</li>
					</ul>
				  )) 
				}
				<button onClick={() => this.refs.modal.show()}>
					Open modal
				</button>
				<SkyLight 
					hideOverlayClicked
					dialogStyles={styles}
					ref="modal"
					title="Simple modal" >
					<ProjectEdit />
				</SkyLight>
			</div>
		);
	}
}

const styles = {
	overlayStyles: {
		 
	},
	dialogStyles: {

	},
	title: {

	},
	closeButtonStyle: {

	}
};