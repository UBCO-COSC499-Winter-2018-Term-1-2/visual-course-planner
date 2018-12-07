import React from 'react';
import PropTypes from 'prop-types';
import './PlannerHeader.css';
import PlanName from '../PlanName/PlanName';
import FavouriteBtn from '../FavouriteBtn/FavouriteBtn';
import SideBarToggleButton from '../SideBarToggleButton/SideBarToggleButton';
import OptimizeBtn from '../OptimizeBtn/OptimizeBtn'; 
import WarningContainer from '../WarningSummary/WarningSummary';

const PlannerHeader = (props) => {
  return (
    <div className="planner-header-wrapper">
      <div className="plan-name-container"> <PlanName name={props.planName}/> </div>
      <div className="favouriteBtn-container"><FavouriteBtn favourite={true}/></div>
      <div className="optimizeBtn-container"><OptimizeBtn click={props.optimize}/></div>
      <WarningContainer 
        click={props.showWarning}
      />
      <div className="addcourseBtn-container"><SideBarToggleButton click={props.toggleSidebar}/></div>
    </div>
  );
};

PlannerHeader.propTypes = {
  planName: PropTypes.string.isRequired,
  optimize: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  numberOfWarnings: PropTypes.number.isRequired,
  showWarning: PropTypes.func.isRequired
};

export default PlannerHeader;