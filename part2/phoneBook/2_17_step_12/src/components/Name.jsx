const Name = ({ person, deleteNote }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => deleteNote(person.id, person.name)}>Delete</button>
    </p>
  );
};

export default Name;
