import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Item from './Item'; 
import AddItem from './AddItem';
import UpdateItem from './UpdateItem';
import Search from './Search'; 


class Main extends Component {

    constructor() {

        super();
        //initialize state
        this.state = {
            items: [],
            filteredItems: [],  
            currentItem: null,
        }

        this.handleAddItem = this.handleAddItem.bind(this); 
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this); 
        this.handleChange = this.handleChange.bind(this); 
    }

    componentDidMount() {
        const token = this.props.token;
        axios.get('api/items?api_token=' + token)
        .then(res => {
            const items = res.data;
            this.setState({ items : items, filteredItems : items });
        });
    }

    handleAddItem(item) {
        const token = this.props.token;
        const id = item.id;
        fetch( 'api/item?api_token=' + token, {
            method:'post',
       /* headers are important*/
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
        
       body: JSON.stringify(item)
   })
   .then(response => {
       return response.json();
   })
   .then( data => {
       //update the state
       this.setState((prevState)=> ({
           items: prevState.items.concat(data),
           filteredItems: prevState.items.concat(data),
           currentItem: null
       }))
   })
 
 }

 handleDelete(item) {
    const token = this.props.token;
    const id = item.id; 
    axios.delete( 'api/items/' + id + '?api_token=' + token)
    .then(data => {
        var array = this.state.items.filter(function(x) {
            return x !== item
        });
            
            this.setState({items: array, 
                            filteredItems: array
                            });
        });
    }

    handleUpdate(item) {
        const currentItem = this.state.currentItem;
        const token = this.props.token;
        const id = this.state.currentItem.id;
        fetch( 'api/items/' + id + '?api_token=' + token, {
            method:'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(item)
        })
        .then( response => {
            return response.json();
        }) 
        .then( data => {
            var array = this.state.items.filter(function(x) {
                return x !== currentItem
            })
            this.setState((prevState)=> ({
                items: array.concat(item),
                filteredItems: array.concat(item), 
                currentItem: null
            }))
        }) 
    }

    //pass data from a clicked item component back to main so it can be used in handleUpdate ~grimaces~
    handleEdit(item) {
        this.setState({
            currentItem: item
        }); 
    }

    handleComplete(item) {
        const token = this.props.token;
        const id = item.id;
        axios.put( 'api/item_complete/' + id + '?api_token=' + token);
        //loop through items and get index of match
        var array = this.state.items;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === item) {
                array[i] = item;
            }
        }
        this.setState((prevState)=> ({
            items: array, 
        }))
    }

    handleChange(filteredItems) {
        this.setState({filteredItems : filteredItems}); 
    }
 

    render() {
        return (
            <div>
                <div>
                <Search items={this.state.items} handleChange={this.handleChange} />
                {this.state.filteredItems.map(item => (
                <div key={item.id} >
                    < Item item={item} handleEdit={this.handleEdit} handleComplete={this.handleComplete} handleDelete={this.handleDelete} />
                </div>
                ))}
                </div>
                { this.state.currentItem ? <UpdateItem className={this.state.editClass} onUpdate={this.handleUpdate} currentItem={this.state.currentItem} /> : null }
                <AddItem onAdd={this.handleAddItem} />
            </div>
            );
    }
}

export default Main;

if (document.getElementById('root')) {
    const component = document.getElementById('root');
    const props = Object.assign({}, component.dataset);  
    ReactDOM.render(<Main {...props} />, document.getElementById('root'));
}