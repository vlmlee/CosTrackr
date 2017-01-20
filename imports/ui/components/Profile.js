import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import CreateNewProjectForm from './CreateNewProjectForm.js';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exist: false,
			bio: 'My Bio',
			website: 'My Personal Website',
			joined: '',
			editBio: false,
			editWebsite: false,
		};

		this.handleEditBio = this.handleEditBio.bind(this);
		this.handleCancelEditBio = this.handleCancelEditBio.bind(this);
		this.handleChangeBio = this.handleChangeBio.bind(this);
		this.handleUpdateBio = this.handleUpdateBio.bind(this);
		this.handleEditWebsite = this.handleEditWebsite.bind(this);
		this.handleCancelEditWebsite = this.handleCancelEditWebsite.bind(this);
		this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
		this.handleUpdateWebsite = this.handleUpdateWebsite.bind(this);
	}

	componentWillMount() {
		this.setState({ joined: this.props.currentUser.createdAt });
	}

	handleEditBio() {
		this.setState({ editBio: true });
	}

	handleCancelEditBio() {
		this.setState({ bio: this.state.bio, editBio: false });
	}

	handleChangeBio(e) {
		this.setState({ bio: e.target.value });
	}

	handleUpdateBio(e) {
		if (e.key === 'Enter') {
			if (e.target.value.length > 140) {
				this.setState({ error: 'You are using too many characters!'});
			} else {
				Meteor.call('profile.updateBio', this.props.currentUser.username, e.target.value);
				this.setState({ editBio: false });
			}
		}
	}

	handleEditWebsite() {
		this.setState({ editWebsite: true });
	}

	handleCancelEditWebsite() {
		this.setState({ editWebsite: false });
	}

	handleChangeWebsite(e) {
		this.setState({ website: e.target.value });
	}

	handleUpdateWebsite() {
		if (e.keypress === 'Enter') {
			if (e.target.value.length > 80) {
				this.setState({ error: 'You are using too many characters!'});
			} else {
				Meteor.call('profile.updateWebsite', this.props.currentUser.username, e.target.value);
				this.setState({ editWebsite: false });
			}
		}
	}

	render() {
		return (
			<section className="profile"> 
				<section className="profile-picture">
				</section>
				<p className="profile-name">
					{this.props.currentUser.username}
				</p>
				<p className="profile-joined"> 
					Joined: {moment(this.state.joined.toISOString())
						.format('MMM Do, YYYY')} 
				</p>
				<p className="profile-location">
				</p>

				<CreateNewProjectForm 
					currentUser={this.props.currentUser} />

				{ this.state.editBio ? 
					<div>
						<textarea
							className="profile-bio-input"
							value={this.state.bio}
							onChange={this.handleChangeBio} />
						<a href=""
							className="cancel-bio"
							onClick={this.handleCancelEditBio} >
							Cancel
						</a> 
					</div>
				: <div className="profile-bio" > 
					{this.state.bio}
					<span className="edit-bio">
						<a href=""
							onClick={this.handleEditBio} >
						Edit
						</a>
					</span> 
				</div> }

				{ this.state.editWebsite ?
					<div>
						<input
							className="profile-website-input"
							type="text"
							onChange={this.handleChangeWebsite} />
						<a href=""
							className="cancel-bio"
							onClick={this.handleCancelEditWebsite} >
							Cancel
						</a> 
					</div>
				: <div className="profile-website">
					{ this.state.website !== 'My Personal Website' ? 
						<a href={'https://' + this.state.website}>
							{this.state.website}
						</a>
					: ( this.state.website ) }
					<span className="edit-website">
						<a href=""
							onClick={this.handleEditWebsite} >
						Edit
						</a>
					</span> 
					</div>
				}
			</section>
		);
	}
}

Profile.propTypes = {
	currentUser: PropTypes.object.isRequired,
};

// description
// personal website
// optinal twitter, github, dribbble