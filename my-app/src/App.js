import React, { Component } from 'react';
import './App.css';
import Map from './component/Map';
import SquareAPI from './API/';
import SideBar from './component/SideBar';

class App extends Component {
  constructor () {
    super();
    this.state = {
      venues: [],
      markers: [],
      zoom: 15,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }
  { /* Close all additional markers */ }
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers)} );
  };
  {/* When a marker is clicked retrieve venue info  */}
  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id && marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({venues: Object.assign(this.state.venues, newVenue)});
      console.log(newVenue)
    });
}; 
{/* Click on list item to display modal data */}
handleListItemClick = venue => {
  const marker = this.state.markers.find(marker => marker.id === venue.id);
  this.handleMarkerClick(marker);
  console.log(venue);
}
{/* Venue search parameters */}
  componentDidMount() {
    SquareAPI.search ({
      near: "Portland,OR",
      query: "contemporary gallery",
      limit: 9
    }).then(results => {
      console.log(results);
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({ venues, center, markers});
    });
  }

{/* Display sidebar and map components */}
  render() {
    return (
      <div className="App">
        <SideBar {...this.state} handleListItemClick={this.handleListItemClick}/>
        <Map {...this.state} 
        handleMarkerClick={this.handleMarkerClick}
         />  
      </div>
    );
  }
}

export default App;
