import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import UserService from "../services/UserService";

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            cPassword:""
        };

        this.userService = UserService.instance;
    }

    validateForm() {
        return this.state.email.length > 0
            && this.state.password.length > 0
            && this.state.cPassword == this.state.password;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        let then = this.userService.registerUser({username: this.state.email, password: this.state.password})
            .then(resp => {
                console.log(resp);
            if (resp.username == 200) {
                alert("Thank you! Redirecting you to your profile page...");
                } else {
                this.setState( { message: this.state.failureMessage });
            }});
    }

    render() {
        return (
            <div className="row">
                <div className="Login col-6 -align-center">
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                autoFocus
                                type="email"
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
                        <FormGroup controlId="cPassword" bsSize="large">
                            <ControlLabel>Confirm Password</ControlLabel>
                            <FormControl
                                value={this.state.cPassword}
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
                            Register!
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}