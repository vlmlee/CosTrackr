import React, { PropTypes } from 'react';

const ProjectBox = ({ id, name, createdAt, total }) => (
	<ul>
		<li>
			<a href={"/project/"+id}>
				{id}
			</a>
		</li>
		<li>{name}</li>
		<li>{createdAt ? createdAt.toString() : '' }</li>
		<li>{total}</li>
	</ul>
);

ProjectBox.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	createdAt: PropTypes.object,
	total: PropTypes.number,
}

export default ProjectBox;