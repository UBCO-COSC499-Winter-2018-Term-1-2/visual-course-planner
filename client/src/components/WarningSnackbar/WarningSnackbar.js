import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WarningSnackbar.css';

const closeIcon = <FontAwesomeIcon icon="times"/>

const WarningSnackbar = (props) => {
    return (
        <div className={props.showSnackbar ? "warning-snackbar-wrapper-show" : "warning-snackbar-wrapper"}>
            <div className="closebtn-container">
                <span id="close-snackbar-btn" onClick={props.closeSnackbar} > {closeIcon} </span>
            </div>

            <div className="warning-message-container">
                <p> {props.warningMessage} </p>
            </div>
        </div>
    );
}

WarningSnackbar.propTypes = {
    showSnackbar: PropTypes.bool.isRequired,
    closeSnackbar: PropTypes.func.isRequired,
    warningMessage: PropTypes.string.isRequired
}

export default WarningSnackbar;