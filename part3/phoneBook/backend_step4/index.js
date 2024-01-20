const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3001;

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Get all persons
app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});

// Get persons info
app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${persons.length} people. <br><br> ${Date()}`
  );
});

// Get single person
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    res.status(404).send(`Person with id: ${id} NOT found`);
  }
  res.status(200).json(person);
});

// Delete a person
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons.filter((person) => person.id !== id);
  res.send(`Person with id:${id} has been deleted successfully!`);
});

app.listen(PORT, () => {
  console.log(`server running @ http://localhost:${PORT}`);
});
