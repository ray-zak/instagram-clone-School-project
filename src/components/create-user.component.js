import React, { Component } from 'react';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    //todo: enforce password policy
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(newUser);

         /* this.setState({
            username: '',
            password: ''
        }) */
    }

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                        />
                        <label>Password: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}