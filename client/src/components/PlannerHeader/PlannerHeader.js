import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlannerHeader.css';

class PlannerHeader extends Component {

  render() {
    return (
      <div id="planner-header">
        {this.props.children}
      </div>
    );
  }
}

PlannerHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  onTitleChange: PropTypes.func
};

export default PlannerHeader;