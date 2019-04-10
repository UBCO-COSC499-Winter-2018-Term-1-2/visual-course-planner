import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlanName.css';

class PlanName extends Component {

  // componentDidUpdate() {
  //   if (this.nameInput) {
  //     this.nameInput.focus();
  //   }
  // }

  render() {
    const heading = 
      <input 
        ref={(input) => { this.nameInput = input; }} 
        value={this.props.children}
        type="text"
        onChange={this.props.onChange}
        id="plan-name-heading"
        size={this.props.children.length > 5 ? this.props.children.length : 5}
      />;
    return (
      <div className="plan-name-container">
        {heading}
      </div>
    );
  }
  
}

PlanName.propTypes = {
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  default: PropTypes.string.isRequired
};

export default PlanName;