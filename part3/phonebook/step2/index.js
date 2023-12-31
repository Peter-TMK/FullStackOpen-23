const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

const entries = [
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

app.get("/api/persons", (req, res) => {
  // res.send(entries);
  res.send(JSON.stringify(entries));
});

app.get("/info", (req, res) => {
  // console.log(Date());
  res.send(
    `<p>Phonebook has info for ${entries.length} people</p><p>${Date()}</p>`
  );
});

app.listen(PORT, () => {
  console.log(`Server hit the ground running @port ${PORT}`);
});
