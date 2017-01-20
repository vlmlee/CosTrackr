import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import CreateNewProjectForm from './CreateNewProjectForm.js';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exist: false,
			bio: '',
			website: '',
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
		const user = this.props.currentUser;
		this.setState({ 
			joined: user.createdAt,
			bio: user.profile.bio,
			website: user.profile.website,
		 });
	}

	handleEditBio() {
		this.setState({ editBio: true });
	}

	handleCancelEditBio() {
		this.setState({ 
			bio: this.props.currentUser.profile.bio, 
			editBio: false 
		});
	}

	handleChangeBio(e) {
		this.setState({ bio: e.target.value });
	}

	handleUpdateBio(e) {
		if (e.key === 'Enter') {
			if (e.target.value.length > 140) {
				this.setState({ error: 'You are using too many characters!'});
			} else {
				Meteor.call('users.updateBio', this.props.currentUser._id, e.target.value);
				this.setState({ editBio: false });
			}
		}
	}

	handleEditWebsite() {
		this.setState({ editWebsite: true });
	}

	handleCancelEditWebsite() {
		this.setState({ 
			website: this.props.currentUser.profile.website, 
			editWebsite: false 
		});
	}

	handleChangeWebsite(e) {
		this.setState({ website: e.target.value });
	}

	handleUpdateWebsite(e) {
		if (e.key === 'Enter') {
			if (e.target.value.length > 80) {
				this.setState({ error: 'You are using too many characters!'});
			} else if (e.target.value.length === 0) {
				this.setState({ website: '', editWebsite: false });
				Meteor.call('users.updateWebsite', this.props.currentUser._id, '');
			} else if (e.target.value.search(/^http[s]?\:\/\//) === -1) {
				let url = 'https://' + e.target.value;
				Meteor.call('users.updateWebsite', this.props.currentUser._id, url);
				this.setState({ website: url, editWebsite: false });
			} else {
				Meteor.call('users.updateWebsite', this.props.currentUser._id, e.target.value);
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
							onChange={this.handleChangeBio}
							onKeyPress={this.handleUpdateBio} />
						<a href=""
							className="cancel-bio"
							onClick={this.handleCancelEditBio} >
							Cancel
						</a> 
					</div>
				: <div className="profile-bio" > 
					{ this.state.bio === '' ? 
						(this.props.currentUser.username === this.props.username ? 
							<span className="profile-bio">
								Tell us about yourself.
							</span> 
						: <span>This user hasn't written a bio yet.</span>)
					: ( <div>
							<p className="profile-website-personal">
								About me:
							</p>
							<span>{ this.state.bio }</span>
						</div> ) }
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
							onChange={this.handleChangeWebsite}
							onKeyPress={this.handleUpdateWebsite} />
						<a href=""
							className="cancel-bio"
							onClick={this.handleCancelEditWebsite} >
							Cancel
						</a> 
					</div>
				: <div className="profile-website">
					{ this.state.website === '' ? 
						( this.props.currentUser.username === this.props.username ? 
							<span className="profile-website">
								Enter your personal website here.
							</span> 
						: <span>This user hasn't added a website yet.</span> )
					: ( <div className="profile-website">
							<p className="profile-website-personal">
								My personal website:
							</p>
							<a href={ this.state.website }>
								{this.state.website}
							</a>
						</div> ) }
					<span className="edit-website">
						<a href=""
							onClick={this.handleEditWebsite} >
							Edit
						</a>
					</span>
				</div> } 
			</section>
		);
	}
}

Profile.propTypes = {
	currentUser: PropTypes.object.isRequired,
};