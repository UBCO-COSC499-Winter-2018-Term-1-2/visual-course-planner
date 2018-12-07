import React, { Component } from 'react';
import WarningSummary from '../components/WarningSummary/WarningSummary';
import axios from 'axios';
import PropTypes from 'prop-types';
// import Plan from '../models/Plan';

class WarningContainer extends Component {
  state = {
    warnings: []
  };


  componentDidMount = () => {
    this.getWarnings()
      .then(warnings =>
        this.setState({
          warnings: warnings
        })
      )
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <WarningSummary warnings={this.state.warnings} click={this.props.click} />
    );
  }
}

WarningContainer.propTypes = {
  click: PropTypes.func.isRequired,
  plan: PropTypes.object.isRequired
};

export default WarningContainer;