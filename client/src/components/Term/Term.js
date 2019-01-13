import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Term.css';
import Course from '../Course/Course';

class Term extends Component {
  //term or year divider style attribute
  termDivider = {
    "borderRight": "1px solid #b7b7b8"
  };

  //using this to add a border to the divs to act as a year/term divider
  isEvenTerm = (this.props.term.number % 2 == 0);

  // coursesContained = this.props.coursesContained;
  
  renderCourses = () => {
    return (this.props.coursesContained.map((course) => {
      return (
        <Course
          key={course.code}
          course={course}
          type="required"
          sourceTerm={this.props.term}
          onDragStart={this.props.onCourseDragStart} />
      );
    }
    ));
  }
  render() {
    return (
      <div className="term-container" style={this.isEvenTerm ? this.termDivider : null}>
        <h3 className="term-heading">Term {this.props.term.number}</h3>
        <div
          className="courses-container" style={this.isEvenTerm ? null : this.termDivider}
          onDragOver={this.props.onCourseDragOver}
          onDrop={(e) => this.props.onCourseDrop(e, this.props.term)}>

          <this.renderCourses />

        </div>
      </div>
    );
  }
}

Term.propTypes = {
  term: PropTypes.object.isRequired,
  coursesContained: PropTypes.array.isRequired,
  onCourseDragOver: PropTypes.func.isRequired,
  onCourseDragStart: PropTypes.func.isRequired,
  onCourseDrop: PropTypes.func.isRequired
};

export default Term;