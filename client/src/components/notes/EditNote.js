import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

export default function EditNote({ match }) {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
    id: '',
  });
  const history = useHistory();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem('tokenStore');
      if (match.params.id) {
        const res = await axios.get(
          `http://localhost:8080/api/notes/${match.params.id}`,
          {
            headers: { Authorization: token },
          }
        );
        setNote(
          {
            title: res.data.title,
            content: res.data.content,
            date: new Date(res.data.date).toLocaleDateString(),
            id: res.data._id,
          },
          []
        );
      }
    };
    getNote();
  }, [match.params.id]);

  const onChangeInput = e => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const { title, content, date, id } = note;
        const newNote = {
          title,
          content,
          date,
        };

        await axios.put(`http://localhost:8080/api/notes/${id}`, newNote, {
          headers: { Authorization: token },
        });

        return history.push('/');
      }
    } catch (err) {
      window.location.href = '/';
    }
  };

  return <div className="edit-note"></div>;
}
