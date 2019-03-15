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
        id={this.state.code.split(" ").join("")}
        className={this.props.type == "required" ? "course-required" : "course-elective"}
        draggable
        onDragStart={(e) => this.props.onDragStart(e, this.state.code, this.props.sourceTerm)}
        ref={this.props.courseRef}
        onClick={(e) => this.props.showXY(e, this.props.courseRef)}>
        <h5 className="course-code">{this.state.code}</h5>
      </div>
    );
  }
}

Course.propTypes = {
  code: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  sourceTerm: PropTypes.string.isRequired,
  onDragStart: PropTypes.func.isRequired,
  courseRef: PropTypes.object.isRequired,
  showXY: PropTypes.func.isRequired
};

export default Course;