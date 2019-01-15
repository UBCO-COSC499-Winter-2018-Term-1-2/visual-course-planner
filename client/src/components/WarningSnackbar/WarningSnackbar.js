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
    if (this.props.warnings.length > 0) {
      return this.props.warnings.map((warning, index) =>
        <div className="warning-message-container" key={index}>
          {/* <h3>{warning.course}</h3> */}
          <p>{warning.message}</p>
        </div>
      );
    } else {
      return  (
        <div className="warning-message-container">
          {/* <h3>{warning.course}</h3> */}
          <p>No warnings.</p>
        </div>
      );
    }
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