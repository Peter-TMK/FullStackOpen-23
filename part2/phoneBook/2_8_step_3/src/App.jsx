import { useState } from "react";
import Name from "./components/Name";

const App = (props) => {
  const [persons, setPersons] = useState(props.persons);
  const [newName, setNewName] = useState("my name");
  const [newNumber, setNumber] = useState("");

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
      number: newNumber,
    };

    setPersons(persons.concat(nameObject));
    // setNumber(newNumber.concat(nameObject));
    setNewName("");
    setNumber("");
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onClick={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <div>
        {persons.map((person) => (
          <div key={person.id}>
            <Name person={person} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
