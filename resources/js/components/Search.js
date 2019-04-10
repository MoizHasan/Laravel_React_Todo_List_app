import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
    super(props);
    
    //Boilerplate code for binding methods with `this`
    this.handleKeyUp = this.handleKeyUp.bind(this); 
  }

  handleKeyUp(e) {
    let currentList = []; 
    let filteredList = [];

  if (e.target.value !== "") {
    currentList = this.props.items;
    filteredList = currentList.filter(item => {
    const lc = item.title.toLowerCase();
    const filter = e.target.value.toLowerCase();
    return lc.includes(filter);
  });
  } else {
    filteredList = this.props.items;
  }

  this.props.handleChange(filteredList);
}

      render() {
          return(  
            <div className="search-bar"> 
            <input onChange={this.handleKeyUp} type="text" className="input" placeholder="Search." />
            </div>
            )
      }
  }

  export default Search;
