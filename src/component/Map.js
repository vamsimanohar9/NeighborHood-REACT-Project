import React, { Component } from 'react';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
  } from "react-google-maps";

  const MyMapComponent = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={8}
        zoom={props.zoom}
        defaultCenter={{ lat: 17.728663, lng: 83.235769 }}
         //center={props.center}
      >
      
       {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, idx) => {
            const venueInfo = props.venues.find(
                venue => venue.id === marker.id);
              return ( 
       <Marker key={idx} 
       position={{ lat: marker.lat, lng: marker.lng }} 
       onClick={() => props.handleMarkerClick(marker)}
       animation={
        marker.isOpen === true
            ? window.google.maps.Animation.BOUNCE
            : window.google.maps.Animation.DROP
    }
       >

       {marker.isOpen && 
       venueInfo.bestPhoto && ( 
       <InfoWindow>
           <React.Fragment>
               <img 
               src={`${venueInfo.bestPhoto.prefix}200x200${
                   venueInfo.bestPhoto.suffix}`}
                   alt={"venue pics"}
                   
                   />
        <p>{venueInfo.name}</p>
        </React.Fragment>
       </InfoWindow>
       )}
       </Marker>
       )})}
       </GoogleMap>
  ))
  );

  export default class Map extends Component {
      render(){
          return(
            <MyMapComponent
             {...this.props}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDW0MyJNDpQxRw_HIF0PRwSE8a3aEoAIcY"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%`, width: `75%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          )
      }
  }
    