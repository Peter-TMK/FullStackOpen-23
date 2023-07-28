const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let entries = [
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
  // const content = req.body.content;
  // res.send(content);
  // console.log(Date());
  res.send(
    `<p>Phonebook has info for ${entries.length} people</p><p>${Date()}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  // console.log(id);
  const entry = entries.find((entry) => entry.id === id);
  // console.log(entry);
  if (entry) {
    res.json(entry);
  } else {
    res.status(404).end("404: No entry for this ID");
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = +req.params.id;
  const entry = entries.filter((entry) => entry.id !== id);
  // console.log(entry);
  res.send(entry);
});

const generateId = () => {
  const maxId =
    // entries.length > 0 ? Math.random(...entries.map((n) => n.id)) : 0;
    entries.length > 0 ? Math.floor(Math.random() * (200 - 5 + 1) + 5) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  const existingEntry = entries.find((entry) => entry.name === body.name);
  if (existingEntry) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const entry = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  entries = entries.concat(entry);
  res.json(entry);
});

app.listen(PORT, () => {
  console.log(`Server hit the ground running @port ${PORT}`);
});
