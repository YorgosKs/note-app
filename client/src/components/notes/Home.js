import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState('');

  const getNotes = async token => {
    const res = await axios.get('http://localhost:8080/api/notes/', {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem('tokenStore');
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async id => {
    try {
      if (token) {
        await axios.delete(`http://localhost:8080/api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = '/';
    }
  };

  return (
    // <div className="note-wrapper">
    //   {notes.map(note => (
    //     <div className="card" key={note._id}>
    //       <h4 title={note.title}>{note.title}</h4>
    //       <div className="text-wrapper">
    //         <p>{note.content}</p>
    //       </div>
    //       <p className="date">{format(note.date)}</p>
    //       <div className="card-footer">
    //         {note.name}
    //         <Link to={`edit/${note._id}`}>Edit</Link>
    //       </div>
    //       <button className="close" onClick={() => deleteNote(note._id)}>
    //         X
    //       </button>
    //     </div>
    //   ))}
    // </div>

    <div className="container">
      <h1 className="greeting">Hello, user!</h1>
      <div className="notes-container">
        {notes.map(note => (
          <div className="note-wrapper" key={note._id}>
            {/* <h3 title="{note.title}">{note.title.substring(0, 25)}</h3> */}
            <h3 title="{note.title}">{note.title}</h3>
            <p>{note.content}...</p>
            <p className="date">{format(note.date)}</p>
          </div>
        ))}

        {/* <div className="note-wrapper">
          <p>ewfewfw</p>
        </div>
        <div className="note-wrapper">
          <p>ewfewfw</p>
        </div>

        <div className="note-wrapper">
          <p>ewfewfw</p>
        </div>
        <div className="note-wrapper">
          <p>ewfewfw</p>
        </div>
        <div className="note-wrapper">
          <p>ewfewfw</p>
        </div>
        <div className="note-wrapper">
          <p>ewfewfw</p>
        </div>
        <div className="note-wrapper">
          <p>ewfewfw</p>
        </div>

        <div className="note-wrapper">
          <p>ewfewfw</p>
        </div>

        <div className="note-wrapper">
          <p>ewfewfw</p>
        </div>
        <div className="note-wrapper">
          <p>ewfewfw</p>
        </div>

        <div className="note-wrapper">
          <p>ewfewfw</p>
        </div>

        <div className="note-wrapper">
          <p>ewfewfw</p>
        </div> */}
      </div>
    </div>
  );
}
