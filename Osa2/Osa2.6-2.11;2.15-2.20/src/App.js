import axios from 'axios';
import React, { useState, useEffect } from 'react';
import NoteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState(
    []
  );
  const [newName, setNewName] = useState(
    ''
  );
  const [newNumber, setNewNumber] = useState(
    ''
  );
  const [nameToShow, setNameToShow] = useState(
    ''
  )
  const [notificationName, setNotificationName] = useState(
    ''
  )
  const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(nameToShow.toLocaleLowerCase()))

  useEffect(() => {
    NoteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleForm = (event) => {
    event.preventDefault();
    if(persons.find(element => element.name === newName) !== undefined){
      alert(`${newName} is already in phonebook, replace the old number with a new one?`)
      persons.forEach(person => {
        if(person.name === newName){
          const newObject = {...person, number: newNumber}
          axios
            .put(`http://localhost:3001/persons/${newObject.id}`, newObject)
        }
      })
      setNewName('')
      setNewNumber('')
      window.location.reload()
      return;
    }
    let id = persons.length + 1
    persons.forEach(element => {
      if(element.id === id){
        id += 1
      }
    })
    const personObject = {
      name: newName,
      number: newNumber,
      id: id
    }
    NoteService
      .newPerson(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
    setNotificationName(newName)
    setNewName('');
    setNewNumber('');
    setTimeout(() => {
      setNotificationName('')
    }, 3000)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFilterChange = (event) => {
    setNameToShow(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification name={notificationName} />
      <SearchBar nameToShow={nameToShow} handleFilterChange={handleFilterChange} />
      <PersonForm handleForm={handleForm} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Persons persons={personsToShow} />
    </div>
  );
}

const SearchBar = ({ nameToShow, handleFilterChange }) => {
  return (
    <div>
    filter shown with
    <input
      value={nameToShow}
      onChange={handleFilterChange}
    />
    </div>
  )
}

const PersonForm = ({ handleForm, newName, handleNameChange, newNumber, handleNumberChange, setPersons }) => {
  return (
    <div>
    <h2>Add a new</h2>
    <form onSubmit={handleForm}>
      <div>
        name: <input
                value={newName}
                onChange={handleNameChange}
              />
      </div>
      <div>
        number: <input
                  value={newNumber}
                  onChange={handleNumberChange}
                />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
  );
}

const Persons = ({ persons, setPersons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person name={person.name} number={person.number} key={person.name} id={person.id} />)}
      </ul>
    </div>
  );
}

const Person = ({ name, number, id }) => {
  return <li>{name} {number} 
    <button onClick={() => {
      window.confirm('Are you sure you want to delete?')
        axios
          .delete(`http://localhost:3001/persons/${id}`)
          .then(response => {
            console.log(response.data)
          })
      window.location.reload()   
      }
   }
  >
    delete
    </button></li>
}

const Notification = ({ name }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    borderStyle: 'solid',
    margin: 5,
    fontSize: 25
  }
  if(name === ''){
    return null
  }

  return (
    <div style={notificationStyle}>
      Added {name}
    </div>
  )
}

export default App;