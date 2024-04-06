export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string; // Optional property
}

export interface PatientRequest {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string; // Optional property
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn">;
