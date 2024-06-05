import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:7070/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!content) return;
    try {
      await axios.post('http://localhost:7070/notes', { id: 0, content });
      setContent('');
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:7070/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const updateNotes = async () => {
    fetchNotes();
  };

  return (
      <div className="App">
        <h1>Notes</h1>
        <div>
          <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={addNote}>Add</button>
        </div>
        <div>
          <button onClick={updateNotes}>Refresh</button>
        </div>
        <div>
          {notes.map((note) => (
              <div key={note.id}>
                <p>{note.content}</p>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
          ))}
        </div>
      </div>
  );
};

export default App;

