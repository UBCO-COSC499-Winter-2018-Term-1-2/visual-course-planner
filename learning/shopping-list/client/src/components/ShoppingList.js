import React, { Component } from 'react';
import { Container, ListGroup } from 'reactstrap';
import { TransitionGroup } from 'react-transition-group';
import Item from './Item';
import axios from 'axios';

class ShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.getItems();
    }

    componentDidUpdate() {
        this.getItems();
    }

    getItems = () => {
        axios.get('/api/items').then(res => {
            this.setState({
                items: res.data
            });
        });        
    }    

    render() {
        console.log(this.state.items);
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                            {this.props.items.map(({ id, name }) => (
                                <Item id={id} name={name}/> 
                            ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

export default ShoppingList;