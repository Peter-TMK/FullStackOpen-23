import { useState } from "react";
import Name from "./components/Name";

const App = (props) => {
  const [persons, setPersons] = useState(props.persons);
  const [newName, setNewName] = useState("Hello...");

  const addName = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }

    const nameObject = {
      id: persons.length + 1,
      name: newName,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onClick={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <div>
        {persons.map((person) => (
          <Name key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
