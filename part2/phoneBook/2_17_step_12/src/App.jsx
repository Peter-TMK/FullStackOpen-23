import { useState, useEffect } from "react";
// import axios from "axios";
import Name from "./components/Name";
import personsService from "./services/persons";
import "./index.css";

// const Notification = ({ successMessage }) => {
//   return <div className="success-message">{successMessage}</div>;
// };

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

// const Notification = ({ successMessage }) => {
//   return <div className="success-message">{successMessage}</div>;
// };

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumber,
  addName,
  // successMessage,
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
      {/* {successMessage && <Notification successMessage={successMessage} />} */}
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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const Notification = () => {
  //   return <h1>{successMessage}</h1>;
  // };

  const Notification = ({ message, isError }) => {
    if (!message) {
      return null;
    }

    const className = isError ? "error-message" : "success-message";

    return <div className={className}>{message}</div>;
  };

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

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      const confirmed = window.confirm(
        `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
      );

      if (!confirmed) {
        // If the user doesn't confirm, do nothing
        return;
      }

      // Make an HTTP PUT request to update the phone number
      personsService
        .update(existingPerson.id, nameObject)
        .then((updatedPerson) => {
          setPersons((prevPersons) =>
            prevPersons.map((person) =>
              person.id === existingPerson.id ? updatedPerson : person
            )
          );
          setFilteredUsers((prevFilterUsers) =>
            prevFilterUsers.map((person) =>
              person.id === existingPerson.id ? updatedPerson : person
            )
          );
          setSuccessMessage(`Added ${updatedPerson.name}`);
          setTimeout(() => {
            setSuccessMessage("");
          }, 4000);
        })
        .catch((error) => {
          console.error("Error updating person:", error);
          // alert("Error updating person. Please try again.");
          if (error.response && error.response.status === 404) {
            setErrorMessage(
              `Information ${existingPerson.name} has already been removed from the server`
            );
          } else {
            setErrorMessage("Error updating person. Please try again.");
          }
        });
    } else {
      // If the person doesn't exist, add a new one
      personsService
        .create(nameObject)
        .then((returnedPerson) => {
          setPersons((prevPersons) => [...prevPersons, returnedPerson]);
          setFilteredUsers((prevFilteredUsers) => [
            ...prevFilteredUsers,
            returnedPerson,
          ]);
          setSuccessMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setSuccessMessage("");
          }, 4000);
        })
        .catch((error) => {
          console.error("Error adding new person:", error);
          alert("Error adding new person. Please try again.");
        });
    }

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
      {/* <Notification /> */}
      {/* <Notification successMessage={successMessage} /> */}

      <Notification message={successMessage} isError={false} />
      <Notification message={errorMessage} isError={true} />

      <Filter searchItem={searchItem} handleSearchName={handleSearchName} />

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumber={handleNumber}
        addName={addName}
        // successMessage={successMessage}
      />
      <Persons filteredUsers={filteredUsers} deleteNote={deleteNote} />
    </div>
  );
};

export default App;
