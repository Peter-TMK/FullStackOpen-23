import React from "react";
import Part from "./Part";

// Define the CoursePart type
interface CoursePart {
  name: string;
  exerciseCount: number;
  description?: string;
  groupProjectCount?: number;
  backgroundMaterial?: string;
  requirements?: string[];
  kind: "basic" | "group" | "background" | "special";
}

// Type declaration for Content component props
interface ContentProps {
  courseParts: CoursePart[];
}

// Content component renders the name of the course
const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

export default Content;
