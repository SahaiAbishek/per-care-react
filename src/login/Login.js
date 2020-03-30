import React from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userLogin: {
                email: "",
                password: ""
            },
            user: {
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                zip: ""
            },
            emailConf: "",
            errors: {},
            successMessages: {},
            userId: -1
        };
    }

    handleEmailChange = event => {
        const userLogin = {...this.state.userLogin, email: event.target.value};
        this.setState({userLogin});
    }

    handleRegisterEmailChange = event => {
        const user = {...this.state.user, zip: event.target.value};
        this.setState({user});
    }

    handleRegisterZipChange = event => {
        const user = {...this.state.user, zip: event.target.value};
        this.setState({user});
    }

    handleEmailConfChange = event => {
        this.setState({emailConf: event.target.value});
    }

    handleLoginPasswordChange = event => {
        const userLogin = {...this.state.userLogin, password: event.target.value};
        this.setState({userLogin});
    }

    handlePasswordChange = event => {
        const user = {...this.state.user, password: event.target.value};
        this.setState({user});
    }

    handleFirstNameChange = event => {
        const user = {...this.state.user, firstName: event.target.value};
        this.setState({user});
    }

    handleLastNameChange = event => {
        const user = {...this.state.user, lastName: event.target.value};
        this.setState({user});
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
        let successMessages = {};
        if (this.validateForm()) {
            axios({
                method: 'post',
                url: 'http://localhost:12345/petApp/user',
                data: this.state.user,
            })
                .then((response) => {
                    console.log("SUCCESS : " + response);
                    successMessages["SuccessfulRegistration"] = "Registration Successful Please Login.";
                    this.setState({
                        successMessages
                    });
                })
                .catch(function (response) {
                    console.log(response);
                });
        }


    }

    handleLogin = event => {
        event.preventDefault();
        this.login();
    }

    login() {
        axios.get('http://localhost:12345/petApp/user/' + this.state.userLogin.email + "/" + this.state.userLogin.password)
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
                    state: {userId: this.state.userId}
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
                                    name="loginEmail"
                                    placeholder="Enter email"
                                    value={this.state.userLogin.email}
                                    onChange={this.handleEmailChange}
                                >
                                </input>
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control-sm"
                                    name="loginPassword"
                                    placeholder="Password"
                                    value={this.state.userLogin.password}
                                    onChange={this.handleLoginPasswordChange}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            this.login()
                                        }
                                    }}
                                >
                                </input>
                            </div>
                            <div>
                                <button type="button" className="btn btn-primary" onClick={this.handleLogin}>Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* ---------------Registration code starts here ---------------------------------*/}
                <div className="column">
                    <form>
                        <div className="form-group row" className="column">
                            <div className="form-group">
                                <legend>New Users Register Here</legend>
                            </div>
                            <div className="errorMsg">
                                <p className="text-danger">
                                    {this.state.errors.verify}
                                </p>
                            </div>
                            <div className="errorMsg">
                                <p className="text-danger">
                                    {this.state.errors.email}
                                </p>
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control-sm"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.user.email}
                                    onChange={this.handleRegisterEmailChange}
                                >
                                </input>*
                            </div>
                            <div className="errorMsg">
                                <p className="text-danger">{this.state.errors.emailConf}</p>
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control-sm"
                                    name="emailconf"
                                    placeholder="confirm email"
                                    value={this.state.emailConf}
                                    onChange={this.handleEmailConfChange}
                                >
                                </input>*
                            </div>
                            <div className="errorMsg">
                                <p className="text-danger">{this.state.errors.password}</p>
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
                                </input>*
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control-sm"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={this.state.user.firstName}
                                    onChange={this.handleFirstNameChange}
                                >
                                </input>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control-sm"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={this.state.user.lastName}
                                    onChange={this.handleLastNameChange}
                                >
                                </input>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control-sm"
                                    name="zip"
                                    placeholder="ZIP code"
                                    value={this.state.user.zip}
                                    onChange={this.handleRegisterZipChange}
                                >
                                </input>
                            </div>
                            <div>
                                <button type="button" className="btn btn-primary"
                                        onClick={this.handleRegister}>Register
                                </button>
                                <p className="text-info"> {this.state.successMessages.SuccessfulRegistration}</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;