import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'

const App = () => {
    const [newPerson, setNewPerson]   = useState('')
    const [newNumber, setnewNumber]   = useState('')
    const [persons, setPersons]       = useState([])
    
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

    console.log('render', persons.length, 'notes')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newPerson,
            id: persons.length + 1,
        }

        setPersons(persons.concat(personObject))
        setNewPerson('')
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewPerson(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSumbit={addPerson}>
                <div>
                    name: <input value={newPerson} 
                            onChange = {handleNameChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <hr />
            <h2>Numbers</h2>
             <ul>
             {persons.map(person =>
                <Person key={person.id} person={person} />
            )}
             </ul>
        </div>
    )
}

export default App
