import React from 'react'
import List from './List'

const SingleCountry = ({ country }) => {
    return (
      <div>
        <h1> {country.name} </h1>
        <p>capital: {country.capital}</p>
        <h1>languages</h1>
        <ul>
          {country.languages.map((language, i) => (
              <List key = {i} list = {language} />
            ))}
        <br />
        </ul>
        <img src= {country.flag} alt="" style={{width:100, height:100}}/>
      </div>
    )
}

export default SingleCountry