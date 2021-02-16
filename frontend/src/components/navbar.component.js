import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <h1 className="navbar-brand" style={{"fontSize": "500%"}}>FemtoGram</h1>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">HomePage</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}