import React, { Component } from 'react';
import PlannerArea from '../components/Planner/PlannerArea';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PlanList from '../components/PlanList/PlanList';
import './Main.css';
import NoteArea from '../components/Notes/NoteArea';

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