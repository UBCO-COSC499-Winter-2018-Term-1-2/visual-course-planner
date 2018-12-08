import React, { Component } from 'react';

class NoteArea extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: "Great plan"
    };
  }

  render() {
    return (
      <div id="note-area">
        <div className="sidebar-info-area-end">
          <h3 className="sidebar-header">NOTES</h3>
          <textarea className="notes-text-area focus-element">{this.state.notes}</textarea>
        </div>
      </div>
    );
  }
}

export default NoteArea;