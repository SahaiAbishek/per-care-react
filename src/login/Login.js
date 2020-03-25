import React from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                password: ""
            },
            emailConf: "",
            errors: {},
            userId: -1
        };
    }

    handleEmailChange = event => {
        const user = { ...this.state.user, email: event.target.value };
        this.setState({ user });
    }

    handleEmailConfChange = event => {
        this.setState({ emailConf: event.target.value });
    }

    handlePasswordChange = event => {
        const user = { ...this.state.user, password: event.target.value };
        this.setState({ user });
    }

    validateForm() {
        let errors = {};
        let formIsValid = true;

        if (this.state.user.email.length <= 0) {
            formIsValid = false;
            errors["email"] = "*Please enter your email.";
        }
        if (this.state.emailConf.length <= 0) {
            formIsValid = false;
            errors["emailConf"] = "*Please confirm your email.";
        }
        if (this.state.user.password.length <= 0) {
            formIsValid = false;
            errors["password"] = "*Please enter your Password.";
        }
        if (this.state.user.email !== this.state.emailConf) {
            formIsValid = false;
            errors["verify"] = "*Please make sure to enter correct email in both the fields.";
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    handleRegister = event => {
        event.preventDefault();
        if (this.validateForm()) {
            alert("Inside register");
            axios({
                method: 'post',
                url: 'http://localhost:12345/petApp/user',
                data: this.state.user,
            })
                .then((response) => {
                    console.log("SUCCESS : " + response);
                })
                .catch(function (response) {
                    console.log(response);
                });
        }

    }

    handleLogin = event => {
        event.preventDefault();
        axios.get('http://localhost:12345/petApp/user/' + this.state.user.email + "/" + this.state.user.password)
            .then(response => {
                this.setState({
                    userId: response.data
                });
            }).catch(function (error) {
                console.log("Resource not found");
            });
    }

    render() {
        if (this.state.userId !== -1) {
            return <Redirect
                to={{
                    pathname: '/UserActivities',
                    state: { userId: this.state.userId }
                }}
            />
        }
        return (
            <div>
                <div className="column">
                    <form>
                        <div className="form-group row" className="column">
                            <div className="form-group">
                                <legend>Login</legend>
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control-sm"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.user.email}
                                    onChange={this.handleEmailChange}
                                >
                                </input>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control-sm"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.user.password}
                                    onChange={this.handlePasswordChange}
                                >
                                </input>
                            </div>
                            <div>
                                <button type="button" className="btn btn-primary" onClick={this.handleLogin}>Sign In</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="column">
                    <form>
                        <div className="form-group row" className="column">
                            <div className="form-group">
                                <legend>New Users Register Here</legend>
                            </div>
                            <div className="errorMsg">{this.state.errors.verify}</div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control-sm"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.user.email}
                                    onChange={this.handleEmailChange}
                                >
                                </input>
                            </div>
                            <div className="errorMsg">{this.state.errors.email}</div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control-sm"
                                    name="emailconf"
                                    placeholder="confirm email"
                                    value={this.state.emailConf}
                                    onChange={this.handleEmailConfChange}
                                >
                                </input>
                            </div>
                            <div className="errorMsg">{this.state.errors.emailConf}</div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control-sm"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.user.password}
                                    onChange={this.handlePasswordChange}
                                >
                                </input>
                            </div>
                            <div className="errorMsg">{this.state.errors.password}</div>
                            <div>
                                <button type="button" className="btn btn-primary" onClick={this.handleRegister}>Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;