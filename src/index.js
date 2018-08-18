import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import NewsList from "./containers/NewsList";
import NavBar from "./containers/NavBar";

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import ProfilePage from "./components/ProfilePage";
import ForeignProfilePage from "./components/ForeignProfilePage";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar/>
                    <Route path='/search'
                           component={SearchPage} />
                    <Route path='/user/:uid'
                           component={ForeignProfilePage} />
                    <Route path='/profile'
                           component={ProfilePage} />
                    <Route path='/home'
                           component={HomePage} />
                    <Route path='/signup'
                           component={RegisterPage}/>
                    <Route path='/login'
                           component={LoginPage}/>
                    <Route path='/news'
                           component={NewsList}/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);