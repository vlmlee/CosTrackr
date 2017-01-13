import React, { Component} from 'react';

export default class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			login: true
		};

		this.handleCreateForm = this.handleCreateForm.bind(this);
	}

	handleCreateForm() {
		this.setState({ login: !this.state.login });
	}

	render() {
		return (
			<section
				className="landing-page">
				<img src="logo.svg" />
				<h1>Track your costs.</h1>
				{ this.state.login ? 
					<section
						className="login-buttons">
						<input
							className="login-btn input-btn"
							type="text"
							onChange=""
							placeholder="Username" />
						<input
							className="login-btn input-btn"
							type="password"
							onChange=""
							placeholder="Password" />
						<input
							className="login-btn submit-btn"
							type="submit"
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
							onChange=""
							placeholder="Choose a Username" />
						<input
							className="login-btn input-btn"
							type="password"
							onChange=""
							placeholder="New Password" />
						<input
							className="login-btn input-btn"
							type="password"
							onChange=""
							placeholder="Confirm Password"
							value="" />
						<input
							className="login-btn submit-btn"
							type="submit"
							value="Create Account" />
						<a href="/" onClick={this.handleCreateForm} > 
							Sign In
						</a>
					</section>
				}
			</section>
		);
	}
}