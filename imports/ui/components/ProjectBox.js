import React from 'react';

const ProjectBox = (props) => (
	<ul>
		<li>
			<a href={"/project/"+props.project._id}>
				{props.project._id}
			</a>
		</li>
		<li>{props.project.name}</li>
		<li>{props.project.createdAt.toString()}</li>
		<li>{props.project.items}</li>
		<li>{props.project.total}</li>
	</ul>
);

export default ProjectBox;