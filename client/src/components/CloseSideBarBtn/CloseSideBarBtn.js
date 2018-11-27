import React from 'react';
import './CloseSideBarBtn.css';

const CloseSideBarBtn = (props) => {
    return(
        <div className="closebtn-container">
            <button 
                className="close-sidebarbtn"
                onClick={props.click}>
                 Close
            </button>
        </div>
    );
}

export default CloseSideBarBtn;