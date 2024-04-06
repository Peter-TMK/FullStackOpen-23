import express from "express";
import { v1 as uuid } from "uuid";
import { Patient, Gender } from "../types";

import patientService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getNonSensitivePatientEntry();
  res.json(patients);
});

// Array to store patient data
let patients: Patient[] = [];

// Endpoint to add a new patient
router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  // Check if all required fields are present
  if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Check if gender is a valid enum value
  if (!Object.values(Gender).includes(gender)) {
    return res.status(400).json({ error: "Invalid gender" });
  }

  // Create a new patient object with a unique ID
  const newPatient: Patient = {
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
