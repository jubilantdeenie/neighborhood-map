import React, { Component } from "react";
//import './App.js'

export default class ListItem extends Component {
    render() {
        return (
            <li className="listItem"
            onClick={() => this.props.handleListItemClick(this.props)} 
            >
            {this.props.name} 
            </li>
        );
    }
}