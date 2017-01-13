import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.js';

export default class Header extends Component {
	render() {
		return (
			<header>
				{ this.props.currentUser ? 
					<div className="header-container">
						<AccountsUIWrapper />
						<div className="user-link"> <a href="/profile">Profile</a></div>
						<div className="user-link"> <a href="/settings">Settings</a> </div>
						<div className="user-link last-link"> <a href="/projects">Projects</a></div>
					</div>
				: '' }
			</header>
		);
	}
}