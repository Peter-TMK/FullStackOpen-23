const Course = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

// const Content = ({ parts }) => {
//   return (
//     <div>
//       {parts.map((part) => (
//         <li key={part.id}>{part.name}</li>
//       ))}
//     </div>
//   );
// };

const Content = ({ parts }) => {
  return (
    <div>
      <p>{parts[0].name}</p>
      <p>{parts[1].name}</p>
      <p>{parts[2].name}</p>
    </div>
  );
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
    <div>
      <Course name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default App;
