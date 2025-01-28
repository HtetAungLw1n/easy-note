import React, { useState } from "react";

const Addnote = ({ getNotes }) => {
  const [note, setNote] = useState("");

  const addnote = async (e) => {
    e.preventDefault();

    if (note === "") {
      alert("You can't add empty");
    } else {
      try {
        await fetch(
          "https://easynote-72227-default-rtdb.asia-southeast1.firebasedatabase.app/notes.json",
          {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setNote("");
        getNotes();
      } catch (error) {
        alert("Something went wrong.");
      }
    }
  };
  return (
    <section className="mt-4">
      <form className="flex justify-between" onSubmit={addnote}>
        <input
          type="text"
          placeholder="add note"
          className="border-4 border-neutral-100 p-4 text-lg outline-0 w-4/5"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          type="submit"
          className="text-lg px-4 py-1 cursor-pointer hover:text-neutral-200 w-1/5"
        >
          ADD
        </button>
      </form>
    </section>
  );
};

export default Addnote;
