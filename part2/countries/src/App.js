import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [showCountry, setShowCountry] = useState({})

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response =>
      setCountries(
        response.data.map(({ name, capital, area, languages, flags }) => ({
          name: name.common,
          capital,
          area,
          languages,
          flags,
        }))
      )
    )
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(query)
  )

  const handleChange = e => {
    setQuery(e.target.value)
    setShowCountry({})
  }

  const handleShow = name => () =>
    setShowCountry(
      filteredCountries.filter(country => country.name.includes(name))[0]
    )

  return (
    <div>
      <p>
        find countries <input value={query} onChange={handleChange} />
      </p>
      {filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map(country => (
          <div key={country.name}>
            {country.name}{' '}
            <button onClick={handleShow(country.name)}>show</button>
          </div>
        ))}
      {filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}
      {showCountry.name && <CountryDetails country={showCountry} />}
    </div>
  )
}

export default App
