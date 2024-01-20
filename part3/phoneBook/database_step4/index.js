const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Person = require("./models/person");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
// app.use(express.static("dist"));

// Define a custom token for morgan to log the request body for POST requests
morgan.token("req-body", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

// Middleware for logging with custom format
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

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
// app.get("/api/persons", (req, res) => {
//   res.status(200).json(persons);
// });

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// // Get persons info
// app.get("/info", (req, res) => {
//   res.send(
//     `Phonebook has info for ${persons.length} people. <br><br> ${Date()}`
//   );
// });

// // Get single person
// app.get("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const person = persons.find((person) => person.id === id);
//   if (!person) {
//     res.status(404).send(`Person with id: ${id} NOT found`);
//   }
//   res.status(200).json(person);
// });

// // Delete a person
// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   persons.filter((person) => person.id !== id);
//   res.send(`Person with id:${id} has been deleted successfully!`);
// });

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

// const generateId = () => {
//   const maxId =
//     persons.length > 0 ? Math.floor(Math.random() * (200 - 5 + 1) + 5) : 0;
//   return maxId + 1;
// };

// Create new person
// app.post("/api/persons", (req, res) => {
//   const body = req.body;
//   body.id = generateId();
//   if (!body.name || !body.number) {
//     res.status(404).json({ error: "name/number is missing!" });
//   }
//   const existingName = persons.find((person) => person.name === body.name);

//   if (existingName) {
//     res.status(400).json({ error: "name must be unique" });
//   }

//   persons = persons.concat(body);
//   res.status(201).send(persons);
// });

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.listen(PORT, () => {
  console.log(`server running @ http://localhost:${PORT}`);
});
