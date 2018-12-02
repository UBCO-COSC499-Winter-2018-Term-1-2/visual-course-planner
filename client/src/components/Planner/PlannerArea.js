import React, { Component } from 'react';
import PlannerHeader from '../PlannerHeader/PlannerHeader'
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

export default PlannerArea;