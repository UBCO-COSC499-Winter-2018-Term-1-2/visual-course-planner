import React from 'react';
import './OptimizeBtn.css';
import PropTypes from 'prop-types';

const OptimizeBtn = (props) => {
    
  return(
    <div className="optimizeBtn-container">
      <button id="optimize-btn" onClick={props.click}> Optimize </button>
    </div>
  );
};

OptimizeBtn.propTypes = {
  click: PropTypes.func.isRequired
};

export default OptimizeBtn;