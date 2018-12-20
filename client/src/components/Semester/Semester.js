import React from 'react';
import PropTypes from 'prop-types';
import './Semester.css';

const Semester = (props) => {
  //term or year divider style attribute
  const Divider = {
    "border-right": "1px solid #b7b7b8"  
  };

  //using this to add a border to the divs to act as a year/term divider
  const isEvenTerm = (props.term % 2 == 0);

  return (
    <div className="semester-container" style={isEvenTerm ? Divider : null}>
      <h3 className="term-heading"> TERM {props.term} </h3>
      <div className="courses-container" style={isEvenTerm ? null: Divider}></div>
    </div>
  );
};

Semester.propTypes = {
  term: PropTypes.number.isRequired
};

export default Semester;