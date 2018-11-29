import React, {Component} from 'react';
import './PlannerHeader.css';
import PlanName from '../PlanName/PlanName';

const PlannerHeader = (props) => {
    return (
        <div className="planner-header-wrapper">
            <div className="plan-name-container"> <PlanName name="BA Major Computer Science"/> </div>
            <div className="favouriteBtn-container"><p>Favourite Button</p></div>
            <div className="optimizeBtn-container"><p>Optimize button</p></div>
            <div className="warning-summary-container"><p>Warning summary</p></div>
            <div className="addcourseBtn-container"><p>Add course button</p></div>
        </div>
    );
}

export default PlannerHeader;