import React, { Component } from 'react';
import WarningSummary from '../components/WarningSummary/WarningSummary';
import axios from 'axios';
import PropTypes from 'prop-types';

class WarningContainer extends Component {

  getWarnings = async () => {
    try {
      const response = await axios.post('api/warnings', 
        {
          plan: this.props.plan,
          user: this.props.user
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      return response.data;
      
    } catch(err) {
      console.log(err);
    }  
  }

  componentDidMount = async () => {
    try {
      const warnings = await this.getWarnings();
      this.props.setWarnings(warnings);
    } catch(err) {
      console.log(err);
    }
  }

  componentDidUpdate = async () => {
    try {
      const warnings = await this.getWarnings();
      this.props.setWarnings(warnings);
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <WarningSummary click={this.props.click} numberOfWarnings={this.props.warnings.length}/>
    );
  }
}

WarningContainer.propTypes = {
  click: PropTypes.func.isRequired,
  plan: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setWarnings: PropTypes.func.isRequired,
  warnings: PropTypes.array.isRequired
};

export default WarningContainer;