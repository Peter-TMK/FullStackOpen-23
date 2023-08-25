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

export default Course;
