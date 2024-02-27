const calculateBmi = (weight: number, height: number): string => {
  let heightInMeterSquare = (height / 100) ** 2;
  let bmi = weight / heightInMeterSquare;
  //   console.log(bmi);
  return "Normal (healthy weight)";
};

console.log(calculateBmi(180, 74));
