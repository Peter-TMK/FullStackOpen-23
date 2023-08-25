// import Note from "./components/Note";

const Course = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, parts) => sum + parts.exercises, 0);
  return <h3>total of {totalExercises} exercises</h3>;
};

const Header = ({ id, name }) => {
  return <h1>{name}</h1>;
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    <>
      <Header name={course.name} />
      <Course parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App;
