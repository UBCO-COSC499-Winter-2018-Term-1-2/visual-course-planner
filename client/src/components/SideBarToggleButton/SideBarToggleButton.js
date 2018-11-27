import React from 'react';

import './SideBarToggleButton.css';

const SideBarToggleButton = (props) => (
    <button className="sidebar-toggle-button" onClick={props.click}>
       Add Courses
    </button>
);

export default SideBarToggleButton;