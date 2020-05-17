import React from "react";
import Person from "./Person";

const Persons = ( props ) => {
	const personsToShow = props.filter === undefined ? props.persons :
		props.persons.filter(person => { return person.name.indexOf(props.filter) !== -1; });

	return (
		<ul>{personsToShow.map((person, i) => (<Person key={i} person={person} deletePerson = {() => props.deletePerson(person.id)}/>))}</ul>);
};

export default Persons;
