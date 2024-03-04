import diagnosesEntry from "../../data/diagnoses";

import { Diagnosis } from "../types"; // Assuming Diagnosis type is defined in types.ts

// const diagnoses: Diagnosis[] = [
//   { code: "A00", name: "Cholera" },
//   { code: "B00", name: "Common cold" },
//   // Add more diagnoses as needed
// ];

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesEntry;
};

export default getDiagnoses;
