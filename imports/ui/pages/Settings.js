import React, { Component, PropTypes } from 'react';
import { Accounts } from 'meteor/accounts-base';
import ReactDOM from 'react-dom';

export default class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			currentPassword: '',
			password: '',
			passwordConfirm: '',
			email: '',
			success: '',
			error: '',
		};

		this.setNewUsername = this.setNewUsername.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleCurrentPassword = this.handleCurrentPassword.bind(this);
		this.handleNewPassword = this.handleNewPassword.bind(this);
		this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.setNewEmail = this.setNewEmail.bind(this);
		this.handleChangeEmail = this.handleChangePassword.bind(this);
	}

	setNewUsername(e) {
		if (this.state.success !== '') {
			this.setState({ success: '' });
		}
		this.setState({ username: e.target.value });
	}

	handleChangeUsername() {
		if (this.state.username && (this.state.username !== this.props.currentUser.username)) {
			Meteor.call('users.changeUsername', this.props.currentUser._id, this.state.username);
			this.setState({ error: '', username: '', success: 'Username changed successfully!' });
		} else {
			this.setState({ error: 'Invalid name!'});
		}
	}

	handleCurrentPassword(e) {
		if (this.state.currentPassword !== '') {
			this.setState({ success: '' });
		}
		this.setState({ currentPassword: e.target.value });
	}

	handleNewPassword(e) {
		this.setState({ password: e.target.value });
	}

	handleConfirmPassword(e) {
		this.setState({ passwordConfirm: e.target.value });
	}

	handleChangePassword() {
		if ((this.state.password === this.state.passwordConfirm) && this.state.currentPassword) {
			Accounts.changePassword(this.state.currentPassword, this.state.password, (err) => {
				if (err) { 
					this.setState({ error: err.reason, success: ''});
				} else {
					this.setState({ error: '', success: 'Password changed successfully!'});
				}
			});
			this.setState({ password: '', passwordConfirm: '', currentPassword: '' });
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
					placeholder="New username"
					value={this.state.username} />
				<input
					type="button"
					className="settings-submit-btn"
					onClick={this.handleChangeUsername}
					value="Change username" />
				<input 
					type="email"
					className="settings-input-btn"
					onChange={this.setNewEmail}
					placeholder="New email"
					value={this.state.email} />
				<input
					type="button"
					className="settings-submit-btn"
					onClick={this.handleChangeEmail}
					value="Change email" />
				<input
					type="password"
					className="settings-input-btn settings-current-btn"
					onChange={this.handleCurrentPassword}
					placeholder="Enter current password"
					value={this.state.currentPassword} />
				<input 
					type="password"
					className="settings-input-btn settings-current-btn"
					onChange={this.handleNewPassword}
					placeholder="New password"
					value={this.state.password} />
				<input 
					type="password"
					className="settings-input-btn"
					onChange={this.handleConfirmPassword}
					placeholder="Reenter new password"
					value={this.state.passwordConfirm} />
				<input
					type="button"
					className="settings-submit-btn"
					onClick={this.handleChangePassword}
					value="Change password" />

				<p className="settings-error"> 
					{this.state.error} 
				</p>

				<p className="settings-success">
					{this.state.success}
				</p>
			</section>
		);
	}
};

Settings.propTypes = {
	currentUser: PropTypes.object.isRequired,
};