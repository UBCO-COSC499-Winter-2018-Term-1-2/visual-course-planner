import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './WarningSnackbar.css';


function CloseButton() {
  return (
    <div className="closebtn-container">
      <span id="close-snackbar-btn" onClick={this.props.closeSnackbar}> {this.closeIcon} </span>
      <FontAwesomeIcon icon="times"/>;
    </div>
  );
}

function WarningMessageList() {
  return this.state.warnings.map((warning, index) =>
    <div className="warning-message-container" key={index}>
      <h3>{warning.course}</h3>
      <p>{warning.message}</p>
    </div>
  );
}

class WarningSnackbar extends Component {

  state = {
    warnings: this.props.warnings
  }

  render() {
    return (
      <div className={this.props.showSnackbar ? "warning-snackbar-wrapper-show" : "warning-snackbar-wrapper"}>
        
        <CloseButton />
        <WarningMessageList/>
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