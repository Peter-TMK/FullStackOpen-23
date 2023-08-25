const Course = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} - Exercises: {part.exercises}
        </p>
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <h3>Total exercises: {totalExercises}</h3>;
};

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Course Information</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Course course={course} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default App;
