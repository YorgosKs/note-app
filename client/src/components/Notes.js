import React from 'react';
import Nav from './notes/Nav';
import Home from './notes/Home';
import CreateNote from './notes/CreateNote';
import EditNote from './notes/EditNote';
import { Route } from 'react-router-dom';

export default function Notes({ setIsLogin }) {
  return (
    <div className="notes-page">
      <Nav setIsLogin={setIsLogin} />
      {/* <Routes> */}

      <Route path="/" component={Home} exact />
      <Route path="/create" component={CreateNote} exact />
      {/* <Route path="/edit/:id" component={EditNote} exact /> */}

      {/* </Routes> */}
    </div>
  );
}
