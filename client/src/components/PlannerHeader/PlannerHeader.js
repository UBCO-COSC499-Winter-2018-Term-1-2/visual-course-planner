import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlannerHeader.css';

class PlannerHeader extends Component {

  render() {
    return (
      <div className="planner-header-wrapper" id="planner-header">
        {this.props.children}
      </div>
    );
  }
}

PlannerHeader.propTypes = {
  children: PropTypes.object
};

export default PlannerHeader;