import React, { Component } from 'react';
import VenueList from './VenueList';

export default class SideBar extends Component {
    constructor() {
        super();
        this.state = {
            query: ""
        };
    }

handleFilterVenues = () => {};

handleChange = e => {
    this.setState({query: e.target.value});
    const markers = this.props.venues.map(venue => {
        console.log(" THIS IS THE " + this.props.venues);
        const isMatched = marker.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
        const marker = this.props.markers.find(marker => marker.id === venue.id);
        if(isMatched) {
            marker.isVisible = true;
        }else{
            marker.isVisible = false;
        }
        
        return marker;
    });
    this.props.updateSuperState({ markers });
};
   
   
   render(){
    return (<div className="sideBar">
        <input type={'search'} id={'search'} 
        placeholder={'Filter Venues'} />
        <VenueList {...this.props} 
        handleListItemClick={this.props.handleListItemClick} />
    </div>
    );
   }
}