import React, { Component } from 'react';
import VenueList from './VenueList';

export default class SideBar extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            venues: []
        };
    }

handleFilterVenues = () => {
    if (this.state.query.trim() === "") {
        const venues = this.props.venues.filter(venue => 
            venue.name.toLowerCase().includes(this.state.query.toLowerCase())
        );
        return venues;
        }
        return this.props.venues;
};

handleChange = e => {
    this.setState({query: e.target.value});
    
    const markers = this.props.venues.map(venue => {
        const isMatched = venue.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        const marker = this.props.markers.find(marker => marker.id === venue.id);
        if (isMatched) {
            marker.isVisible = true;
        }else{
            marker.isVisible = false;
        }
        
        return marker;
    });
    this.props.updateSuperState({ markers });
};
   
   
   render() {
    return (<div className="sideBar">
        <input type={'search'} id={'search'} 
        placeholder={'Filter Venues'} 
        onChange= {this.handleChange} 
        className="filter-options" aria-label="filter options" 
        role="search" tabIndex="0"
        />
        <h1>Art Scene PDX</h1>
        <VenueList 
        {...this.props} 
        venues={this.handleFilterVenues()}
        handleListItemClick={this.props.handleListItemClick} 
        />
    </div>
    );
   }
}