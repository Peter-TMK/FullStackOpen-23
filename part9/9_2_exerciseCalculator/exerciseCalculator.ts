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

const hours = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;
const result = calculateExercises(hours, target);
console.log(result);
