import React, { useState, useEffect } from "react";
import axios from 'axios'

const promise = axios.get('http://localhost:3001/persons')
console.log(promise)

const Persons = props => {
  const { persons, filter } = props;
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  console.log(filteredPersons);
  return (
    <div>
      {filteredPersons.map(person => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Filter = props => {
  return (
    <form>
      <div>
        rajaa näytettäviä <input value={props.filter} onChange={props.handleFilterChange} />
      </div>
    </form>
  );
};

const PersonForm = props => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        nimi: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        numero : <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  const addPerson = event => {
    event.preventDefault();

    const names = persons.map(person => person.name);
    if (names.includes(newName))
      return window.alert(`${newName} on jo luettelossa`);

    const nameObject = {
      name: newName,
      number: newNumber
    };

    axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
        console.log("nappia painettu", event.target);
      })
  };

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>lisää uusi</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numerot</h2>
      <Persons persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
