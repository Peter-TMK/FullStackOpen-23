const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? "make not important" : "make inportant";

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={() => deleteNote(note.id, note.content)}>Delete</button>
    </li>
  );
};

export default Note;
