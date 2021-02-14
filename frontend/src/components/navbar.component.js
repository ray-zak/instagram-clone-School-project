import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <h1 className="navbar-brand" style={{"fontSize": "500%"}}>FemtoGram</h1>
            </nav>
        );
    }
}