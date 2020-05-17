import React from 'react'
import OneCountry from './OneCountry'
import SingleCountry from './SingleCountry'

const Countries = ({countries, toggleVerbose}) =>
{
    if (countries.length === 1){
          return (
            <SingleCountry country = {countries[0]} />
          )
    }

    if (countries.length < 10)
        return (
            <div>
                {countries.map((country, i) =>
                    <OneCountry key={i} country={country} toggleVerbose={() => toggleVerbose(country.name)} />
                )}
            </div>
        )       

    return (
      <h1> too many countries </h1>
    )
}

export default Countries
