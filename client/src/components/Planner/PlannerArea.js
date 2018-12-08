import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlannerHeader from '../PlannerHeader/PlannerHeader';
import WarningSnackbar from '../WarningSnackbar/WarningSnackbar';

class PlannerArea extends Component {

  state = {
    warnings: []
  }

  warningSystemHandler = () => {
    this.setState({ showSnackbar: true });
    //setTimeout(() => { this.setState({ showSnackbar: false });}, 3000); 
  }

  closeWarningSnackbarHandler = () => {
    this.setState({ showSnackbar: false });
  }

  setWarnings = (warnings) => {
    this.setState({
      warnings: warnings
    });
  }

  render() {
    return (
      <div id="planner-area">
        <PlannerHeader 
          plan={this.props.plan}
          toggleSidebar={this.props.toggleSidebar} 
          optimize={this.props.optimize}
          showWarning={this.props.showWarning}
          setWarnings={this.setWarnings}
        />
          
        <WarningSnackbar 
          showSnackbar={this.props.showSnackbar}
          closeSnackbar={this.props.closeSnackbar}
          warnings={this.state.warnings}
        />
        <div id="session-container">
          
        </div>
      </div>
    );
  }
}

PlannerArea.propTypes = {
  plan: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  optimize: PropTypes.func.isRequired,
  showWarning: PropTypes.func.isRequired,
  showSnackbar: PropTypes.bool.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default PlannerArea;