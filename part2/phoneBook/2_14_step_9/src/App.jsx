import { useState, useEffect } from "react";
import Name from "./components/Name";
import personsService from "./services/persons";

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

const Persons = ({ filteredUsers, deleteNote }) => {
  return (
    <div>
      <h3>Numbers</h3>
      <div>
        {filteredUsers.map((person) => (
          <div key={person.id}>
            <Name person={person} deleteNote={deleteNote} />
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

  useEffect(() => {
    // console.log("effect");
    personsService.getAll().then((initialpersons) => {
      // console.log("promise fulfilled");
      setPersons(initialpersons);
      setFilteredUsers(initialpersons);
    });
  }, []);

  const handleSearchName = (event) => {
    setSearchItem(event.target.value);

    const filteredItems = persons.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  };

  const addName = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1,
    };

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      setNumber("");
      return;
    }

    personsService
      .create(nameObject)
      .then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setFilteredUsers([...persons, returnedPerson]);
      })
      .catch((error) => {
        console.error("Error adding new person:", error);
      });

    setNewName("");
    setNumber("");
  };

  const deleteNote = (id, name) => {
    const confirmed = window.confirm(`Delete ${name} ?`);
    if (!confirmed) {
      return;
    }

    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setFilteredUsers(filteredUsers.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
        alert("Error deleting person. Please try again.");
      });
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

      <Persons filteredUsers={filteredUsers} deleteNote={deleteNote} />
    </div>
  );
};

export default App;
