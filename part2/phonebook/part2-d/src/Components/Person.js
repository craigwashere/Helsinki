import React from "react";

const Person = ( props ) => {
	return (
	<div>
		<li>{props.person.name} - {props.person.number}
		<button onClick={() => props.deletePerson(props.person.id)}>delete</button></li>
	</div>
	);
};

export default Person;
