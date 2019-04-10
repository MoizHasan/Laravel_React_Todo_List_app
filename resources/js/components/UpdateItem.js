import React, { Component } from 'react';

class UpdateItem extends Component {
 
  constructor(props) {
    super(props);
       /* Initialize the state. */
       this.state = {
          newItem: {
              title: "",
              description: ""
          }
        }
     
    //Boilerplate code for binding methods with `this`
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
   
  /* This method dynamically accepts inputs and stores it in the state */
  handleInput(key, e) {
     
    /*Duplicating and updating the state */
    var state = Object.assign({}, this.state.newItem); 
    state[key] = e.target.value;
    this.setState({newItem: state });
  }
 /* This method is invoked when submit button is pressed */
  handleSubmit(e) {
    //preventDefault prevents page reload   
    e.preventDefault();
    /*A call back to the onAdd props. The current
     *state is passed as a param
     */
    this.props.onUpdate(this.state.newItem);
  }
 
  render() {
    if (!this.props.currentItem) {
        return <div />
    }

    return(
      <div className="update-box"> 
        <h2> Edit Task </h2>
        <h4 className="details">{this.props.currentItem.title}</h4>
        <p className="details">{this.props.currentItem.description}</p>
        <div> 
        {/*when Submit button is pressed, the control is passed to 
         *handleSubmit method 
         */}
        <form onSubmit={this.handleSubmit}>
          <label> Title: 
           { /*On every keystroke, the handeInput method is invoked */ }
            <input className="update-input" type="text" onChange={(e)=>this.handleInput('title',e)} />
          </label>
           
          <label> Description: 
            <input className="update-input" type="text" onChange={(e)=>this.handleInput('description',e)} />
          </label>
           
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>)
  }
}
 
export default UpdateItem;