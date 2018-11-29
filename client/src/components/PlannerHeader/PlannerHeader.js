import React, {Component} from 'react';
import './PlannerHeader.css';
import PlanName from '../PlanName/PlanName';
import FavouriteBtn from '../FavouriteBtn/FavouriteBtn';

const PlannerHeader = (props) => {
    return (
        <div className="planner-header-wrapper">
            <div className="plan-name-container"> <PlanName name="BA Major Computer Science"/> </div>
            <div className="favouriteBtn-container"><FavouriteBtn favourite={true}/></div>
            <div className="optimizeBtn-container"><p>Optimize button</p></div>
            <div className="warning-summary-container"><p>Warning summary</p></div>
            <div className="addcourseBtn-container"><p>Add course button</p></div>
        </div>
    );
}

export default PlannerHeader;