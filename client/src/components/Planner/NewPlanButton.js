import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NewPlanButton = (props) => {
    
  return(
    <button className="sidebar-button" onClick={props.onClick}><FontAwesomeIcon icon="plus"/> Create New Plan </button>
  );
};

NewPlanButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default NewPlanButton;