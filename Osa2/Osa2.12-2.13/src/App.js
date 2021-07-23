import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
  const [ newCountry, setNewCountry ] = useState(
    ''
  )
  const [ countries, setNewCountries ] = useState(
    []
  )
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(newCountry)
  )

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  useEffect(() => {
    axios
     .get('https://restcountries.eu/rest/v2/all')
     .then(response => {
        setNewCountries(response.data)
     })
  }, [])

  if(filteredCountries.length === 1){
    const country = filteredCountries[0]
    return (
      <div>
        <Main value={newCountry} onChange={handleCountryChange} />
        <SingleCountry name={country.name} capital={country.capital}  population={country.population} languages={country.languages} flag={country.flag} />
      </div>
    )
  }
  else if(filteredCountries.length < 10){
    return (
      <div>
        <Main value={newCountry} onChange={handleCountryChange} />
        <ul>
        {filteredCountries.map(country => {
          return <Country name={country.name} toggleCountry={() => setNewCountry(country.name.toLowerCase())} key={country.name} />
        })}
        </ul>
      </div>
    );
  }
  else{
    return (
      <div>
        <Main value={newCountry} onChange={handleCountryChange} />
        <p>Too many countries, specify another filter</p>
      </div>
    )
  }
}

const Country = ({ name, toggleCountry }) => {
  return (
    <li>
      {name }
      <button onClick={toggleCountry}>show</button>
    </li>
  )
}

const Main = ({ value, onChange }) => {
  return (
    <div>
        find countries <input
                          value={value}
                          onChange={onChange}
                       />
    </div>
  )
}

const SingleCountry = ({ name, capital, population, languages, flag }) => {
  return (
    <div>
      <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>population {population}</p>
        <h2>languages</h2>
        <p></p>
        <ul>
          {languages.map(language => {
            return <li key={language.iso639_1}>{language.name}</li>
          })}
        </ul>
        <p></p>
        <img src={flag} alt="countryFlag" width="100" height="50"/>
    </div>
  )
}

export default App;