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
			error: '',
		};

		this.setNewUsername = this.setNewUsername.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.setNewPassword = this.setNewPassword.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.setNewEmail = this.setNewEmail.bind(this);
		this.handleChangeEmail = this.handleChangePassword.bind(this);
	}

	setNewUsername(e) {
		this.setState({ username: e.target.value });
	}

	handleChangeUsername() {
		if (this.state.username && this.state.username !== this.props.currentUser.username) {
			Meteor.call('users.changeUsername', this.props.currentUser._id, this.state.username);
		}
	}

	setNewPassword(e) {
		this.setState({ password: e.target.value });
	}

	handleChangePassword() {
		if (this.state.password) {
			Meteor.call('users.changePassword', this.props.currentUser._id, this.state.password);
		}
	}

	setNewEmail(e) {
		this.setState({ email: e.target.value });
	}

	handleChangeEmail() {
		if (this.state.email && this.state.email !== this.props.currentUser.email) {
			Meteor.call('users.changeEmail', this.props.currentUser._id, this.state.email);
		}
	}

	render() {
		return(
			<section className="settings">
				<h1>Change Settings</h1>
				<input 
					type="text"
					className="settings-input-btn"
					onChange={this.setNewUsername}
					placeholder="New username" />
				<input
					type="button"
					className="settings-submit-btn"
					onSubmit={this.handleChangeUsername}
					value="Change username" />
				<input 
					type="email"
					className="settings-input-btn"
					onChange={this.setNewEmail}
					placeholder="New email" />
				<input
					type="button"
					className="settings-submit-btn"
					onSubmit={this.handleChangeEmail}
					value="Change email" />
				<input 
					type="password"
					className="settings-input-btn"
					onChange={this.setNewPassword}
					placeholder="New password" />
				<input
					type="button"
					className="settings-submit-btn"
					onSubmit={this.handleChangePassword}
					value="Change password" />

				<p className="settings-error"> 
					{this.state.error} 
				</p>
			</section>
		);
	}
};

Settings.propTypes = {
	currentUser: PropTypes.object.isRequired,
};