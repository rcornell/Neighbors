// Component where users can delete their items that are available for borrowing

/* eslint react/prop-types: 0 */
/*  global fetch:false  */


const React = require('react');

class DeleteItemButton extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      item_id: null
    }
  }

  deleteItem() {   
    console.log('deleteItem fired');
    
    this.setState({
      item_id: this.props.itemID
    })

    const info = {
      item_id: this.state.item_id
    };
    
    
    fetch('/api/items', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(info),
    })
     .then(() => this.props.deleteItemFromList(this.state.item_id))
  }
  
  render() {
    return (
      <div>
        <button onClick={() => this.deleteItem()} className="btn btn-warning btn-md">Delete Item</button>
      </div>
    );
  }
}

module.exports = DeleteItemButton;
