import React, { Component } from 'react';

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
            <p> {this.props.item.title} </p>
            <p> {this.props.item.description} </p>
            <button onClick={this.handleEditPress} > Edit </button>
            <button onClick={this.handleDeletePress}> Delete </button>
            <div onClick={this.handleCompletePress} className={"complete completed-"+this.props.item.completed}></div>
            </div>
            )
      }
  }

  export default Item;
