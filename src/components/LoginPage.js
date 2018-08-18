import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "../css/Login.css";
import UserService from "../services/UserService";

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            failureMessage: ""
        };

        this.userService = UserService.instance;
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.userService.login({username: this.state.email, password: this.state.password})
            .then(resp => {
                if (resp.username === this.state.email) {
                    alert("Thank you! Redirecting you to your profile page...");
                    this.props.history.push('/profile');
                } else {
                    this.setState({failureMessage: "Failed to login."});
                }
            });
    }

    render() {
        return (
            <div className="row">
                <div className="Login col-6 -align-center">
                    <h6>
                        {this.state.failureMessage ? this.state.failureMessage: ""}
                    </h6>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                // autoFocus
                                // type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <Button
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Login
                        </Button>
                        <Button
                            block
                            bsSize="large"
                            type="submit"
                        >
                            Register
                        </Button>

                    </form>
                </div>
            </div>
        );
    }
}