import { useState, useEffect } from "react";
import axios from "axios";
import Name from "./components/Name";

const Filter = ({ searchItem, handleSearchName }) => {
  return (
    <div>
      <h2>Search Name</h2>
      <div>
        search:{" "}
        <input
          type="text"
          value={searchItem}
          onChange={handleSearchName}
          placeholder="Search here..."
        />
      </div>
    </div>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumber,
  addName,
}) => {
  return (
    <div>
      <h3>Add a new</h3>
      <form onSubmit={addName}>
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
    </div>
  );
};

const Persons = ({ filteredUsers }) => {
  return (
    <div>
      <h3>Numbers</h3>
      <div>
        {filteredUsers.map((person) => (
          <div key={person.id}>
            <Name person={person} />
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const hook = () => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log("promise fulfilled");
        setPersons(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(hook, []);
  // console.log("render", persons.length, "persons");

  const handleSearchName = (event) => {
    setSearchItem(event.target.value);

    const filteredItems = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  };

  const addName = (event) => {
    event.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      setNumber("");
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    // setPersons([...persons, nameObject]);
    // setFilteredUsers([...filteredUsers, nameObject]);
    // setNewName("");
    // setNumber("");

    axios
      .post("http://localhost:3001/persons", nameObject)
      .then((response) => {
        setPersons([...persons, response.data]);
        setFilteredUsers([...persons, response.data]);
      })
      .catch((error) => {
        console.error("Error adding new person:", error);
      });

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

      <Filter searchItem={searchItem} handleSearchName={handleSearchName} />

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumber={handleNumber}
        addName={addName}
      />

      <Persons filteredUsers={filteredUsers} />
    </div>
  );
};

export default App;
