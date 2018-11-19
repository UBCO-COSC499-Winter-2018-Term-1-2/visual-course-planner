import React, { Component } from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

class Item extends Component {

  onDeleteClick = (id) => {
    this.deleteItem(id)
  }

  deleteItem = (id) => {
    axios.delete('/api/items/' + id);
  }

  render() {
    console.log(this.props.id);
    return (
      <CSSTransition key={this.props.id} timeout={500} classNames="fade">
        <ListGroupItem>
            {this.props.name}
            <Button
            className="remove-btn"
            color="danger"
            size="sm"
            onClick={this.onDeleteClick.bind(this, this.props.id)}
            >&times;</Button>
        </ListGroupItem>
      </CSSTransition>
    )
  }
}

export default Item;