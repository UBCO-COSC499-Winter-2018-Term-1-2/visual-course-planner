import React, { Component } from 'react';
import WarningSummary from '../components/WarningSummary/WarningSummary';
import axios from 'axios';
import PropTypes from 'prop-types';
// import Plan from '../models/Plan';

class WarningContainer extends Component {
  state = {
    warnings: []
  };

  getWarningsForCourse = async (plan, course) => {
    axios
      .get(`/api/courses/${course.id}`)
      .then(res => {
        return res.data.requirements;
      })
      .catch(err => {
        console.error(err);
      });
    // const standing = User.getStanding
    // if (plan.contains(courseReqs)) // also need to make sure they are in the correct semester
    // coreqs vs prereqs
    //    we good
    // else
    //  add warning
    // return list of warnings
  }

  getWarnings = async () => {
    const courseWarnings = this.props.plan.courses.map(function(course) {
      return this.getWarningsForCourse(this.props.plan, course);
    }.bind(this));

    Promise
      .all(courseWarnings)
      .then(warnings => {
        return warnings;
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount = () => {
    this.getWarnings()
      .then(warnings =>
        this.setState({
          warnings: warnings
        })
      )
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <WarningSummary warnings={this.state.warnings} click={this.props.click} />
    );
  }
}

WarningContainer.propTypes = {
  click: PropTypes.func.isRequired,
  plan: PropTypes.object.isRequired
};

export default WarningContainer;