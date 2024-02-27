const calculateBmi = (weight: number, height: number): string => {
  let heightInMeterSquare = (height / 100) ** 2;
  const bmi = weight / heightInMeterSquare;
  //   console.log(bmi);
  // return "Normal (healthy weight)";

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

const parseArguments = (
  args: Array<string>
): { height: number; weight: number } => {
  if (args.length !== 4) throw new Error("Invalid number of arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Invalid arguments");
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.log("Error:", error.message);
}

// console.log(calculateBmi(180, 74));
