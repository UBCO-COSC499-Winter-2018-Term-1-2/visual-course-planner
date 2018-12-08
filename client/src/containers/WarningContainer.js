import React, { Component } from 'react';
import WarningSummary from '../components/WarningSummary/WarningSummary';
import axios from 'axios';
import PropTypes from 'prop-types';
// import Plan from '../models/Plan';

class WarningContainer extends Component {
  state = {
    warnings: []
  };

  getWarnings = async () => {
    axios
      .get('api/warnings')
      .then(warnings => {
        return warnings;
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate = () => {
    this.getWarnings()
      .then(warnings => {
        this.props.setWarnings(warnings);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <WarningSummary numberOfWarnings={this.state.warnings.length} click={this.props.click} />
    );
  }
}

WarningContainer.propTypes = {
  click: PropTypes.func.isRequired,
  plan: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setWarnings: PropTypes.func.isRequired
};

export default WarningContainer;