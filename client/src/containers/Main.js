import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PlannerArea from '../components/Planner/PlannerArea';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PlanList from '../components/PlanList/PlanList';
import './Main.css';
import NoteArea from '../components/Notes/NoteArea';
import { library } from '@fortawesome/fontawesome-svg-core';
import PlannerHeader from '../components/PlannerHeader/PlannerHeader';
import { faSignOutAlt, faHeart, faExclamationTriangle, faPlus, faTimes, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// Font Awesome Icon Imports
library.add(faSignOutAlt,faHeart, faExclamationTriangle, faPlus, faTimes, faTrash, faPlusCircle);

class Main extends Component {
  state = {
    isCourseListOpen: false,
    showSnackbar : false,
    currentPlan: {
      sessions: {
        byId: {
          "1": {
            year: "2018",
            season: "W",
            terms: [ "1" ]
          }
        },
        allIds: [ "1" ]
      },
      terms: {
        byId: {
          "1": {
            session: "1",
            number: 1,
            courses: [ "100" ]
          }
        },
        allIds: [ "1" ]
      },
      courses: {
        byId: {
          "100": {
            code: "COSC 222",
            standingRequirement: 2,
            term: "0",
            coRequisites: [],
            preRequisites: []
          }
        },
        allIds: [ "100" ]
      },
      id: 0,
      name: "My Plan",
      specialization: {
        id: 1,
        name: "Major in Computer Science"
      },
      description: ""
    },
    user: {
      name: "Leonardo",
      yearStanding: 1
    },
    warnings: []
  }

  openCourseListSidebar = () => {
    this.setState({ isCourseListOpen : true });
  }

  closeCourseListSidebar = () => {
    this.setState({ isCourseListOpen: false });
  };

  optimizeHandler = () => {
    console.log("Optimize button clicked");
    //optimize button logic goes here
  }

  createPlanHandler = () => {
    this.props.history.push('/degree-year-selection');
  }

  setNumberOfWarnings = (number) => {
    this.setState({numberOfWarnings: number});
  }

  setWarnings = (warnings) => {
    this.setState({
      warnings: warnings
    });
  }

  updatePlan = (plan) => {
    this.setState({ currentPlan: plan });
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        currentPlan: {
          ...prevState.currentPlan,
          name: name
        }
      };
    });
  }

  onDescriptionChange = (e) => {
    const desc = e.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        currentPlan: {
          ...prevState.currentPlan,
          description: desc
        }
      };
    });
  }

  showSnackbar = () => {
    this.setState({ showSnackbar: true });
  }

  closeSnackbar = () => {
    this.setState({ showSnackbar: false });
  }

  savePlan = async () => {
    const response = await axios.post(`/api/plans/${this.state.currentPlan.id}/save`, {plan: this.state.currentPlan});
    console.log(response.status);
  }

  componentDidUpdate = async () => {
    await this.savePlan();
  }

  render() {
    return (
      <div id="main">
        <StudentInfo user={this.state.user}/>
        <PlanList/>
        <NoteArea onChange={this.onDescriptionChange}>{this.state.currentPlan.description}</NoteArea>
        <PlannerHeader
          planName={this.state.currentPlan.name}
          openCourseList={this.openCourseListSidebar}
          closeCourseList={this.closeCourseListSidebar}
          isCourseListOpen={this.state.isCourseListOpen}
          optimize={this.optimizeHandler}
          showWarning={this.showSnackbar}
          numberOfWarnings={this.state.warnings.length}
          user={this.state.user}
          onNameChange={this.onNameChange}
        />
        <PlannerArea
          isCourseListOpen={this.state.isCourseListOpen}
          closeCourseList={this.closeCourseListSidebar}
          plan={this.state.currentPlan}
          user={this.state.user}
          updatePlan={this.updatePlan}
          showSnackbar={this.state.showSnackbar}
          closeSnackbar={this.closeSnackbar}
          warnings={this.state.warnings}
          setWarnings={this.setWarnings}
        />    
      </div>
    );
  }
}

Main.propTypes = {
  history: PropTypes.object
};

export default Main;