import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'


const App = () => {
    const [newFilter, setNewfilter]   = useState('')
    const [countries, setCountries]   = useState([])
    const [verbose, setVerbose]       = useState([])
    
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        response.data.map(country => country.verbose=false)
        setCountries(response.data)
      })
  }, [])

    const handleNameChange = (event) => {
        setNewfilter(event.target.value)
    }

    const countriesToShow = (newFilter === '') ? countries : 
                            countries.filter((country) => {
                                return (country.name.toLowerCase().indexOf(newFilter) !== -1)
                            })

    const toggleVerbose = (name) => {
        const tempCountry = countries.find(country => country.name === name)
        tempCountry.verbose = !tempCountry.verbose
        
        setCountries(countries.map(country => country.name !== name ? country : tempCountry))
    }
    
    return (
        <div>
            <h2>Countries</h2>
                <div>
                    Filter: <input value={newFilter} 
                            onChange = {handleNameChange}/>
                </div>
            <hr />
             <ul>
                <Countries countries = {countriesToShow} toggleVerbose = {toggleVerbose}/>
             </ul>
        </div>
    )
}

export default App
