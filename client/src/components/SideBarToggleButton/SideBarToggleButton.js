import React from 'react';
import PropTypes from 'prop-types';

import './SideBarToggleButton.css';

const SideBarToggleButton = (props) => (
  <button className="sidebar-toggle-button" onClick={props.click}>
       Add Courses
  </button>
);

SideBarToggleButton.propTypes = {
  click: PropTypes.func,
};

export default SideBarToggleButton;