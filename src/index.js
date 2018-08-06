import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import NewsList from "./containers/NewsList";
import NavBar from "./containers/NavBar";

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar/>
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