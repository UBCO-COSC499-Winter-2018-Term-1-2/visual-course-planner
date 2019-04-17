import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Backdrop from '../Backdrop/Backdrop';
import './BackdropButton.css';

class BackdropButton extends Component {

  render() {
    return(
      <div  className="backdrop-button-wrapper">
        <div className="backdrop-button-container">
          <button
            id="backdrop-button" 
            onClick={this.props.open}
            className="sidebar-button"
          >
        
            <FontAwesomeIcon icon="plus" style={{marginLeft: '0.5em'}}/>
            Add Course
          </button>
        </div>
  
        {this.props.isOpen && <Backdrop click={this.props.close} />}
  
  
      </div>
    );
  }
  
}

BackdropButton.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default BackdropButton;