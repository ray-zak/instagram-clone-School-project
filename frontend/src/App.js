
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import HomepageComponent from "./components/homepage.component";
import Profile from "./components/Profile/Profile.component";
import Login from "./components/Login/login.component";
import useToken from './useToken';
import Gallery from './components/Gallery.component';


function App () {
  //const [token, setToken] = useState();
  const { token, setToken } = useToken();

  console.log("token in appjs", token);

  //look for a JWT token to check if user is already logged in
  if (!token) {
    return (
      <Router>
        <Navbar />
        <div className="container">
          <Login setToken={setToken} />
        </div>
      </Router>

    );
  }

  return (
    <Router>
      <Navbar />
      <div className="container">
        <br />
        <Route path="/" exact component={HomepageComponent} />
        <Route path="/profile" exact  >
          <Profile token={token} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
