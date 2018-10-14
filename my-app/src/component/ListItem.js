import React, { Component } from "react";
//import './App.js'

export default class ListItem extends Component {
    render() {
        return (
            <li className="listItem"
            name={this.props.name} aria-label="select gallery" role="button" tabIndex="0"
            onClick={() => this.props.handleListItemClick(this.props)} 
            >
            {this.props.name} 
            </li>
        );
    }
}