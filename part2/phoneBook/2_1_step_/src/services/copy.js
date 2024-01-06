import { useState, useEffect } from "react";
// import axios from "axios";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  // const hook = () => {
  //   console.log("effect");
  //   axios.get("http://localhost:3001/notes").then((response) => {
  //     console.log("promise fulfilled");
  //     setNotes(response.data);
  //   });
  // };

  useEffect(() => {
    // console.log("effect");
    noteService.getAll().then((initialNotes) => {
      // console.log("promise fulfilled");
      setNotes(initialNotes);
    });
  }, []);
  // console.log("render", notes.length, "notes");

  const toggleImportanceOf = (id) => {
    // console.log(`importance of ${id} needs to be toggled`);
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    // console.log(changedNote);
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        console.log(error);
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (event) => {
    event.preventDefault();
    // console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // since it's better to let the server generate ids for our resources
      // id: notes.length + 1,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
      // console.log(response);
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleNoteChange = (event) => {
    // console.log(event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onClick={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;

//////////////////////////////////////////


import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
};


///////////////////////////////////////


const Note = ({ note, toggleImportance }) => {
    const label = note.important ? "make not important" : "make inportant";

    return (
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    );
  };

  export default Note;


  ////////////////////////////////////////


  {
    "notes": [
      {
        "id": 1,
        "content": "HTML is easy",
        "important": true
      },
      {
        "id": 2,
        "content": "Browser can execute only JavaScript",
        "important": false
      },
      {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "important": true
      },
      {
        "content": "a new note...",
        "important": false,
        "id": 4
      },
      {
        "content": "a new note...",
        "important": false,
        "id": 5
      },
      {
        "content": "a new note...",
        "important": false,
        "id": 6
      },
      {
        "content": "a new note...",
        "important": true,
        "id": 7
      },
      {
        "content": "a new note...",
        "important": false,
        "id": 8
      },
      {
        "content": "Hello.",
        "important": false,
        "id": 9
      },
      {
        "content": "Hello.",
        "important": true,
        "id": 10
      },
      {
        "content": "Hello.",
        "important": true,
        "id": 11
      },
      {
        "content": "Zindi",
        "important": false,
        "id": 12
      },
      {
        "content": "Zindi",
        "important": true,
        "id": 13
      },
      {
        "content": "a new note...",
        "important": true,
        "id": 14
      },
      {
        "content": "a new note...",
        "important": false,
        "id": 15
      },
      {
        "content": "a new note...",
        "important": false,
        "id": 16
      },
      {
        "content": "Kaggle",
        "important": true,
        "id": 17
      },
      {
        "content": "a new note...",
        "important": true,
        "id": 18
      },
      {
        "content": "Lappy",
        "important": false,
        "id": 19
      },
      {
        "content": "a new note...",
        "important": true,
        "id": 20
      },
      {
        "content": "a new note...",
        "important": false,
        "id": 21
      },
      {
        "content": "Apple",
        "important": true,
        "id": 22
      },
      {
        "content": "a new note...",
        "important": false,
        "id": 23
      },
      {
        "content": "",
        "important": true,
        "id": 24
      },
      {
        "content": "Hello",
        "important": false,
        "id": 25
      },
      {
        "content": "a new note...",
        "important": true,
        "id": 26
      },
      {
        "content": "Odogwu",
        "important": false,
        "id": 27
      }
    ]
  }


  //////////////////////////////////////


Instruction:

Make it possible to delete entries from the notes.
The deletion can be done through a dedicated button for each note
in the list. You can confirm the action by
using the window.confirm method
The associated resource for a note in the backend can be deleted by
making an HTTP DELETE request to the resource's URL.
If we are deleting e.g. a note who has the id 2,
we would have to make an HTTP DELETE request to the URL localhost:3001/notes/2.
No data is sent with the request.

You can make an HTTP DELETE request with the axios library in the same way
that we make all of the other requests.
