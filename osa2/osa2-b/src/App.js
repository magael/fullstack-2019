import React, { useState } from "react";

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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Martti Tienari", number: "040-123456" },
    { name: "Arto Järvinen", number: "040-123456" },
    { name: "Lea Kutvonen", number: "040-123456" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

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

    setPersons(persons.concat(nameObject));
    console.log("nappia painettu", event.target);
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
