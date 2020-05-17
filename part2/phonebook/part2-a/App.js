import React, { useState } from "react";
import "./styles.css";
import Persons from "./Persons"
import Filter from "./Filter"
import PersonForm from "./PersonForm"

export default function App() {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    console.log(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.findIndex((person) => person.name === newName) >= 0) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else
    {
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson = {addPerson} 
                  newName = {newName}
                  handleNameChange = {handleNameChange}
                  newNumber = {newNumber}
                  handleNumberChange = {handleNumberChange}
      />
      <hr />
      <h2>Numbers</h2>
      <Persons persons = {persons} filter = {newFilter} /> 
    </div>
  )
}
