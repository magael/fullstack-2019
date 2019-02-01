import React, { useState } from "react";
// import Name from ".components/Name";

const Persons = (props) => {
  console.log(props)
  const { person } = props;
  return <p>{person.name}</p>;
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Martti Tienari", number: "040-123456" },
    { name: "Arto Järvinen", number: "040-123456" },
    { name: "Lea Kutvonen", number: "040-123456" }
  ]);
  const [newName, setNewName] = useState("");

  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addName = event => {
    event.preventDefault();

    const names = persons.map(person => person.name);

    if (names.includes(newName)) {
      console.log("on jo")
      return (window.alert(`${newName} on jo luettelossa`));
    }
    console.log(persons)
    console.log("ei ollu??")

    const nameObject = {
      name: newName,
      number: "0",
    }

    setPersons(persons.concat(nameObject));
    console.log("nappia painettu", event.target);
  };

  const rows = () =>
    persons.map(person => <Persons key={person.name} person={person} />);

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addName}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange} />
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
