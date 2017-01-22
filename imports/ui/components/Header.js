import React, { Component, PropTypes } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import Blaze from 'meteor/gadicc:blaze-react-component';

export default class Header extends Component {
	render() {
		return (
			<header>
			
				{/* If the user is not signed in, do not display the header. */}
				{ this.props.currentUser ? 
					<section className="header-container">
						<Blaze 
						 	className="login-buttons-container" 
						 	template="loginButtons" 
						 	align="right" />
						<div className="header-link">
							<a href="/profile">Profile</a>
						</div>
						<div className="header-link">
							<a href="/projects">Projects</a>
						</div>
						<div className="header-link">
							<a href="/settings">Settings</a>
						</div>
					</section>
				: '' }
			</header>
		);
	}
}