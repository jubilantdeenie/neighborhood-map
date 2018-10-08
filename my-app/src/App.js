import React, { Component } from 'react';
import './App.css';
import Map from './component/Map';
import SquareAPI from './API/';

class App extends Component {
  constructor () {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 14
    };
  }
  componentDidMount() {
    SquareAPI.search ({
      near: "Portland,OR",
      query: "gluten-free",
      limit: 12
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
        };
      });
      this.setState({ venues, center, markers});
    });
  }

  render() {
    return (
      <div className="App">
        <Map {...this.state} /> 
      </div>
    );
  }
}

export default App;
