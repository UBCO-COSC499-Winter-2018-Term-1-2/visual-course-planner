import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlanName.css';

class PlanName extends Component {
  state = {
    isLabel: true
  }

  convertLabelToInput = () => {
    if (this.state.isLabel) {
      this.setState({isLabel: false});

    }
  }

  convertInputToLabel = () => {
    if (!this.state.isLabel) {
      this.setState({isLabel: true});
    }
  }

  componentDidUpdate() {
    if (this.nameInput) {
      this.nameInput.focus();
    }
  }

  render() {
    const heading = this.state.isLabel ? 
      <h3 id="plan-name-heading"> {this.props.children} </h3> :
      <input 
        ref={(input) => { this.nameInput = input; }} 
        value={this.props.children}
        type="text"
        onChange={this.props.onChange}
        id="plan-name-heading"
        size={this.props.children.length}
      />;
    return (
      <div className="plan-name-container" onBlur={this.convertInputToLabel} onClick={this.convertLabelToInput}>
        {heading}
      </div>
    );
  }
  
}

PlanName.propTypes = {
  children: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default PlanName;