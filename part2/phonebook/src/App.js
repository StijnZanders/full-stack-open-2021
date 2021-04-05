import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({personsToShow, deletePerson}) => {
  return (
    <ul>
      {personsToShow.map(person => <li key={person.name}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></li>)}
    </ul>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  else
    return (
      <div className="note">
        {message}
      </div>
    )
}

const ErrorMessage = ({message}) => {
  if (message === null) {
    return null
  }
  else
    return (
      <div className="error">
        {message}
      </div>
    )
}

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const samePerson = persons.filter(person => person.name === newName)

    if(samePerson.length > 0){      
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`))
        personService
          .update(samePerson[0].id, newPerson)
          .then(returnedPerson=> {
            setPersons(persons.map(person => person.id === samePerson[0].id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `Person '${newPerson.name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== samePerson[0].id))
          })
    }
    else
      personService
        .create(newPerson)
        .then(returnedPerson=> {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${newPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
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

  const deletePerson = (person) => {
      if (window.confirm(`Delete ${person.name}?`)){
        personService
          .deletePerson(person.id)
          .then(returnedPerson => {
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
  }

  return (
    <div>
        <h2>Phonebook</h2>
        <ErrorMessage message={errorMessage} />
        <Notification message={notification} />
        <Filter handleFilterChange={handleFilterChange} /> 
        <h2>Add a new</h2>
        <PersonForm 
          addPerson={addPerson}
          newName={newName} 
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange} 
        />
        <h2>Number</h2>
        <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
}

export default App;
