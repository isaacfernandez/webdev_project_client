import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";

export default class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm:''
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
                <input
                    autoFocus
                    type="email"
                    value={this.state.searchTerm}
                    onChange={this.handleChange}>

            </input>
    </div>)

    }
}