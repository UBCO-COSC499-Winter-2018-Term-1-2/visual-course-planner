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
      <PlanName name={props.plan.name}/>
      <FavouriteBtn favourite={true}/>
      <OptimizeBtn click={props.optimize}/>
      <WarningContainer click={props.showWarning} plan={props.plan} setWarnings={props.setWarnings}/>
      <SideBarToggleButton click={props.toggleSidebar}/>
    </div>
  );
};

PlannerHeader.propTypes = {
  plan: PropTypes.string.isRequired,
  optimize: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  showWarning: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setWarnings: PropTypes.func.isRequired
};

export default PlannerHeader;