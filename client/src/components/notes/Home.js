import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import axios from 'axios';

export default function Home({ match }) {
  const [notes, setNotes] = useState([]);

  const [token, setToken] = useState('');

  const [users, setUsername] = useState('');

  // const getUsername = async token => {
  //   const res = await axios.get('http://localhost:8080/api/users/getUsername', {
  //     headers: { Authorization: token },
  //   });
  //   setUsername(res.data);
  // };

  // useEffect(() => {
  //   const token = localStorage.getItem('tokenStore');
  //   setToken(token);
  //   if (token) {
  //     getUsername(token);
  //   }
  // }, []);

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
      <h1 className="greeting">Hello, {users.username}!</h1>
      <div className="notes-container">
        {notes.map(note => (
          <div className="note-wrapper" key={note._id}>
            <div className="note-content">
              {/* <h3 title="{note.title}">{note.title.substring(0, 25)}</h3> */}
              <h3>{note.title}</h3>
              <p>{note.content}...</p>
              <p>
                <span>
                  <img src="assets/folder.png" alt="folder" />
                </span>
                <span>{note.folder}</span>
              </p>
              <p className="date" id="date">
                {timeago.format(note.date)}
              </p>
            </div>
            <div className="note-tool">
              <img
                src="assets/bin.png"
                alt="delete"
                className="delete-btn"
                onClick={() => deleteNote(note._id)}
              />
              <Link to={`edit/${note._id}`} className="delete-btn">
                {' '}
                <img src="assets/export.png" alt="edit" />
              </Link>
            </div>
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
