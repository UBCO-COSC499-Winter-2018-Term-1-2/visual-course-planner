import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlannerHeader.css';
import PlanName from '../PlanName/PlanName';
import FavouriteBtn from '../FavouriteBtn/FavouriteBtn';
import BackdropButton from '../BackdropButton/BackdropButton';
import OptimizeBtn from '../OptimizeBtn/OptimizeBtn'; 
import WarningSummary from '../WarningSummary/WarningSummary';

class PlannerHeader extends Component {

  render() {
    return (
      <div className="planner-header-wrapper" id="planner-header">
        <PlanName name={this.props.planName}/>
        <FavouriteBtn favourite={true}/>
        <OptimizeBtn click={this.props.optimize}/>
        <WarningSummary
          click={this.props.showWarning}
          numberOfWarnings={this.props.numberOfWarnings}
          user={this.props.user}
        />
        <BackdropButton open={this.props.openCourseList} close={this.props.closeCourseList} isOpen={this.props.isCourseListOpen}/>
      </div>
    );
  }
  
}

PlannerHeader.propTypes = {
  planName: PropTypes.string.isRequired,
  optimize: PropTypes.func.isRequired,
  showWarning: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  numberOfWarnings: PropTypes.number.isRequired,
  openCourseList: PropTypes.func.isRequired,
  closeCourseList: PropTypes.func.isRequired,
  isCourseListOpen: PropTypes.func.isRequired
};

export default PlannerHeader;