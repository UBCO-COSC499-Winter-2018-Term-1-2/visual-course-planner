import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Course.css';

class Course extends Component{
  render(){
    return (
      <div 
        className={this.props.type == "required" ? "course-required" : "course-elective"}
        draggable
        onDragStart={(e) => this.props.onDragStart(e, this.props.course, this.props.sourceTermId)}>
        <h5 className="course-code">{this.props.course.code}</h5>
      </div>
    );
  }
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  sourceTermId: PropTypes.string,
  onDragStart: PropTypes.func.isRequired
};

export default Course;