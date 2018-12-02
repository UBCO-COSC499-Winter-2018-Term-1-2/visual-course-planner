import React from 'react';
import PropTypes from 'prop-types';
import './WarningSummary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const warningIcon = <FontAwesomeIcon icon="exclamation-triangle" id="warning-icon" />; 

const WarningSummary = (props) => {
    return(
        <div className="warning-summary-wrapper">
            
            <div className="warning-icon-container"> {warningIcon} </div>
            
            <div className="warning-notification-container">
                <span id="warning-notification" onClick={props.click}> Warnings ({props.numberOfWarnings})</span>
            </div>
            
        </div>
    );
}

WarningSummary.propTypes = {
    numberOfWarnings: PropTypes.number.isRequired
}

export default WarningSummary;