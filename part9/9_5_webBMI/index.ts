import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();
app.use(express.json());

app.get("/bmi", (_req, res) => {
  const weight = Number(_req.query.weight);
  const height = Number(_req.query.height);

  // if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
  //   return res.status(400).json({ error: "malformatted parameters" });
  // }

  // const bmi = weight / height ** 2;
  const bmi = calculateBmi(weight, height);
  // console.log(bmi);
  // if (isNaN(bmi)) {
  //   res.json({ error: "malformatted parameters" });
  // }
  res.json(bmi);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
