import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({country, weatherData}) => {
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature:</b> {weatherData.current.temperature} celsius</p>
      <p><img src={weatherData.current.weather_icons[0]} width='60' /></p>
      <p><b>wind:</b> {weatherData.current.wind_speed}mph direction {weatherData.current.wind_dir}</p>
    </div>
  )
}

const Countries = ({countries, setCountryFilter, weatherData, setWeatherData, api_key}) => {
  const country = countries[0]

  useEffect(() => {
    if (countries.length==1){
      setWeatherData()
      let weather_api_url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

      axios
        .get(weather_api_url)
        .then(response => {
          setWeatherData(response.data)
        })
    }
  }, [country])

  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>
  else if (countries.length === 1 && weatherData != null){
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>

        <h2>Spoken Languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
        </ul>
        <img src={country.flag} width='200' />
        { weatherData != null ? <Weather country={country} weatherData={weatherData} /> : '' }
      </div>
    )
  }
  else
      return (
        <div>
          {countries.map(country => <p id={country.alpha3code}>{country.name} <button onClick={() => setCountryFilter(country.name.toLowerCase())}>show</button></p>)}
        </div>
      )
}


const App = () => {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weatherData, setWeatherData] = useState()

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')


  const handleCountryFilter = (event) => {
    setCountryFilter(event.target.value.toLowerCase())
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(countryFilter))
  
  return (
    <div>
      <div>
        find countries
        <input value={countryFilter} onChange={handleCountryFilter} />
      </div>
      <div>
        <Countries countries={countriesToShow} setCountryFilter={setCountryFilter} weatherData={weatherData} setWeatherData={setWeatherData} api_key={api_key} />
      </div>
    </div>
  );
}

export default App;
