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
  
  closeAllMarkers = () => {
    {/* Close all additional markers */}
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers)} );
  };
 
  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    {/* When a marker is clicked retrieve venue info  */}
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id && marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({venues: Object.assign(this.state.venues, newVenue)});
      console.log(newVenue)
    });
}; 

handleListItemClick = venue => {
  {/* Click on list item to call marker info */}
  const marker = this.state.markers.find(marker => marker.id === venue.id);
  this.handleMarkerClick(marker);
  console.log(venue);
}

  componentDidMount() {
    {/* Venue search parameters */}
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


  render() {
    {/* Display sidebar and map components */}
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
