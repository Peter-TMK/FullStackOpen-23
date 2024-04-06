import express from "express";
import { v1 as uuid } from "uuid";

import patientService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getNonSensitivePatientEntry();
  res.json(patients);
});

// Array to store patient data
let patients = [];

// Endpoint to add a new patient
router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  // Check if all required fields are present
  if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Create a new patient object with a unique ID
  const newPatient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  // Add the new patient to the patients array
  patients.push(newPatient);

  // Respond with the added patient
  return res.json(newPatient);
});

export default router;
