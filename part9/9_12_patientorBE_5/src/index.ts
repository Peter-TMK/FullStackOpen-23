import express from "express";
// import { v1 as uuid } from "uuid";

import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

// // Array to store patient data
// let patients = [];

// // Endpoint to add a new patient
// app.post("/api/patients", (req, res) => {
//   const { name, dateOfBirth, ssn, gender, occupation } = req.body;

//   // Check if all required fields are present
//   if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   // Create a new patient object with a unique ID
//   const newPatient = {
//     id: uuid(),
//     name,
//     dateOfBirth,
//     ssn,
//     gender,
//     occupation,
//   };

//   // Add the new patient to the patients array
//   patients.push(newPatient);

//   // Respond with the added patient
//   return res.json(newPatient);
// });

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
