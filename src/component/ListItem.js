import React, { Component } from "react";

class ListItem extends Component {
  render() {
    return (<li role="button"  
    tabIndex="0"className={"listItem"} 
    onClick={()=>this.props.listItemClick(this.props)} >
      {this.props.name}
    </li>)
  }
}

export default ListItem;
