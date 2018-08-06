import React from 'react'

export default class NewsItem extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.news.title}
                </td>
                <td>
                    {this.props.news.description}
                </td>
            </tr>
        )
    }
}