import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import axios from 'axios';


class ItemModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: ''
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        }

        this.addItem(newItem);
        this.toggle();
    }

    addItem = (newItem) => {
        axios.post('/api/items', newItem).then(res => {
            console.log("Item added: " + newItem);
        })
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: '2em'}}
                    onClick={this.toggle}
                >Add Item
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.state.toggle}
                >
                    <ModalHeader>Add to Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="add shopping item"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2em'}}
                                >
                                    Add Item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}

export default ItemModal;
