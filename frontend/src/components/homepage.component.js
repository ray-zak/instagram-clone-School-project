import React, { Component } from 'react';

//TODO: add some way of signing out (clear session storage, send request to backend to invalidate jwt, and go back to /)
//      Would probably need to add optional element to navbar that appears only when signed in
export default class HomepageComponent extends Component {
    render() {
        return (
            <div>
                <p>You are on the HomePage component!</p>
            </div>
        )
    }
}