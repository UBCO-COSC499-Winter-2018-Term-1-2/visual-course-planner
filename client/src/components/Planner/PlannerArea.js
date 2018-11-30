import React, { Component } from 'react';
import PlannerHeader from '../PlannerHeader/PlannerHeader'


class PlannerArea extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <div id="planner-area">
        <div id="session-container">
          <PlannerHeader toggleSidebar={this.props.toggleSidebar}/>
          {/*<p>Planner Container</p>*/}
        </div>
      </div>
    );
  }
}

export default PlannerArea;