import React, { useState } from "react";
// import Name from ".components/Name";

const Persons = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
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

  const rows = () => {
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    );
    console.log(filteredPersons);
    return filteredPersons.map(person => <Persons key={person.name} person={person} />);
  };

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <form>
        <div>
          rajaa näytettäviä{" "}
          <input value={newFilter} onChange={handleFilterChange} />
        </div>
      </form>

      <h2>lisää uusi</h2>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          numero : <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>

      <h2>Numerot</h2>
      <div>{rows()}</div>
    </div>
  );
};

export default App;
