import React from 'react';
import PropTypes from 'prop-types';
import './PlannerHeader.css';
import PlanName from '../PlanName/PlanName';
import FavouriteBtn from '../FavouriteBtn/FavouriteBtn';
import SideBarToggleButton from '../SideBarToggleButton/SideBarToggleButton';
import OptimizeBtn from '../OptimizeBtn/OptimizeBtn'; 
import WarningSummary from '../WarningSummary/WarningSummary';

const PlannerHeader = (props) => {
  return (
    <div  id="planner-header">
      <PlanName onChange={props.onNameChange}>{props.planName}</PlanName>
      <div className="planner-header-wrapper">
        <FavouriteBtn favourite={true}/>
        <OptimizeBtn click={props.optimize}/>
        <WarningSummary
          click={props.showWarning}
          numberOfWarnings={props.numberOfWarnings}
          user={props.user}
        />
        <SideBarToggleButton click={props.toggleSidebar}/>
      </div>
      
    </div>
  );
};

PlannerHeader.propTypes = {
  planName: PropTypes.string.isRequired,
  optimize: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  showWarning: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  numberOfWarnings: PropTypes.number.isRequired,
  onNameChange: PropTypes.func.isRequired
};

export default PlannerHeader;