import React from 'react';
import PropTypes from 'prop-types';
import './PlannerHeader.css';
import PlanName from '../PlanName/PlanName';
import FavouriteBtn from '../FavouriteBtn/FavouriteBtn';
import SideBarToggleButton from '../SideBarToggleButton/SideBarToggleButton';
import OptimizeBtn from '../OptimizeBtn/OptimizeBtn'; 

const PlannerHeader = (props) => {
    return (
        <div className="planner-header-wrapper">
            <div className="plan-name-container"> <PlanName name="BA Major Computer Science"/> </div>
            <div className="favouriteBtn-container"><FavouriteBtn favourite={true}/></div>
            <div className="optimizeBtn-container"><OptimizeBtn click={props.optimize}/></div>
            <div className="warning-summary-container"><p>Warning summary</p></div>
            <div className="addcourseBtn-container"><SideBarToggleButton click={props.toggleSidebar}/></div>
        </div>
    );
}

PlannerHeader.propTypes = {
    optimize: PropTypes.func.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
}

export default PlannerHeader;