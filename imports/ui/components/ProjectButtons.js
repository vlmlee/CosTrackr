import React, { PropTypes } from 'react';

const ProjectButtons = ({ owner, currentUser, createNewItem, toggleMakePublic, handleSaveItems }) => (
	<div>
		{ currentUser ? 
			( currentUser._id === owner ? 
				<section className="project-buttons">
					<input
						type="submit"
						className="btn blue inline"
						onClick={() => handleSaveItems()}
						value="Save" />
					<input
						type="button" 
						className="btn green"
						onClick={ () => createNewItem() }
						value="Add new input" />
					<input
						type="button"
						className="btn purple"
						onClick={ () => toggleMakePublic() }
						value="Make Public" />
				</section> 
			: '' )
		: '' }
	</div>
);

ProjectButtons.propTypes = {
	owner: PropTypes.string.isRequired,
	currentUser: PropTypes.object.isRequired,
	createNewItem: PropTypes.func.isRequired,
	toggleMakePublic: PropTypes.func.isRequired,
	handleSaveItems: PropTypes.func.isRequired,
};

export default ProjectButtons;