import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import UserService from "../services/UserService";
import FFollowItem from "../Blocks/FFollowItem";

export default class ForeignProfilePage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            uid: this.props.match.params.uid,
            username: '',
            userFollows: [],
            feedFollows: [],
        };
        this.userService = UserService.instance;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    setUser(user) {
        this.setState({
            username: user.username,
            userFollows: user.userFollows,
            feedFollows: user.feedFollows
        })
    }

    componentDidMount() {
        this.loadUserInfo();
    }

    loadUserInfo() {
        //this.userService.getUserInfo( )
        return fetch("https://guarded-forest-81137.herokuapp.com/api/user/id/" + this.state.uid,
            {
                method: 'get',
                headers: {'content-type' :'application/json'}
            }).then(function (response) {
            return response.json();
        }).then(user =>
            this.setUser(user))
    }

    renderUserFollows(userFollows) {
        return null;
    }

    renderFeedFollows(userFollows) {
        let blocks = this.state.feedFollows.map(function (feed) {
            return <FFollowItem item={feed}/>
        });
        return blocks
    }

    render() {
        return (
            <div>
                <h3> Welcome to {this.state.username} profile!</h3>
                {this.state.userFollows.length > 0 &&
                <h2>
                    This user follows shit, enumerate
                </h2>
                }
                {this.state.userFollows.length === 0 &&
                    this.renderUserFollows(this.state.userFollows)
                }
                {this.state.feedFollows.length > 0 &&
                <h2>
                    This user follows shit, enumerate
                </h2>
                }
                {this.state.feedFollows.length === 0 &&
                    this.renderFeedFollows(this.state.feedFollows)
                }
            </div>
        );
    }


}