import React from "react";
import Person from "./Person";

const Persons = ({ persons, filter }) => {
  const personsToShow =
    filter === undefined
      ? persons
      : persons.filter(person => {
          return person.name.indexOf(filter) !== -1;
        });

    return (
    <ul>
      {personsToShow.map((person, i) => (
        <Person key={i} person={person} />
      ))}
    </ul>
  );
};

export default Persons;
