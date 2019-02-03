import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const RemoveButton = props => {
  const { person, persons, setPersons } = props;
  const newPersons = persons.filter(p => p.name !== person.name);

  const popup = () => {
    if (window.confirm(`Poistetaanko ${person.name}`)) {
      personService.remove(person.id);
      setPersons(newPersons);
    }
  };

  return <button onClick={popup}>poista</button>;
};

const Persons = props => {
  const { persons, filter, setPersons } = props;
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredPersons.map(person => (
        <Person
          key={person.name}
          person={person}
          persons={persons}
          setPersons={setPersons}
        />
      ))}
    </div>
  );
};

const Person = props => {
  const { person, persons, setPersons } = props;
  return (
    <p>
      {person.name} {person.number}
      <RemoveButton person={person} persons={persons} setPersons={setPersons} />
    </p>
  );
};

const Filter = props => {
  return (
    <form>
      <div>
        rajaa näytettäviä{" "}
        <input value={props.filter} onChange={props.handleFilterChange} />
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
        numero :{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
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
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };

  const updatePerson = nameObject => {
    if (
      window.confirm(
        `${
          nameObject.name
        } on jo luettelossa, korvataanko vanha numero uudella?`
      )
    ) {
      const person = persons.find(p => p.name === nameObject.name);
      personService.update(person.id, nameObject).then(returnedPerson => {
        setPersons(persons.map(p => (p.id !== person.id ? p : returnedPerson)));
      });
    }
  };

  const addPerson = event => {
    event.preventDefault();

    const names = persons.map(person => person.name);
    const nameObject = {
      name: newName,
      number: newNumber
    };

    if (names.includes(newName)) {
      updatePerson(nameObject);
    } else {
      personService.create(nameObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      });
    }

    setNewName("");
    setNewNumber("");
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
      <Persons persons={persons} filter={newFilter} setPersons={setPersons} />
    </div>
  );
};

export default App;
