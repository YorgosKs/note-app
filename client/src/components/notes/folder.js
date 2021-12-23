import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function CreateNote() {
  const [folder, setFolder] = useState({
    title: '',
  });
  const history = useHistory();

  const onChangeInput = e => {
    const { name, value } = e.target;
    setFolder({ ...folder, [name]: value });
  };

  const createFolder = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const { title } = folder;
        const newFolder = {
          title,
        };

        await axios.post('http://localhost:8080/api/folders/', newFolder, {
          headers: { Authorization: token },
        });

        return history.push('/nav');
      }
    } catch (err) {
      window.location.href = '/';
    }
  };

  return (
    <div className="create-note">
      <h2>Create folder</h2>
      <form onSubmit={createFolder} autoComplete="off">
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={folder.title}
            id="title"
            name="title"
            required
            onChange={onChangeInput}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
