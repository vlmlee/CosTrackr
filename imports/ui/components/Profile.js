import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import CreateNewProjectForm from './CreateNewProjectForm.js';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			returnToProfile: false,
			id: '',
			username: '',
			profilePicture: '',
			bio: '',
			website: '',
			joined: '',
			editBio: false,
			editWebsite: false,
			error : '',
		};

		this.handleEditBio = this.handleEditBio.bind(this);
		this.handleCancelEditBio = this.handleCancelEditBio.bind(this);
		this.handleChangeBio = this.handleChangeBio.bind(this);
		this.handleUpdateBio = this.handleUpdateBio.bind(this);
		this.handleEditWebsite = this.handleEditWebsite.bind(this);
		this.handleCancelEditWebsite = this.handleCancelEditWebsite.bind(this);
		this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
		this.handleUpdateWebsite = this.handleUpdateWebsite.bind(this);
		this.onImageDrop = this.onImageDrop.bind(this);
		this.handleImageUpload = this.handleImageUpload.bind(this);
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
			profilePicture: user.profile.profilePicture,
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
			this.state.profilePicture !== nextState.profilePicture ||
			this.state.editWebsite !== nextState.editWebsite ||
			this.state.bio !== nextState.bio || 
			this.state.website !== nextState.website ||
			this.state.error !== nextState.error) {
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
			data but only -once- to prevent unbounded updates.
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

	onImageDrop(files) {
		const self = this;
		// Makes sure that the uploaded image is less than 200kb.
		if (files[0].size <= 200000) {
			if (files[0].type.match(/image.*/)) {
				let reader = new FileReader();
				reader.onload = function() {
					let img = new Image();
					img.src = reader.result;
					self.setState({ profilePicture: reader.result, error: '' });
				}
				// After the file has been upload, then store it in the database.
				reader.onloadend = function() {
					self.handleImageUpload();
				}
				reader.readAsDataURL(files[0]);
			}
		} else {
			this.setState({ error: 'File size too large!' });
		}
	}

	handleImageUpload() {
		Meteor.call('users.updateProfilePicture', 
			this.props.currentUser._id,
			this.state.profilePicture
		);
	}

	render() {
		const profilePicture = this.state.profilePicture ? 
				this.state.profilePicture : '/images/user.png',
			backgroundPos = this.state.profilePicture ? 
				'center center' : 'center bottom';
		const profilePictureStyle = {
				backgroundImage: 'url(' + profilePicture + ')',
				height: '200px',
				width: '200px',
				backgroundColor: 'white',
				margin: '0 auto',
				borderRadius: '5px',
				transition: 'box-shadow 0.2s ease-in',
				backgroundSize: '95% auto',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: backgroundPos,
			},
			dropzoneStyle = {
				border: 'none',
				height: '200px',
				width: '200px'
			};
		return (
			<section className="profile"> 

				{/* Profile picture. Defaults to /images/user.png */}
				<section style={profilePictureStyle} className="profile-picture">

					{/*************************************************
						This is a dropzone for images. It will save it
						as the user's profile image.
					***************************************************/}
					<Dropzone
						multiple={false}
						accept="image/*"
						style={dropzoneStyle}
						onDrop={this.onImageDrop}>

						{/**************************************************
							Conditional to display a message to the user to
							set their profile picture only if they are the
							profile owner. 
						***************************************************/}
						{ this.props.currentUser._id === this.state.id ? 
							( this.state.profilePicture ? 
								<p className="profile-picture-add-prompt-light">
									Drag an image here to set your profile picture 
									(200x200 limit:200kb)
								</p> 
							: <p className="profile-picture-add-prompt-dark">
								Drag an image here to set your profile picture
								(200x200 limit:200kb)
							</p> ) 
						: '' }
					</Dropzone>
				</section>

				<p className="profile-name">
					{this.state.username}
				</p>
				<p className="profile-joined"> 
					Joined: { this.state.joined ? moment(this.state.joined.toISOString())
						.format('MMM Do, YYYY') : '' } 
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
					<section>
						<textarea className="profile-bio-input"
							value={this.state.bio}
							onChange={this.handleChangeBio}
							onKeyPress={this.handleUpdateBio} />
						<a href=""
							className="profile-cancel-bio"
							onClick={this.handleCancelEditBio} >
							Cancel
						</a> 
					</section>
				: <section className="profile-bio" > 

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
					: ( <section>
							<p className="profile-website-personal">
								About me:
							</p>
							<span>{ this.state.bio }</span>
						</section> ) }
					<span className="profile-edit-bio">

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
				</section> }

				{/****************************************************
					Conditional to toggle website input field to be
					editable to profile owner. It will return a 
					message or the website link if the field is
					blank.
				*****************************************************/}
				{ this.state.editWebsite ?
					<section>
						<input className="profile-website-input"
							type="text"
							onChange={this.handleChangeWebsite}
							onKeyPress={this.handleUpdateWebsite} />
						<a href=""
							className="profile-cancel-bio"
							onClick={this.handleCancelEditWebsite} >
							Cancel
						</a> 
					</section>
				: <section className="profile-website">

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
					<span className="profile-edit-website">

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
				</section> } 

				{/* Error messages for profile picture */}
				<section className="profile-error">
					<p>{this.state.error}</p>
				</section>
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