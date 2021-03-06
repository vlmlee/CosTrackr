import React, { Component, PropTypes } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			error: '',
			loginForm: true
		};

		this.handleCreateForm = this.handleCreateForm.bind(this);
		this.keyPressEnterLogin = this.keyPressEnterLogin.bind(this);
		this.keyPressEnterCreateUser = this.keyPressEnterCreateUser.bind(this);
		this.handleDefaultSrc = this.handleDefaultSrc.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
		this.handleCreateForm = this.handleCreateForm.bind(this);
		this.handleCreateUser = this.handleCreateUser.bind(this);
	}

	// Handles login after pressing enter.
	keyPressEnterLogin(e) {
		if (e.key === 'Enter') {
			this.handleLogin();
		}
 	}

	// Handles creating account after pressing enter.
 	keyPressEnterCreateUser(e) {
 		if (e.key === 'Enter') {
			this.handleCreateUser();
		}
 	}

 	// Makes sure logo doesn't display a broken image.
 	handleDefaultSrc(e) {
 		e.target.src = '/images/logo.png';
 	}

	handleLogin() {
		Meteor.loginWithPassword(this.state.username, this.state.password, (err) => {
			if (err) {
				this.setState({ password: '', error: err.message });
			}
		});
	}

	handleChangeUsername(e) {
		const username = e.target.value;
		this.setState({ username: username });
	}

	handleChangePassword(e) {
		const password = e.target.value;
		this.setState({ password: password });
	}

	handleChangeConfirmPassword(e) {
		const password = e.target.value;
		this.setState({ confirmPassword: password });
	}

	// Changes login form to account creation form.
	handleCreateForm() {
		this.setState({ loginForm: !this.state.loginForm });
	}

	// Accounts seems to only work on the client, hence we cannot
	// create a server side meteor call for account creation.
	handleCreateUser() {
		if (this.state.password === this.state.confirmPassword) {
			Accounts.createUser({ 
				username: this.state.username, 
				password: this.state.password, 
				profile: {
					bio: '',
					website: '',
					profilePicture: '',
				},
			}, (err) => {
				if (err) {
					this.setState({ password: '', confirmPassword: '', error: err.message });
				}
			});
		} else {
			this.setState({ error: 'Passwords are not the same.'})
		}
	}

	render() {
		return (
			<section className="landing-page">
				<img onError={this.handleDefaultSrc} src="images/logo.png" alt="logo" />
				<h1>Track your costs.</h1>

				{/********************************************************
					Conditional to display the login page or the account
					creation page when 'loginForm' is toggled. If true, 
					shows the login page, else shows the account creation
					page.
				*********************************************************/}
				{ this.state.loginForm ? 
					<section className="login-btns">
						<input className="login-btn input-btn"
							type="text"
							onChange={this.handleChangeUsername}
							placeholder="Username"
							value={this.state.username} />
						<input className="login-btn input-btn"
							type="password"
							onChange={this.handleChangePassword}
							onKeyPress={this.keyPressEnterLogin}
							placeholder="Password"
							value={this.state.password} />
						<input className="login-btn submit-btn"
							type="submit"
							onClick={this.handleLogin}
							value="Sign In" />
						<a href="/" onClick={this.handleCreateForm} > 
							Create an Account 
						</a>
					</section>
				: <section className="login-btns">
					<input className="login-btn input-btn"
						type="text"
						onChange={this.handleChangeUsername}
						placeholder="Choose a Username"
						value={this.state.username} />
					<input className="login-btn input-btn"
						type="password"
						onChange={this.handleChangePassword}
						placeholder="New Password"
						value={this.state.password} />
					<input className="login-btn input-btn"
						type="password"
						onChange={this.handleChangeConfirmPassword}
						onKeyPress={this.keyPressEnterCreateUser}
						placeholder="Confirm Password"
						value={this.state.confirmPassword} />
					<input className="login-btn submit-btn"
						type="submit"
						onClick={this.handleCreateUser}
						value="Create Account" />
					<a href="/" onClick={this.handleCreateForm} > 
						Sign In
					</a>
				</section> }

				{/* Displays error messages */}
				<section className="login-error">
					{ this.state.error }
				</section>
			</section>
		);
	}
}