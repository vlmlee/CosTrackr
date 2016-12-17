import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.js';

export default class Header extends Component {
	render() {
		return (
			<header>
				<AccountsUIWrapper />
				<span> Some stuff goes here </span>
			</header>
		);
	}
}