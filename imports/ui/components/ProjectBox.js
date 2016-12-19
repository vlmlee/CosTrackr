import React, { PropTypes } from 'react';

const ProjectBox = ({ id, name, createdAt, total }) => (
	<ul>
		<li>
			<a href={"/project/"+id}>
				{id}
			</a>
		</li>
		<li>{name}</li>
		<li>{createdAt}</li>
		<li>{total}</li>
	</ul>
);

ProjectBox.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	total: PropTypes.number.isRequired,
}

export default ProjectBox;