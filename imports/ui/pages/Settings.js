import React, { Component, PropTypes } from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeEmail = this.handleChangePassword.bind(this);
		this.handleVerifyEmail = this.handleVerifyEmail.bind(this);
		this.addAmazonAffiliate = this.addAmazonAffiliate.bind(this);
	}

	handleChangeUsername() {

	}

	handleChangePassword() {

	}

	handleChangeEmail() {

	}

	handleVerifyEmail() {

	}

	addAmazonAffiliate() {

	}

	render() {
		return(
			<section>
				{ this.props.currentUser === Meteor.user().userId ? 
					<h1>Show</h1>
				: '' }
			</section>
		);
	}
};

Settings.propTypes = {
	currentUser: PropTypes.string.isRequired,
};