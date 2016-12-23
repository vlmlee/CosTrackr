import React, { PropTypes } from 'react';

const ProjectButtons = ({ owner, currentUser, createNewItem, toggleMakePublic, handleSaveItems }) => (
	<section>
		{ currentUser ? 
			( currentUser._id === owner ? 
				<div>
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
				</div> 
			: '' )
		: '' }
	</section>
);

ProjectButtons.propTypes = {
	createNewItem: PropTypes.func.isRequired,
	toggleMakePublic: PropTypes.func.isRequired,
};

export default ProjectButtons;