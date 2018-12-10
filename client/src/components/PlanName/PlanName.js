import React from 'react';
import PropTypes from 'prop-types';
import './PlanName.css';

const PlanName = (props) => {
  return (
    <div className="plan-name-container">
      <h3 id="plan-name-heading"> {props.name} </h3>
    </div>
  );
};

PlanName.propTypes = {
  name: PropTypes.string.isRequired
};

export default PlanName;