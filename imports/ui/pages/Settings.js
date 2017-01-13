import React, { Component, PropTypes } from 'react';
import { Accounts } from 'meteor/accounts-base';
import ReactDOM from 'react-dom';

export default class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			email: '',
		};

		this.setNewUsername = this.setNewUsername.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.setNewPassword = this.setNewPassword.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.setNewEmail = this.setNewEmail.bind(this);
		this.handleChangeEmail = this.handleChangePassword.bind(this);
		this.addAmazonAffiliate = this.addAmazonAffiliate.bind(this);
	}

	setNewUsername(e) {
		this.setState({ username: e.target.value });
	}

	handleChangeUsername() {
		if (this.state.username && this.state.username !== Meteor.user().username) {
			Meteor.call('users.changeUsername', Meteor.user()._id, this.state.username);
		}
	}

	setNewPassword(e) {
		this.setState({ password: e.target.value });
	}

	handleChangePassword() {
		if (this.state.password) {
			Meteor.call('users.changePassword', Meteor.user()._id, password);
		}
	}

	setNewEmail(e) {
		this.setState({ email: e.target.value });
	}

	handleChangeEmail() {
		if (this.state.email && this.state.email !== Meteor.user().email) {
			Meteor.call('users.changeEmail', Meteor.user()._id, this.state.email);
		}
	}

	addAmazonAffiliate() {

	}

	render() {
		return(
			<section className="settings">
				<h1>Show</h1>
				<input 
					type="text"
					className="input-btn"
					onChange={this.setNewUsername}
					placeholder="New username" />
				<input
					type="button"
					className="submit-btn"
					onSubmit={() => this.handleChangeUsername}
					value="Change username" />
				<input 
					type="email"
					className="input-btn"
					onChange={this.setNewEmail}
					placeholder="New email" />
				<input
					type="button"
					className="submit-btn"
					onSubmit={() => this.handleChangeEmail}
					value="Change email" />
				<input 
					type="password"
					className="input-btn"
					onChange={this.setNewPassword}
					placeholder="New password" />
				<input
					type="button"
					className="submit-btn"
					onSubmit={() => this.handleChangePassword}
					value="Change password" />
			</section>
		);
	}
};

Settings.propTypes = {
	currentUser: PropTypes.object.isRequired,
};