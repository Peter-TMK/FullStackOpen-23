// import http from "http";
// const http = require("http");
const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const PORT = 3001;

// Get all notes
app.get("/api/notes", (req, res) => {
  res.status(200).json(notes);
});

// Get single note
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  //   console.log(id);
  const note = notes.find((note) => note.id === +id);
  //   console.log(note);
  if (!note) {
    res.status(404).end();
  }
  res.send(note);
});

// Delete note
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.filter((note) => note.id !== +id);
  res.send(note);
});

app.post("/api/notes", (req, res) => {
  // const id = req.body.id;
  const note = req.body;
  // const important = req.body.important;

  // const newNote = new notes({
  //   id,
  //   content,
  //   important,
  // });
  // note.id = notes.length++;
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  // const note = request.body
  note.id = maxId + 1;
  notes = notes.concat(note);
  res.status(201).json(notes);
});

app.listen(PORT, () => {
  console.log(`server running @ http://localhost:${PORT}`);
});
