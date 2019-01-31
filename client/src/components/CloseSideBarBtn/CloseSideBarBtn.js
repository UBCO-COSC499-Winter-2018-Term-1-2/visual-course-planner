import React from 'react';
import PropTypes from 'prop-types';
import './CloseSideBarBtn.css';

const CloseSideBarBtn = (props) => {
  return(
    <div className="closebtn-container">
      <button 
        className="close-sidebarbtn sidebar-button"
        onClick={props.click}>
          Close
      </button>
    </div>
  );
};

CloseSideBarBtn.propTypes = {
  click: PropTypes.func
};


export default CloseSideBarBtn;