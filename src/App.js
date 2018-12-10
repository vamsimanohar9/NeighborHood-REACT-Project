import React, { Component } from 'react';
import './App.css';
import './index.css'
import Map from './component/Map';
import SquareAPI from "./API/"
import SideBar from './component/SideBar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };
  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue,res.response.venue)
      this.setState({venues:Object.assign(this.state.venues, newVenue)})
      console.log(newVenue)
    });
  }
  listItemClick = venue => {
    const marker = this.state.markers.find(marker=> marker.id === venue.id);
    this.handleMarkerClick(marker);
  };
  componentDidMount(){
    SquareAPI.search({
      near:"Visakhapatnam, Andhra Pradesh",
      query:"food",
      limit: 15
    }).then(results => {
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
        this.setState({ venues, center, markers });
      console.log(results)
    })
  }
  render() {
    return (
      <div className="App" role={"main"}>
      <SideBar{...this.state} listItemClick={this.listItemClick}/>
    <Map {...this.state} 
    handleMarkerClick={this.handleMarkerClick} 
    />
      </div>
    );
  }
}

export default App;
