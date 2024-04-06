"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { v1 as uuid } from "uuid";
const cors_1 = __importDefault(require("cors"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const patients_1 = __importDefault(require("./routes/patients"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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
app.use("/api/patients", patients_1.default);
app.use("/api/diagnoses", diagnoses_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
