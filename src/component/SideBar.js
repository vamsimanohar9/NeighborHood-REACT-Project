import React, { Component } from "react";
import VenueList from "./VenueList";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      venues: []
    };
  }
  handlingfilterVenues = () => {
    if(this.state.query.trim()!== ""){
      const venues = this.props.venues.filter(venue => venue.name
          .toLowerCase()
          .includes(this.state.query.toLowerCase())
      );
      console.log(venues);
      return venues;
    }
    return this.props.venues;
  };
  handlingChange = e => {
     this.setState({query:e.target.value});
     const markers = this.props.venues.map(venue =>{
       const isMatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase());
       const marker = this.props.markers.find(marker =>marker.id === venue.id);
       if(isMatched){
         marker.isVisible = true;
       } else {
         marker.isVisible = false;
       }
       return marker;
     });
     this.props.updateSuperState({markers})
  };
  render() {
    return (<div className={"sideBar"}>
      <input type={"search"}  id={"searchbar"} placeholder={"Search Venues..."} onChange={this.handlingChange}/>
      <VenueList{...this.props}
                venues={this.handlingfilterVenues()}
                listItemClick={this.props.listItemClick}/>
    </div>)
  }
}

export default SideBar;
