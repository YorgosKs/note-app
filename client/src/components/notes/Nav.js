import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

export default function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

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
    <nav className="nav">
      <div className="search">
        {/* <form> */}
        <input
          type="text"
          name="search"
          className="search-field"
          placeholder="Search"
        />
        {/* </form> */}
      </div>
      <div className="folders">
        <div className="folder">
          <p>Work</p>
        </div>
        <div className="folder">
          <p>TODO</p>
        </div>
        <div className="folder">
          <p>Home</p>
        </div>
      </div>
      <div className="toolbar">
        <img src="assets/user_btn.png" alt="icon" onClick={logoutSubmit} />
      </div>
    </nav>
  );
}
