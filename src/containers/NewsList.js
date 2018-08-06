import React from 'react'
import NewsService from "../services/NewsService";
import NewsItem from "../components/NewsItem"
import {Route} from "react-router-dom";

export default class NewsList extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                Hello, world!
            </div>
        )
    }
}