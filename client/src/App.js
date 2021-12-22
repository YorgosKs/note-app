import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Notes from "./components/Notes";

import "./index.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const verified = await axios.get(
          "http://localhost:8080/api/users/verify",
          {
            headers: { Authorization: token },
          }
        );
        console.log(verified);
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <div className="App">
      {isLogin ? (
        <Notes setIsLogin={setIsLogin} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;
