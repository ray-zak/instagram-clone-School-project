import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';


import './Login.css';


async function loginUser(credentials) {
    return fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => [data.status, data.json()])
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const [status, token_promise] = await loginUser({
            username,
            password
        });

        token_promise.then(data => {
            //check if token was authorized
            if(status === 200 && data.token) {
                setToken(data.token);
            }
            else
            {
                //TODO: show error on page
                console.log("Invalid username/password");
            }
        })

    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}