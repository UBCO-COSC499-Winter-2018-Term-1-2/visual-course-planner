import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NoteArea extends Component {
  render() {
    return (
      <div id="note-area">
        <h3 className="sidebar-header">Notes</h3>
        <textarea className="notes-text-area focus-element" onChange={this.props.onChange} value={this.props.children}></textarea>
      </div>
    );
  }
}

NoteArea.propTypes = {
  children: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default NoteArea;