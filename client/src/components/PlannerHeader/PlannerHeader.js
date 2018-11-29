import React, {Component} from 'react';
import './PlannerHeader.css';

const PlannerHeader = (props) => {
    return (
        <div className="planner-header-wrapper">
            <div className="plan-name-container"><p>Plan Name</p></div>
            <div className="favouriteBtn-container"><p>Favourite Button</p></div>
            <div className="optimizeBtn-container"><p>Optimize button</p></div>
            <div className="warning-summary-container"><p>Warning summary</p></div>
            <div className="addcourseBtn-container"><p>Add course button</p></div>
        </div>
    );
}

export default PlannerHeader;