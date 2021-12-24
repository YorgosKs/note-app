import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  const [folders, getFolder] = useState([]);
  const [token, setToken] = useState('');

  // const folder_input = document.querySelector('#folder-input');

  const getFolders = async token => {
    const res = await axios.get('http://localhost:8080/api/folders/', {
      headers: { Authorization: token },
    });
    getFolder(res.data);
  };

  const [folder, setFolder] = useState({
    title: '',
  });
  const history = useHistory();

  const onChangeInput = e => {
    const { name, value } = e.target;
    setFolder({ ...folder, [name]: value });
  };

  const hidden = () => {
    var element = document.getElementById('folder-input');

    element.classList.remove('hidden');
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

        return history.push('/');
      }
    } catch (err) {
      window.location.href = '/';
    }
  };

  // folder_input.addEventListener('focusout', createFolder());
  useEffect(() => {
    const token = localStorage.getItem('tokenStore');
    setToken(token);
    if (token) {
      getFolders(token);
    }
  }, []);

  return (
    // <header>
    //   <div className="logo">
    //     <h1>
    //       <Link to="/">Dev Notes</Link>
    //     </h1>
    //   </div>
    //   <ul>
    //     <li>
    //       <Link to="/">Home</Link>
    //     </li>
    //     <li>
    //       <Link to="/create">Create Note</Link>
    //     </li>
    //     <li onClick={logoutSubmit}>
    //       <Link to="/">Logout</Link>
    //     </li>
    //   </ul>
    // </header>
    <div className="nav">
      <form>
        <div className="search">
          <input
            type="text"
            name="search"
            className="search-field"
            placeholder="Search"
          />
        </div>
      </form>
      <div className="folders">
        <div className="folder hidden" id="folder-input">
          <input
            type="text"
            value={folder.title}
            id="title"
            name="title"
            required
            onChange={onChangeInput}
            placeholder="New folder"
            className="folder-input"
            onBlur={createFolder}
          />
        </div>
        {folders.map(folders => (
          <div className="folder" key={folders._id}>
            <p>{folders.title}</p>
          </div>
        ))}

        <div className="toolbar">
          <img src="assets/user_btn.png" alt="icon" onClick={logoutSubmit} />

          {/* <img src="assets/add.png" alt="icon" onClick={hidden} /> */}
          <img src="assets/add.png" alt="icon" onClick={hidden} />
        </div>
      </div>
    </div>
  );
}
