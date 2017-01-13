import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.js';

export default class Header extends Component {
	render() {
		return (
			<header>
				{ this.props.currentUser ? 
					<div className="header-container">
						<AccountsUIWrapper />
						<span> <a href="/profile">Profile</a></span>
						<span> <a href="/settings">Settings</a> </span>
						<span> <a href="/projects">Projects</a></span>
					</div>
				: '' }
			</header>
		);
	}
}