// Define CoursePartBase interface
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

// Define interface extending CoursePartBase with description attribute
interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

// Define CoursePartBasic interface without description attribute
interface CoursePartBasic extends CoursePartBase {
  kind: "basic";
  description?: string; // Make description optional
}

// Define CoursePartGroup interface without description attribute
interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

// Define CoursePartBackground interface without description attribute
interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background";
}

// Define interface extending CoursePartBase with description and requirements attributes
interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special";
}

// Define CoursePart union type
type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

// Define PartProps interface
interface PartProps {
  part: CoursePart;
}

// Part component renders all attributes of each type of course part
const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>Exercise Count: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>Exercise Count: {part.exerciseCount}</p>
          <p>Group Project Count: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>Exercise Count: {part.exerciseCount}</p>
          <p>Background Material: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>Exercise Count: {part.exerciseCount}</p>
          <p>Description: {part.description}</p>
          <p>Requirements: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

// const Part: React.FC<PartProps> = ({ part }) => {
//     switch (part.kind) {
//       case "basic":
//         return (
//           <div>
//             <p>Name: {part.name}</p>
//             <p>Exercise Count: {part.exerciseCount}</p>
//             <p>Description: {(part as CoursePartWithDescription).description}</p>
//           </div>
//         );
//       case "group":
//         return (
//           <div>
//             <p>Name: {part.name}</p>
//             <p>Exercise Count: {part.exerciseCount}</p>
//             <p>Group Project Count: {part.groupProjectCount}</p>
//           </div>
//         );
//       case "background":
//         return (
//           <div>
//             <p>Name: {part.name}</p>
//             <p>Exercise Count: {part.exerciseCount}</p>
//             <p>Background Material: {part.backgroundMaterial}</p>
//           </div>
//         );
//       default:
//         return assertNever(part);
//     }
//   };

// Helper function to ensure exhaustive switch case
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;
