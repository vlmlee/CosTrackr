import React, { Component} from 'react';

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
		this.keyPressEnter = this.keyPressEnter.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
	}

	keyPressEnter(e) {
		if (e.key === 'Enter') {
			this.handleLogin();
		}
 	}

	handleLogin() {
		Meteor.loginWithPassword(this.state.username, this.state.password, (err) => {
			if (err) {
				this.setState({ password: '', error: err.message });
			}
		});
	}

	handleChangeUsername(e) {
		let username = e.target.value;
		this.setState({ username: username });
	}

	handleChangePassword(e) {
		let password = e.target.value;
		this.setState({ password: password });
	}

	handleChangeConfirmPassword(e) {
		this.setState({ confirmPassword: e.target.value });
	}

	handleCreateForm() {
		this.setState({ loginForm: !this.state.loginForm });
	}

	handleCreateUser() {

	}

	render() {
		return (
			<section
				className="landing-page">
				<img src="logo.svg" />
				<h1>Track your costs.</h1>
				{ this.state.loginForm ? 
					<section
						className="login-buttons">
						<input
							className="login-btn input-btn"
							type="text"
							onChange={this.handleChangeUsername}
							placeholder="Username"
							value={this.state.username} />
						<input
							className="login-btn input-btn"
							type="password"
							onChange={this.handleChangePassword}
							onKeyPress={this.keyPressEnter}
							placeholder="Password"
							value={this.state.password} />
						<input
							className="login-btn submit-btn"
							type="submit"
							onClick={this.handleLogin}
							value="Sign In" />
						<a href="/" onClick={this.handleCreateForm} > 
							Create an Account 
						</a>
					</section>
				: 	<section
						className="login-buttons">
						<input
							className="login-btn input-btn"
							type="text"
							onChange={this.handleChangeUsername}
							placeholder="Choose a Username" />
						<input
							className="login-btn input-btn"
							type="password"
							onChange={this.handleChangePassword}
							placeholder="New Password" />
						<input
							className="login-btn input-btn"
							type="password"
							onChange={this.handleChangeConfirmPassword}
							placeholder="Confirm Password"
							value="" />
						<input
							className="login-btn submit-btn"
							type="submit"
							onClick={() => this.handleCreateUser}
							value="Create Account" />
						<a href="/" onClick={this.handleCreateForm} > 
							Sign In
						</a>
					</section>
				}
				<section className="login-error">
					{ this.state.error }
				</section>
			</section>
		);
	}
}