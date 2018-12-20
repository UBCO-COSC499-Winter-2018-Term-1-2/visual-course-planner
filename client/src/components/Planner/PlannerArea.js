import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlannerHeader from '../PlannerHeader/PlannerHeader';
import WarningSnackbar from '../WarningSnackbar/WarningSnackbar';
import Semester from '../Semester/Semester';
//import SemesterDivider from '../SemesterDivider/SemesterDivider';
import './PlannerArea.css';

class PlannerArea extends Component {

  state = {
    warnings: [],
    showSnackbar: false
  }

  //default semesters hard coded. Needs proper logic!
  numberOfSemesters = [1, 2, 3, 4, 5, 6, 7, 8];

  //rendering semester components by mapping above array
  renderSemesters = () => {
    return (this.numberOfSemesters.map((semester) =>
      <Semester key={semester} term={semester} />
    ));
  }

  showSnackbar = () => {
    this.setState({ showSnackbar: true });
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

        <div id="semester-view">
          <this.renderSemesters />
        </div>

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