import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
    filter shown with <input onChange={handleFilterChange} />
  </div>
  )

}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <
          input 
          value={newName}
          onChange={handleNameChange} 
        />
      </div>
      <div>
        number: <
          input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Persons = ({personsToShow}) => {
  return (
    <ul>
      {personsToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    const samePerson = persons.filter(person => person.name === newName)

    if(samePerson.length > 0)
      alert(`${newName} is already added to phonebook`)
    else
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
        <h2>Phonebook</h2>
        <Filter handleFilterChange={handleFilterChange} /> 
        <h2>Add a new</h2>
        <PersonForm 
          addPerson={addPerson}
          newName={newName} 
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange} 
        />
        <div>debug: {newName} - {newNumber}</div>
        <h2>Number</h2>
        <Persons personsToShow={personsToShow} />
    </div>
  );
}

export default App;
