import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import CreateNewProjectForm from './CreateNewProjectForm.js';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exist: false,
			user: '',
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
		const user = this.props.users
			.filter(user => user._id === this.props.id);
		this.setState({ 
			user: user[0],
			joined: user[0].createdAt,
			bio: user[0].profile.bio,
			website: user[0].profile.website,
		 });
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.user._id !== this.props.currentUser._id) {
			return true;
		} else if (this.state.user !== nextState.user || 
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
			.filter(user => user._id === this.props.currentUser._id);
		if (user[0] !== nextState.user) {
			this.setState({
				user: user[0],
				joined: user[0].createdAt,
				bio: user[0].profile.bio,
				website: user[0].profile.website,
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
					{this.state.user.username}
				</p>
				<p className="profile-joined"> 
					Joined: {moment(this.state.joined.toISOString())
						.format('MMM Do, YYYY')} 
				</p>
				{ this.props.currentUser._id === this.state.user._id ?
					<CreateNewProjectForm 
						currentUser={this.props.currentUser} />
				: '' }

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
						(this.props.currentUser._id === this.state.user._id ? 
							<span className="profile-bio">
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
						{ this.props.currentUser._id === this.state.user._id ?
							<a href=""
								onClick={this.handleEditBio} >
							Edit
							</a>
						: <div className="push-down"> </div> }
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
						( this.props.currentUser._id === this.state.user._id ? 
							<span className="profile-website">
								Add your personal website here.&nbsp;
							</span> 
						: <span className="profile-has-not">This user hasn't added a website yet.</span> )
					: ( <div className="profile-website">
							<p className="profile-website-personal">
								My personal website:
							</p>
							<a href={ this.state.website }>
								{this.state.website}
							</a>
						</div> ) }
					<span className="edit-website">
						{ this.props.currentUser._id === this.state.user._id ?
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
	currentUser: PropTypes.object.isRequired,
};