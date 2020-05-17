import React, { useState, useEffect } from "react";
import Persons from "./Components/Persons"
import Filter from "./Components/Filter"
import PersonForm from "./Components/PersonForm"
import personService from './Services/persons'


export default function App() {
	const [ persons, setPersons]		= useState([])
	const [ newName, setNewName ]		= useState('')
	const [ newNumber, setNewNumber ]	= useState('')
	const [ newFilter, setNewFilter ]	= useState('')
	const [ message, setMessage]		= useState(null)
	const [ messageType, setMessageType ]	= useState("success")
 
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

	useEffect(() => {
		console.log('effect')
		personService
			.getAll()
			.then(initialPersons => setPersons(initialPersons))
	}, [])

	const Notification = ({ message, messageType }) => {
		console.log("Notification", messageType)
		if (message === null) {
			return null
		}

		return (<div className={messageType}>{message}</div>)
	}

	const addPerson = (event) => {
		event.preventDefault()

		const tempPerson = persons.find((person) => person.name === newName)
		if (tempPerson !== undefined) {
			if (window.confirm(`{newName} is already added to phonebook, replace old number with a new one?`))
			{
				const personObject = {
					name: newName,
					number: newNumber
				}
				personService.update(tempPerson.id, personObject)
					.then(returnedPerson => {
						setPersons(persons.map(person => (person.id !== returnedPerson.id)? 
							person : returnedPerson))
						setNewName('')
						setNewNumber('')
						setMessageType("success")
						setMessage (`Person ${newName} successfully updated`)
						setTimeout(() => { setMessage(null)}, 2000)
					})
					.catch(error => {
						setMessageType("error") 
						setMessage (`Person ${newName} was already removed from server`)
						setTimeout(() => { setMessage(null)}, 5000)
						setPersons(persons.filter(person => person.name !== newName))
					})
			}
		}
		else
		{
			const personObject = {
				name: newName,
				number: newNumber
			}

			personService
				.create(personObject)
				.then(returnedPerson => {
					setPersons(persons.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
					setMessageType("success")
					setMessage (`Person ${newName} successfully updated`)
					setTimeout(() => { setMessage(null)}, 2000)
				})
		}
	}

	const deletePerson = (id) => {
		const name = persons.find(person => person.id === id).name
		if (window.confirm(`Delete ${name}`)) {
			personService.deletePerson(id)
				.then(response => setPersons(persons.filter(person => person.id !== id)))
					.catch(error => {
						setMessageType("error") 
						setMessage (`Person ${newName} was already removed from server`)
						setTimeout(() => { setMessage(null)}, 5000)
						setPersons(persons.filter(person => person.id !== id))
					})

		}
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} messageType = {messageType} />
			<Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
			<h3>Add a new</h3>
			<PersonForm	addPerson 		= {addPerson} 
					newName			= {newName}
					handleNameChange	= {handleNameChange}
					newNumber		= {newNumber}
					handleNumberChange	= {handleNumberChange}
			/>
			<hr />
			<h2>Numbers</h2>
			<Persons persons = {persons} filter = {newFilter} deletePerson = {deletePerson} /> 
		</div>
	)
}
