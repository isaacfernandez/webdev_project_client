import React from 'react'
import Link from "react-router-dom/es/Link";

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar bg-light">
                <h1 className="navbar-brand navbar-nav mr-auto">News List</h1>
                <Link to="/search">
                    <h3 className="navbar-nav ml-auto">Search Feeds</h3>
                </Link>  
                <Link to="/home">
                    <h3 className="navbar-nav ml-auto">Your Feeds</h3>
                </Link>  
                <Link to="/profile">
                    <h3 className="navbar-nav ml-auto">Your Profile</h3>
                </Link>  
                <Link to="/signup">
                    <h3 className="navbar-nav ml-auto">Join us!</h3>
                </Link>  
                <Link to="/login">
                    <h3 className="navbar-nav ml-auto">Login</h3>
                </Link>  
                <Link to="/news">
                    <h3 className="navbar-nav ml-auto">News!</h3>
                </Link>
            </nav>);
    }
}