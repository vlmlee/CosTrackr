import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import Blaze from 'meteor/gadicc:blaze-react-component';

export default class Header extends Component {
	render() {
		return (
			<header>
				{ this.props.currentUser ? 
					<div className="header-container">
						<Blaze 
						 	className="login-buttons-container" 
						 	template="loginButtons" 
						 	align="right" />
						<div className="header-link"> <a href="/profile">Profile</a></div>
						<div className="header-link"> <a href="/projects">Projects</a></div>
						<div className="header-link"> <a href="/settings">Settings</a></div>
					</div>
				: '' }
			</header>
		);
	}
}