import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState(
    ''
  );
  const [newNumber, setNewNumber] = useState(
    ''
  );

  const handleForm = (event) => {
    event.preventDefault();
    if(persons.find(element => element.name === newName) !== undefined){
      alert(`${newName} is already in phonebook!`);
      setNewName('');
      setNewNumber('');
      return;
    }
    const personObject ={
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <PersonForm handleForm={handleForm} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Persons persons={persons}/>
    </div>
  );
}

const PersonForm = ({ handleForm, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <div>
    <h2>Phonebook</h2>
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

const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person name={person.name} number={person.number} />)}
      </ul>
    </div>
  );
}

const Person = ({ name, number }) => {
  return <li key={name}>{name} {number}</li>
}

export default App;
