import React, { useState } from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import PropTypes from 'prop-types';


import './Login.css';


async function loginUser(credentials) {
    //TODO: replace fetch with axios?
    return fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => [data.status, data.json()]);
}


async function registerUser(userInfo){
    //TODO: replace fetch with axios?
    return fetch('http://localhost:5000/users/register',
        {method: 'POST', headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
        })
        .then(data => [data.status, data.json()]);
}

export default function Login({ setToken }) {

    if(setToken==null || window.location.href==="http://localhost:3000/logout"){

        sessionStorage.clear();

        window.location.replace("/") ;

    }

    const [email, setEmail] = useState();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    //keeps track of which form tab (login or signup) is selected
    const [selectedFormTab, setSelectedFormTab] = useState();


    //Update variable that tracks whether Tabs object tab is login or signup
    const handleTabSelect = async activeTab => {
        console.log("Tab selected", activeTab);
        setSelectedFormTab(activeTab);
    };

    const checkSignupPassword = async e =>
    {
        console.log("Password fields: ", password, confirmPassword);

        if(password !== confirmPassword)
        {
            console.log("Passwords don't match!");
            document.getElementById("submit-button").setAttribute("disabled", true);
        }
        else
        {
            document.getElementById("submit-button").removeAttribute("disabled");
        }
    }

    //call login or signup depending on which tab is active
    const handleSubmit = async e => {
        e.preventDefault();

        console.log("Current form tab: ", selectedFormTab);

        //signup if we are on the signup tab
        //TODO: show error on page for invalid signup
        if(selectedFormTab === "signup" )
        {
            console.log("Attempting signup", username, password, email);

            let [status, user_info_promise] = await registerUser({username, password, email});
            console.log("registration returned: ", status, user_info_promise);

            //Don't proceed if there was an error with signing up
            if(status !== 200)
            {
                console.log("Error while registering!");
                return;
            }
            //otherwise, continue on to login with our new account and get a token
        }

        console.log("Attempting login", username, password);

        //If we signed up, then we also want to log in, so login code should always run
        const [status, token_promise] = await loginUser({
            username,
            password
        });

        token_promise.then(data => {
            //check if token was authorized
            if(status === 200 && data.token) {
                setToken(data.token);
                window.location.reload();
            }
            else
            {
                //TODO: show error on page for invalid login
                console.log("Invalid username/password");
            }
        });

    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <Tabs onSelect={handleTabSelect}>
                    <Tab eventKey="login" title="Login">
                        <label>
                            <p>Username</p>
                            <input type="text" onChange={e => setUserName(e.target.value)} />
                        </label>
                        <br></br>
                        <label>
                            <p>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)} />
                        </label>
                    </Tab>
                    <Tab eventKey="signup" title="Sign Up">
                        <label>
                            <p>Email</p>
                            <input type="text" onChange={e => setEmail(e.target.value)} />
                        </label>
                        <br></br>
                        <label>
                            <p>Username</p>
                            <input type="text" onChange={e => setUserName(e.target.value)} />
                        </label>
                        <br></br>
                        <label>
                            <p>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)} onBlur={e => checkSignupPassword()} />
                        </label>
                        <br></br>
                        <label>
                            <p>Confirm Password</p>
                            <input type="password" onChange={e => setConfirmPassword(e.target.value)} onBlur={e => checkSignupPassword()} />
                        </label>
                    </Tab>
                </Tabs>
                <div>
                    <button id="submit-button" type="submit" className="btn btn-primary" style={{"width": "100%"}}>Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}