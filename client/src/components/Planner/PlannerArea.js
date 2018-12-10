import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlannerHeader from '../PlannerHeader/PlannerHeader';
import WarningSnackbar from '../WarningSnackbar/WarningSnackbar';

class PlannerArea extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <div id="planner-area">
        <div id="session-container">
          <PlannerHeader 
            planName = {this.props.planName}
            toggleSidebar={this.props.toggleSidebar} 
            optimize={this.props.optimize}
            numberOfWarnings={this.props.numberOfWarnings}
            showWarning={this.props.showWarning}/>
          
          <WarningSnackbar 
            showSnackbar={this.props.showSnackbar}
            closeSnackbar={this.props.closeSnackbar}
            warningMessage={this.props.warningMessage}/>
        </div>
      </div>
    );
  }
}

PlannerArea.propTypes = {
  planName: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  optimize: PropTypes.func.isRequired,
  numberOfWarnings: PropTypes.number.isRequired,
  showWarning: PropTypes.func.isRequired,
  showSnackbar: PropTypes.bool.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  warningMessage: PropTypes.string.isRequired,
};

export default PlannerArea;