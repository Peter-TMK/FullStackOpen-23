"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const patientsService_1 = __importDefault(require("../services/patientsService"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    const patients = patientsService_1.default.getNonSensitivePatientEntry();
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
        id: (0, uuid_1.v1)(),
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
exports.default = router;
