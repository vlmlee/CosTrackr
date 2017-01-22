import React, { PropTypes } from 'react';

const ProjectButtons = ({ owner, privacy, currentUser, createNewItem, toggleMakePublic, handleSaveItems }) => (
	<section>
		{ currentUser ? 
			( currentUser._id === owner ? 
				<section className="project-buttons">
					<a href="javascript:history.back()">
						<input type="button"
							className="project-btn project-btn-back btn"
							value="‹Back" />
					</a>
					<input
						type="button"
						className="project-btn project-btn-save btn"
						onClick={() => handleSaveItems()}
						value="Save" />
					<input
						type="button" 
						className="project-btn project-btn-add btn"
						onClick={() => createNewItem()}
						value="Add new input" />
					<input
						type="button"
						className="project-btn project-btn-public btn"
						onClick={() => toggleMakePublic()}
						value={ privacy ? "Make Public" : "Make Private" } />
				</section> 
			: '' )
		: '' }
	</section>
);

ProjectButtons.propTypes = {
	owner: PropTypes.string.isRequired,
	privacy: PropTypes.bool.isRequired,
	currentUser: PropTypes.object.isRequired,
	createNewItem: PropTypes.func.isRequired,
	toggleMakePublic: PropTypes.func.isRequired,
	handleSaveItems: PropTypes.func.isRequired,
};

export default ProjectButtons;