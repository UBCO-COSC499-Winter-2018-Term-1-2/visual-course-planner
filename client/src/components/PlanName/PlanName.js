import React from 'react';
import PropTypes from 'prop-types';
import './PlanName.css';

const PlanName = (props) => {
  return (
    <h3 id="plan-name-heading"> {props.name} </h3>
  );
};

PlanName.propTypes = {
  name: PropTypes.string.isRequired
};

export default PlanName;