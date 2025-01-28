import React from "react";
import Delete from "./Delete";

const Note = ({ note, getNotes }) => {
  //note destructing
  const { note: text, id } = note;

  //delete note
  const deleteNote = async () => {
    try {
      const response = await fetch(
        `https://easynote-72227-default-rtdb.asia-southeast1.firebasedatabase.app/notes/${id}.json`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Deleting note go wrong");
      }
      getNotes();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className="text-xl border-4 border-blue-200 p-4 my-6 flex justify-between">
        {text}
        <div onClick={deleteNote}>
          <Delete />
        </div>
      </div>
    </>
  );
};

export default Note;
