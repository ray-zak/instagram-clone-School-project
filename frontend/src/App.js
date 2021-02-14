
import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import HomepageComponent from "./components/homepage.component";
import Login from "./components/Login/login.component";
//import CreateUser from "./components/create-user.component";



function App() {
    const [token, setToken] = useState();

    //look for a JWT token to show user is already logged in
    if(!token)
    {
        return(
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
          <br/>
          <Route path="/" exact component={HomepageComponent} />
        </div>
      </Router>
  );
}

export default App;