import React, { Component } from 'react';
import delIcon from '../../images/delete.png';

class Item extends Component {

    constructor(props) {
    super(props);
    
    //Boilerplate code for binding methods with `this`
    this.handleDeletePress = this.handleDeletePress.bind(this);
    this.handleEditPress = this.handleEditPress.bind(this); 
    this.handleCompletePress = this.handleCompletePress.bind(this); 
  }

  handleDeletePress() {

    this.props.handleDelete(this.props.item);
  }

  handleEditPress() {
    this.props.handleEdit(this.props.item); 
  }

  handleCompletePress() {
    var c = (this.props.item.completed === 0) ? 1 : 0;
    var item = this.props.item;
    item.completed = c;
    this.props.handleComplete(item); 
  }


      render() {
          return(  
            <div className="todo-item"> 
            <h2 className="title"> {this.props.item.title} </h2>
            <p className="description"> {this.props.item.description} </p>
            <nav className="buttons">
            <button className="edit" onClick={this.handleEditPress} > Edit </button>
            <div onClick={this.handleCompletePress} className={"complete completed-"+this.props.item.completed}></div>
            <button className="delete" onClick={this.handleDeletePress}><img src = {delIcon} /></button>
            </nav> 
            </div>
            )
      }
  }

  export default Item;
