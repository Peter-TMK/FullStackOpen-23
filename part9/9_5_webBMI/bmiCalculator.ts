export const calculateBmi = (
  weight: number,
  height: number
): string | object => {
  let heightInMeterSquare = (height / 100) ** 2;
  const bmi = weight / heightInMeterSquare;

  if (isNaN(bmi)) {
    return { error: "malformatted parameters" };
  } else if (bmi < 18.5) {
    return { weight, height, bmi: "Underweight" };
  } else if (bmi >= 18.5 && bmi < 25) {
    return { weight, height, bmi: "Normal (healthy weight)" };
  } else if (bmi >= 25 && bmi < 30) {
    return { weight, height, bmi: "Overweight" };
  } else {
    return { weight, height, bmi: "Obese" };
  }
};

// const parseArguments = (
//   weight: number,
//   height: number
// ): { weight: number; height: number } => {
//   // if (args.length !== 4) throw new Error("Invalid number of arguments");
//   if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
//     return {
//       weight: Number(weight),
//       height: Number(height),
//     };
//   } else {
//     throw new Error("Invalid arguments");
//   }
// };

// try {
//   const { weight, height } = parseArguments(weight, height);
//   console.log(calculateBmi(weight, height));
// } catch (error) {
//   console.log("Error:", error.message);
// }

// console.log(calculateBmi(180, 74));
