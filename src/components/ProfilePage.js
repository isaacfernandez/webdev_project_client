import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                SHOW ALL THE PERSON'S INFO!
            </div>
        );
    }
}