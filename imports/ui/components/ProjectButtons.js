import React, { PropTypes } from 'react';

const ProjectButtons = ({ owner, currentUser, createNewItem, toggleMakePublic, handleSaveItems }) => (
	<section>
		{ currentUser ? 
			( currentUser._id === owner ? 
				<section className="project-buttons">
					<input
						type="button"
						className="btn"
						onClick={() => handleSaveItems()}
						value="Save" />
					<input
						type="button" 
						className="btn"
						onClick={() => createNewItem()}
						value="Add new input" />
					<input
						type="button"
						className="btn"
						onClick={() => toggleMakePublic()}
						value="Make Public" />
				</section> 
			: '' )
		: '' }
	</section>
);

ProjectButtons.propTypes = {
	owner: PropTypes.string.isRequired,
	currentUser: PropTypes.object.isRequired,
	createNewItem: PropTypes.func.isRequired,
	toggleMakePublic: PropTypes.func.isRequired,
	handleSaveItems: PropTypes.func.isRequired,
};

export default ProjectButtons;