import React, { PropTypes } from 'react';

const ProjectButtons = ({createNewItem, toggleMakePublic}) => (
	<section>
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
);

ProjectButtons.propTypes = {
	createNewItem: PropTypes.func.isRequired,
	toggleMakePublic: PropTypes.func.isRequired,
};

export default ProjectButtons;