import React from 'react';
import './PlanName.css';

const PlanName = (props) => {
    return (
        <h3 id="plan-name-heading"> {props.name} </h3>
    );
}

export default PlanName;