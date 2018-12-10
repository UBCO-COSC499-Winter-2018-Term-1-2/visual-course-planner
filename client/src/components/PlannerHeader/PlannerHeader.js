import React from 'react';
import PropTypes from 'prop-types';
import './PlannerHeader.css';
import PlanName from '../PlanName/PlanName';
import FavouriteBtn from '../FavouriteBtn/FavouriteBtn';
import SideBarToggleButton from '../SideBarToggleButton/SideBarToggleButton';
import OptimizeBtn from '../OptimizeBtn/OptimizeBtn'; 
import WarningContainer from '../../containers/WarningContainer';

const PlannerHeader = (props) => {
  return (
    <div className="planner-header-wrapper">
      <PlanName name={props.plan.name}/>
      <FavouriteBtn favourite={true}/>
      <OptimizeBtn click={props.optimize}/>
      <WarningContainer
        warnings={props.warnings}
        click={props.showWarning} plan={props.plan}
        setWarnings={props.setWarnings}
        user={props.user}
      />
      <SideBarToggleButton click={props.toggleSidebar}/>
    </div>
  );
};

PlannerHeader.propTypes = {
  plan: PropTypes.object.isRequired,
  optimize: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  showWarning: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setWarnings: PropTypes.func.isRequired,
  warnings: PropTypes.array.isRequired
};

export default PlannerHeader;