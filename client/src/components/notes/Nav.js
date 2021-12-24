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
<<<<<<< Updated upstream
  // const folder_input = document.querySelector('#folder-input');
=======
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  const hidden = () => {
    var element = document.getElementById('folder-input');

    element.classList.remove('hidden');
  };

=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
        return history.push('/');
=======
        return history.push('/nav');
>>>>>>> Stashed changes
      }
    } catch (err) {
      window.location.href = '/';
    }
  };

<<<<<<< Updated upstream
  // folder_input.addEventListener('focusout', createFolder());

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    <div className="nav">
=======
    <nav className="nav">
>>>>>>> Stashed changes
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
        {/* <div className="folder">
          <p>Work</p>
        </div>
        <div className="folder">
          <p>TODO</p>
        </div>
        <div className="folder">
          <p>Home</p>
        </div> */}
<<<<<<< Updated upstream
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
=======

        {folders.map(folders => (
          <div className="folder" key={folders._id}>
            <p>{folders.title}</p>
          </div>
        ))}
        <div className="folder">
          <input type="text" name="folder" placeholder="New folder" />
>>>>>>> Stashed changes
        </div>
        {folders.map(folders => (
          <div className="folder" key={folders._id}>
            <p>{folders.title}</p>
          </div>
        ))}
      </div>

      <div className="toolbar">
        <img src="assets/user_btn.png" alt="icon" onClick={logoutSubmit} />
<<<<<<< Updated upstream
        <img src="assets/add.png" alt="icon" onClick={hidden} />
=======
        <img src="assets/add.png" alt="icon" onClick={createFolder} />
>>>>>>> Stashed changes
      </div>
    </div>
  );
}
