import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Course.css';

class Course extends Component{
  constructor(props){
    super();
    this.state = {
      code : props.code,
      type: props.type
    };
  }
  render(){
    return (
      <div 
        className={this.props.type == "required" ? "course-required" : "course-elective"}
        draggable
        onDragStart={(e) => this.props.onDragStart(e,this.state.code)}>
        <h5 className="course-code">{this.state.code}</h5>
      </div>
    );
  }
}

Course.propTypes = {
  code: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onDragStart: PropTypes.func.isRequired
};

export default Course;