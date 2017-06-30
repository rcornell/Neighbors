// Component where users can delete their items that are available for borrowing

/* eslint react/prop-types: 0 */
/*  global fetch:false  */


const React = require('react');

class DeleteItemButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_id: this.props.itemID,
    };
    
    this.deleteItem = (e) => {
      e.preventDefault();
    
      const info = {
        item_id: itemID
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
    };
  }
  
  render() {
    return (
      <div>
        <button onSubmit={e => this.deleteItem(e)} type="submit" className="btn btn-warning btn-md">Delete Item</button>
      </div>
    );
  }
}

module.exports = DeleteItemButton;
