import express from "express";
import patientService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getNonSensitivePatientEntry();
  res.json(patients);
});

export default router;
