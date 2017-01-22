import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import CreateNewProjectForm from './CreateNewProjectForm.js';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			returnToProfile: false,
			id: '',
			username: '',
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

		/*
			We use the 'users' props, which is just a 
			directory, to filter the user whose profile 
			we're visiting and then we set this component's 
			state to that user's data.
		*/
		const user = this.props.users
			.filter(user => user._id === this.props.id)[0];
		this.setState({ 
			id: user._id,
			username: user.username,
			joined: user.createdAt,
			bio: user.profile.bio,
			website: user.profile.website,
		 });
	}

	shouldComponentUpdate(nextProps, nextState) {

		/*
			We prevent the Profile component from updating
			unless any of the states below has changed. 
			This prevents any other updates like 'starring' 
			to cause an update to the component.
		*/
		if (this.props.id !== this.props.currentUser._id ||
			this.state.editBio !== nextState.editBio || 
			this.state.editWebsite !== nextState.editWebsite ||
			this.state.bio !== nextState.bio || 
			this.state.website !== nextState.website) {
			return true;
		} else {
			return false;
		}
	}

	componentWillUpdate(nextProps, nextState) {
		const user = this.props.users
			.filter(user => user._id === this.props.currentUser._id)[0];

		/*
			We want to change the state while moving from 
			/profiles/:id to /profile to update the profile 
			data but only once to prevent unbounded updates.
		*/
		if (this.props.pageId !== nextProps.pageId) {
			this.setState({
				id: user._id,
				username: user.username,
				bio: user.profile.bio,
				website: user.profile.website,
				joined: user.createdAt,
			});
		}
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
				/* Limits the bio to 140 characters */
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
			} else if (e.target.value.trim().length === 0) {
				/* If the input field is blank, set the website to '' */
				this.setState({ website: '', editWebsite: false });
				Meteor.call('users.updateWebsite', this.props.currentUser._id, '');
			} else if (e.target.value.search(/^http[s]?\:\/\//) === -1) {
				/* Append https:// to inputs not containing it */
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
					{this.state.username}
				</p>
				<p className="profile-joined"> 
					Joined: {moment(this.state.joined.toISOString())
						.format('MMM Do, YYYY')} 
				</p>

				{/*********************************************
					Conditional to show project creation form.
					If current user is not profile owner, the
					component will not mount.
				**********************************************/}
				{ this.props.currentUser._id === this.state.id ?
					<CreateNewProjectForm 
						currentUser={this.props.currentUser} />
				: '' }

				{/***********************************************
					Conditional to toggle bio input fields to be 
					editable by the current user. If editBio is
					not toggled to 'true', then show the user's
					bio or a default message if no bio exists.
				************************************************/}
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

					{/**********************************************
						Conditional to show different bio messages 
						to profile owner and visitors unless a bio
						already exists.
					***********************************************/}
					{ this.state.bio === '' ? 
						(this.props.currentUser._id === this.state.id ? 
							<span className="profile-has-not">
								Tell us about yourself.&nbsp;
							</span> 
						: <span className="profile-has-not">This user hasn't written a bio yet.</span>)
					: ( <div>
							<p className="profile-website-personal">
								About me:
							</p>
							<span>{ this.state.bio }</span>
						</div> ) }
					<span className="edit-bio">

						{/*********************************************
							Conditional to show if edit link should be
							shown to users. Has to be profile owner.
						**********************************************/}
						{ this.props.currentUser._id === this.state.id ?
							<a href=""
								onClick={this.handleEditBio} >
							Edit
							</a>
						: <div className="push-down"> </div> }
					</span> 
				</div> }

				{/****************************************************
					Conditional to toggle website input field to be
					editable to profile owner. It will return a 
					message or the website link if the field is
					blank.
				*****************************************************/}
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

					{/****************************************************
						Conditional to show different website messages to 
						profile owner and visitors. 
					*****************************************************/}
					{ this.state.website === '' ? 
						( this.props.currentUser._id === this.state.id ? 
							<span className="profile-has-not">
								Add your personal website here.&nbsp;
							</span> 
						: <span className="profile-has-not">This user hasn't added a website yet.</span> )
					: ( <div className="profile-website">
							<p className="profile-website-personal">
								My personal website:
							</p>
							<a href={this.state.website}>
								{this.state.website}
							</a>
						</div> ) }
					<span className="edit-website">

						{/**********************************************
							Conditional that will show if edit link
							should be shown to users. Has to be profile
							owner. 
						***********************************************/}
						{ this.props.currentUser._id === this.state.id ?
							<a href=""
								onClick={this.handleEditWebsite} >
								Edit
							</a>
						: <div className="push-down"> </div> }
					</span>
				</div> } 
			</section>
		);
	}
}

Profile.propTypes = {
	users: PropTypes.array.isRequired,
	currentUser: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	pageId: PropTypes.string.isRequired,
};