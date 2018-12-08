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
    return this.props.warnings.map((warning, index) =>
      <div className="warning-message-container" key={index}>
        {/* <h3>{warning.course}</h3> */}
        <p>{warning.message}</p>
      </div>
    );
  }
  render() {
    return (
      <div className={this.props.showSnackbar ? "warning-snackbar-wrapper-show" : "warning-snackbar-wrapper"}>
        <this.CloseButton/>
        <this.WarningMessageList/>
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