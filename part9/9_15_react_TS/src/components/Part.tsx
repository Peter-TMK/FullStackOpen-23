import React from "react";

// Define PartProps interface
interface PartProps {
  part: {
    name: string;
    exerciseCount: number;
    description?: string;
    groupProjectCount?: number;
    backgroundMaterial?: string;
    requirements?: string[];
    kind: "basic" | "group" | "background" | "special";
  };
}

// Part component renders all attributes of each type of course part
const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          {/* <p>Name: {part.name}</p> */}
          {/* <p>Exercise Count: {part.exerciseCount}</p> */}
          <p>
            <i>Description: {part.description}</i>
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          {/* <p>Name: {part.name}</p> */}
          {/* <p>Exercise Count: {part.exerciseCount}</p> */}
          <p>
            <i> Project Count: {part.groupProjectCount}</i>
          </p>
        </div>
      );
    case "background":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          {/* <p>Name: {part.name}</p> */}
          {/* <p>Exercise Count: {part.exerciseCount}</p> */}
          <p>
            <i>Background Material: {part.backgroundMaterial}</i>
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          {/* <p>Name: {part.name}</p> */}
          {/* <p>Exercise Count: {part.exerciseCount}</p> */}
          <p>
            <i>Description: {part.description}</i>
          </p>
          <p>
            <i>Requirements: {part.requirements?.join(", ")}</i>
          </p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

// Helper function to ensure exhaustive switch case
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;
