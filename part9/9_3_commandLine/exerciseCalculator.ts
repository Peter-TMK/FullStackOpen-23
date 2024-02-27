interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  hours: number[],
  target: number
): ExerciseValues => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const sum = hours.reduce((acc, cur) => acc + cur, 0);
  const average = sum / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average < target / 2) {
    rating = 1;
    ratingDescription = "poor";
  } else if (average >= target / 2 && average < target) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "good job, target reached";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (
  args: Array<string>
): { target: number; hours: Array<number> } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("Target value is not a number");

  const hours = args.slice(3).map((hour) => {
    const parsedHour = Number(hour);
    if (isNaN(parsedHour)) throw new Error("Invalid hour value");
    return parsedHour;
  });

  return {
    target,
    hours,
  };
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error) {
  console.log("Error:", error.message);
}

export default calculateExercises;

// const hours = [3, 0, 2, 4.5, 0, 3, 1];
// const target = 2;
// const result = calculateExercises(hours, target);
// console.log(result);
