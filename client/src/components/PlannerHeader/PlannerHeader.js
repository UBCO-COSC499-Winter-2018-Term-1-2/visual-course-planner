import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlanName from '../PlanName/PlanName';
import './PlannerHeader.css';

class PlannerHeader extends Component {

  render() {
    return (
      <div id="planner-header">
        <PlanName onChange={this.props.onTitleChange}>{this.props.title}</PlanName>
        <div className="planner-header-wrapper" >
          {this.props.children}
        </div>
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