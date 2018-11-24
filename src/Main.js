import React, { Component } from 'react';
import PlannerArea from './PlannerArea';
import StudentInfo from './StudentInfo';
import PlanList from './PlanList';
import './Main.css';
import NoteArea from './NoteArea';

class Main extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <div id="main">
        <StudentInfo/>
        <PlanList/>
        <NoteArea/>
        <PlannerArea/>
      </div>
    );
  }
}

export default Main;