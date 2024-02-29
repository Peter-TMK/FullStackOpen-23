import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();
app.use(express.json());

interface ExerciseRequest {
  daily_exercises: number[];
  target: number;
}

interface ExerciseResponse {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
  // error?: string; // Add the optional error property
}

interface ErrorResponse {
  error?: string;
}

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

app.post(
  "/exercises",
  (
    req: Request<{}, {}, ExerciseRequest>,
    res: Response<ExerciseResponse | ErrorResponse>
  ) => {
    const { daily_exercises, target } = req.body;

    // Check if parameters are missing or malformatted
    if (
      !daily_exercises ||
      !target ||
      !Array.isArray(daily_exercises) ||
      isNaN(Number(target))
    ) {
      const errorResponse: ErrorResponse = {
        error: "parameters missing or malformatted",
      };
      return res.status(400).json(errorResponse);
    }

    // Calculate exercise statistics
    const periodLength = daily_exercises.length;
    const trainingDays = daily_exercises.filter((hours) => hours > 0).length;
    const average =
      daily_exercises.reduce((acc, curr) => acc + curr, 0) / periodLength;
    const success = average >= target;

    // Determine rating
    let rating = 1;
    if (average >= target) {
      rating = 3;
    } else if (average >= target / 2) {
      rating = 2;
    }

    // Define rating description
    let ratingDescription = "bad";
    if (rating === 2) {
      ratingDescription = "not too bad but could be better";
    } else if (rating === 3) {
      ratingDescription = "very good, keep it up!";
    }

    // Send response
    const response: ExerciseResponse = {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    };
    return res.json(response);
  }
);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
