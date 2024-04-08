// import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Header from "./components/Header";
import Part from "./components/Part";
import Content from "./components/Content";
import Total from "./components/Total";

const App = () => {
  const courseName = "Half Stack application development";
  // const courseParts = [
  //   {
  //     name: "Fundamentals",
  //     exerciseCount: 10,
  //   },
  //   {
  //     name: "Using props to pass data",
  //     exerciseCount: 7,
  //   },
  //   {
  //     name: "Deeper type usage",
  //     exerciseCount: 14,
  //   },
  // ];

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartBasic extends CoursePartBase {
    description: string;
    kind: "basic";
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }

  interface CoursePartBackground extends CoursePartBase {
    description: string;
    backgroundMaterial: string;
    kind: "background";
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];

  // const totalExercise = courseParts.reduce(
  //   (sum, part) => sum + part.exerciseCount,
  //   0
  // );
  return (
    <div>
      {/* <h1>{Header}</h1> */}
      <Header courseName={courseName} />
      {/* <Content courseParts={courseParts} /> */}
      <Content courseParts={courseParts}>
        {/* Render each part using the Part component */}
        {courseParts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
      </Content>
      <Total courseParts={courseParts} />
      {/* <Part courseParts={courseParts} /> */}
      {/* <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p> */}
    </div>
  );
};

export default App;
