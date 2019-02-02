import React from 'react';
import PropTypes from 'prop-types';
import classes from './button.css';


const button = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
);

button.propTypes = {
  disabled: PropTypes.bool,
  btnType: PropTypes.string,
  clicked: PropTypes.func,
  children: PropTypes.string,
};

export default button;