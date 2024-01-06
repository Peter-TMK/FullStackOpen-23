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

  const deleteNote = (id, content) => {
    const confirmed = window.confirm(`Delete ${content} ?`);
    if (!confirmed) {
      return;
    }

    noteService
      .remove(id)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
        alert("Error deleting note. Please try again.");
      });
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
            deleteNote={deleteNote}
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
