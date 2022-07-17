import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleChange = setValue => e => setValue(e.target.value)

  const handleAddNewPerson = e => {
    e.preventDefault()

    const newPerson = { name: newName, number: newNumber }
    const foundPerson = persons.find(person => person.name === newName)

    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(foundPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== foundPerson.id ? person : returnedPerson
              )
            )
          })
          .catch(_error => {
            setStatus('error')
            setMessage(
              `Information of ${foundPerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setStatus(null)
              setMessage(null)
            }, 5000)

            setPersons(persons.filter(person => person.id !== foundPerson.id))
          })
      }
    } else {
      personService.create(newPerson).then(addedPerson => {
        setPersons(persons.concat(addedPerson))

        setStatus('success')
        setMessage(`Added ${addedPerson.name}`)
        setTimeout(() => {
          setStatus(null)
          setMessage(null)
        }, 5000)

        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleRemovePerson = (id, name) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.name !== name))
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} status={status} />
      <Filter query={filterQuery} handleChange={handleChange(setFilterQuery)} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        handleChangeName={handleChange(setNewName)}
        handleChangeNumber={handleChange(setNewNumber)}
        handleAddPerson={handleAddNewPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        query={filterQuery}
        handleRemovePerson={handleRemovePerson}
      />
    </div>
  )
}

export default App
