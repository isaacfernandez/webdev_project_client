import React from 'react'
import NewsService from "../services/NewsService";
import NewsItem from "../components/NewsItem"
import {Route} from "react-router-dom";

export default class NewsList extends React.Component {
    constructor() {
        super();

        this.newsService = NewsService.instance;
        this.state = {
            newsItemsLimit: 10,
            news: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.newsService.findNews()
            .then(news => {
                this.setState({news: news.articles.slice(0, this.state.newsItemsLimit)});
            });
    }

    render() {
        return (
            <div>
                <h3>News List</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            Title
                        </th>
                        <th>
                            Description
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.news.map((news, index) =>
                        <NewsItem key={index}
                                  news={news}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}