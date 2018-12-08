import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlannerHeader from '../PlannerHeader/PlannerHeader';
import WarningSnackbar from '../WarningSnackbar/WarningSnackbar';

class PlannerArea extends Component {

  state = {
    warnings: [{
      message: "test"
    }],
    showSnackbar: false
  }

  showSnackbar = () => {
    this.setState({ showSnackbar: true });
    //setTimeout(() => { this.setState({ showSnackbar: false });}, 3000); 
  }

  closeSnackbar = () => {
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
          showWarning={this.showSnackbar}
          setWarnings={this.setWarnings}
          warnings={this.state.warnings}
          user={this.props.user}
        />
          
        <WarningSnackbar 
          showSnackbar={this.state.showSnackbar}
          closeSnackbar={this.closeSnackbar}
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
  user: PropTypes.object.isRequired
};

export default PlannerArea;