// const multiplicator = (a, b, printText) => {
//   console.log(printText, a * b);
// };

// multiplicator(2, 4, "Multiplied numbers 2 and 4, the result is:");

//////////////////////////////////////////////////////////////

// const multiplicator = (a, b, printText) => {
//   console.log(printText, a * b);
// };

// multiplicator(
//   "how about a string?",
//   4,
//   "Multiplied a string and 4, the result is:"
// );

/////////////////////////////////////////////////////////

// const multiplicator = (a: number, b: number, printText: string) => {
//   console.log(printText, a * b);
// };

// multiplicator(
//   "how about a string?",
//   4,
//   "Multiplied a string and 4, the result is:"
// );

//////////////////////////////////////////////////////////

// type Operation = "multiply" | "add" | "divide";
// type Result = number | string;

// const calculator = (a: number, b: number, op: Operation): Result => {
//   if (op === "multiply") {
//     return a * b;
//   } else if (op === "add") {
//     return a + b;
//   } else if (op === "divide") {
//     if (b === 0) return "can't divide by 0!";
//     return a / b;
//   }
// };

// console.log(calculator(15, 3, "add"));
// console.log(calculator(15, 0, "add"));

///////////////////////////////////////////////////

// type Operation = "add" | "multiply" | "divide";

// const calculator = (a: number, b: number, op: Operation) => {
//   switch (op) {
//     case "add":
//       return a + b;
//     case "multiply":
//       return a * b;
//     case "divide":
//       if (b === 0) throw new Error("Can't divide by 0");
//       return a / b;
//     default:
//       throw new Error("Operation is not multiply, add or divide!");
//   }
// };

// try {
//   console.log(calculator(15, 3, "add"));
//   console.log(calculator(15, 0, "divide"));
//   console.log(calculator(1, 5, "divide"));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong: ";
//   if (error instanceof Error) {
//     errorMessage += error.message;
//   }
//   console.log(errorMessage);
// }

// const multiplicator = (a: number, b: number, printText: string) => {
//   console.log(printText, a * b);
// };

// const a: number = Number(process.argv[2]);
// const b: number = Number(process.argv[3]);
// multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(
    value1,
    value2,
    `Multiplied ${value1} and ${value2}, the result is:`
  );
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
