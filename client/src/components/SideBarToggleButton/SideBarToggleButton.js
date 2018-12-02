import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SideBarToggleButton.css';

const plusIcon = <FontAwesomeIcon icon="plus"/>;

const SideBarToggleButton = (props) => {
  return(
    <div  className="sidebar-toggle-button-wrapper" onClick={props.click}>
      <div className="sidebar-togglebtn-container">
        <span id="sidebar-togglebtn" 
          onClick={props.click}> Add Course {props.numberOfWarnings}
        </span>
      </div>
      <div className="plus-icon-container"> {plusIcon} </div>
    </div>
  );
};

SideBarToggleButton.propTypes = {
  click: PropTypes.func.isRequired,
  numberOfWarnings: PropTypes.number.isRequired
};

export default SideBarToggleButton;