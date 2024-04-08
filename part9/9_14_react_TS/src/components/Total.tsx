interface TotalProps {
  courseParts: { exerciseCount: number }[];
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );
  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
