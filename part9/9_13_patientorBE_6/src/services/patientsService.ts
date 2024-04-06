import patientsEntry from "../../data/patients";

import { Patient, NonSensitivePatientEntry } from "../types";

const getPatients = (): Patient[] => {
  return patientsEntry;
};

const getNonSensitivePatientEntry = (): NonSensitivePatientEntry[] => {
  return patientsEntry.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getPatients, getNonSensitivePatientEntry };
