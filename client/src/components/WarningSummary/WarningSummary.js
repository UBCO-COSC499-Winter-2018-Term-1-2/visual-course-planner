import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WarningSummary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const warningIcon = <FontAwesomeIcon icon="exclamation-triangle" id="warning-icon" />; 

class WarningSummary extends Component {

  render() {
    return(
      <div className="warning-summary-wrapper">
              
        <div className="warning-icon-container"> {warningIcon} </div>
              
        <div className="warning-notification-container">
          <span id="warning-notification" onClick={this.props.click}> Warnings ({this.props.numberOfWarnings})</span>
        </div>
              
      </div>
    );
  }
}

WarningSummary.propTypes = {
  numberOfWarnings: PropTypes.number.isRequired,
  click: PropTypes.func.isRequired
};

export default WarningSummary;