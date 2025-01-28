import React from "react";
import Note from "./Note";

const NoteList = ({ notes, hideNotes, getNotes }) => {
  return (
    <>
      <section className="mt-8">
        {hideNotes ? (
          <h1>Notes are hidden</h1>
        ) : (
          <>
            {console.log(notes)}
            {notes.map((note, index) => (
              <Note key={index} note={note} getNotes={getNotes} />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default NoteList;
