/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Marker } from 'react-google-maps';

  const MyMapComponent = withScriptjs (
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12} 
      zoom={props.zoom}
      defaultCenter={{
        lat: 45.5122308, lng: -122.6587185}}
        center={props.center}
    >
      {props.markers && 
        props.markers.filter(marker => 
          marker.isVisible).map((marker, idx, arr) => {
          const venueInfo = props.venues.find(venue => venue.id && marker.id);
      return (
        <Marker 
        key={idx} 
        position={{lat: marker.lat, lng: marker.lng}} 
        onClick={() => props.handleMarkerClick(marker)} 
        animation= {marker.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP} > 
        
        {marker.isOpen && 
        venueInfo.bestPhoto && (
      <InfoWindow 
          aria-label="gallery info" role="listbox" tabIndex="0" >  
        <React.Fragment>
          <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} 
          alt="gallery view" aria-label={venueInfo.description} />
          <p>{venueInfo.name}</p>   
          <a href={venueInfo.url}>{venueInfo.url}</a>
          <p>{venueInfo.location.address}</p>     
        </React.Fragment>
      </InfoWindow>
        )}
      </Marker>
        );
        })}
    </GoogleMap>
    ))
  );
  
export default class Map extends Component {
  render () {
    return (
    <MyMapComponent
      id="map" aria-label="area map" role="application" tabIndex="0"
      {...this.props}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyACxrm7b9GlF8v5fcTtl-VkSxXlM9Y5BcE"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%`, width: `70%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
    );
  }
}
