import React from 'react'
import List from './List'

const OneCountry = ({country, toggleVerbose}) =>
{
    if (country.verbose === false){
        return (
            <div>
            <li>{country.name}<button onClick={() => toggleVerbose(country.name)}>show</button></li>
            </div>
        )
    }
    return (
        <div>
            <h1>{country.name}<button onClick={() => toggleVerbose(country.name)}>hide</button></h1>
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

export default OneCountry