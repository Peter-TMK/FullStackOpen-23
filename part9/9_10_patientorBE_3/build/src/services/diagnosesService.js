"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
// const diagnoses: Diagnosis[] = [
//   { code: "A00", name: "Cholera" },
//   { code: "B00", name: "Common cold" },
//   // Add more diagnoses as needed
// ];
const getDiagnoses = () => {
    return diagnoses_1.default;
};
exports.default = getDiagnoses;
