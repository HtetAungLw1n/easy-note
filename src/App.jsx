import { useEffect, useState } from "react";
import Addnote from "./components/Addnote";
import NoteList from "./components/NoteList";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [hideNotes, setHideNotes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://easynote-72227-default-rtdb.asia-southeast1.firebasedatabase.app/notes.json"
      );

      if (!response.ok) {
        throw new Error("Can't connect to the firebase.");
      }

      const data = await response.json();

      const modifiedData = [];

      for (const key in data) {
        const element = {
          id: key,
          note: data[key],
        };
        modifiedData.push(element);
      }
      setNotes([...modifiedData]);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setLoading(false);
  };

  const hideNotesHandler = () => {
    setHideNotes(!hideNotes);
  };

  return (
    <section className="container mx-auto min-h-screen">
      <nav>
        <h1 className="text-2xl font-bold">EASY NOTE</h1>
        <button className="active:text-neutral-400" onClick={hideNotesHandler}>
          Hide Notes
        </button>
      </nav>

      {loading && !error && (
        <h1 className="w-full text-3xl mt-8">Getting notes ...</h1>
      )}
      {!loading && error && (
        <h1 className="text-red-500 w-full text-3xl mt-8">{error}</h1>
      )}

      {!loading && !error && (
        <>
          <Addnote getNotes={getNotes} />
          {notes.length < 1 ? (
            <>
              <h1 className="w-full text-3xl mt-8">
                There is no note to show.
              </h1>
            </>
          ) : (
            <>
              <NoteList
                notes={notes}
                hideNotes={hideNotes}
                getNotes={getNotes}
              />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default App;
