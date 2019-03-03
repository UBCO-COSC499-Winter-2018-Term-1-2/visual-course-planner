import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Term from '../Term/Term';
import './Session.css';

class Session extends Component {

  render() {
    const terms = this.props.terms.map(term => {
      return <Term
        key={term.id}
        termId={term.id}
        title={"Term " + term.number}
        coursesContained={term.courses}
        onCourseDragOver={this.props.onCourseDragOver}
        onCourseDragStart={this.props.onCourseDragStart}
        onCourseDrop={this.props.onCourseDrop}
        removeTerm={this.props.removeTerm}
      />;
    });
    return (
      <div className="session-wrapper" >
        <h4 className="main-column-header">{this.props.session.year + this.props.session.season}</h4>
        <div className="session">
          {terms}
        </div>
      </div>
    );
  }
}

Session.propTypes = {
  session: PropTypes.object.isRequired,
  terms: PropTypes.array.isRequired,
  onCourseDragOver: PropTypes.func.isRequired,
  onCourseDragStart: PropTypes.func.isRequired,
  onCourseDrop: PropTypes.func.isRequired,
  removeTerm: PropTypes.func.isRequired
};

export default Session;