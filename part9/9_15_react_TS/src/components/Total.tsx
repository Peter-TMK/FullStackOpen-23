import React from "react";

interface TotalProps {
  courseParts: { exerciseCount: number }[];
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );
  return <b>Number of exercises {totalExercises}</b>;
};

export default Total;
