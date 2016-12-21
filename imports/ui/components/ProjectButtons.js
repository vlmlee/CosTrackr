import React, { PropTypes } from 'react';

const ProjectButtons = ({createNewItem, toggleMakePublic}) => (
	<section>
		<input
			type="button" 
			onClick={ () => createNewItem() }
			value="Add new input" />
		<input
			type="button"
			onClick={ () => toggleMakePublic() }
			value="Make Public" />
	</section>
);

ProjectButtons.propTypes = {
	createNewItem: PropTypes.func.isRequired,
	toggleMakePublic: PropTypes.func.isRequired,
};

export default ProjectButtons;