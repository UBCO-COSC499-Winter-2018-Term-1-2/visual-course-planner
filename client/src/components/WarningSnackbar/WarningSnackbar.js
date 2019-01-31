import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WarningSnackbar.css';


class WarningSnackbar extends Component {

  CloseButton = () => {
    return (
      <div className="closebtn-container">
        <span id="close-snackbar-btn" onClick={this.props.closeSnackbar}>
          <FontAwesomeIcon icon="times"/>
        </span>
      </div>
    );
  }

  WarningMessageList = () => {
    let warnings;
    if (this.props.warnings.length > 0) {
      warnings = this.props.warnings.map((warning, index) => (
        <div className="warning-message-container" key={index}>
          <p>{warning.message}</p>
        </div>
      ));
    } else {
      warnings = (
        <div className="warning-message-container">
          <p>No warnings.</p>
        </div>
      );
    }
    return (
      <div className="warning-list-container">
        {warnings}
      </div>
    );
  }
  render() {
    return (
      <div className={this.props.showSnackbar ? "warning-snackbar-wrapper show" : "warning-snackbar-wrapper"}>
        <div className="warning-snackbar-container">
          <this.CloseButton/>
          <this.WarningMessageList/>
        </div>
      </div>
    );
  }
}

WarningSnackbar.propTypes = {
  showSnackbar: PropTypes.bool.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  warnings: PropTypes.array.isRequired
};

export default WarningSnackbar;