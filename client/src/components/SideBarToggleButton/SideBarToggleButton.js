import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SideBarToggleButton.css';

const SideBarToggleButton = (props) => {
  return(
    <div  className="sidebar-toggle-button-wrapper" onClick={props.click}>
      <div className="sidebar-togglebtn-container">
        <button
          id="sidebar-togglebtn" 
          onClick={props.click}
          className="sidebar-button"
        >
          Add Course
          <FontAwesomeIcon icon="plus" style={{marginLeft: '0.5em'}}/>
        </button>
      </div>
      
    </div>
  );
};

SideBarToggleButton.propTypes = {
  click: PropTypes.func.isRequired,
};

export default SideBarToggleButton;