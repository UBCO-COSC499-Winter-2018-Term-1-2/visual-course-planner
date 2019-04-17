import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faExclamationTriangle, faHeart, faPlus, faPlusCircle, faSignInAlt, faSignOutAlt, faTimes, faTrash, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BackdropButton from '../components/BackdropButton/BackdropButton';
import FavouriteBtn from '../components/FavouriteBtn/FavouriteBtn';
import NoteArea from '../components/Notes/NoteArea';
import OptimizeBtn from '../components/OptimizeBtn/OptimizeBtn';
import PlanList from '../components/PlanList/PlanList';
import PlanName from '../components/PlanName/PlanName';
import PlannerArea from '../components/Planner/PlannerArea';
import PlannerHeader from '../components/PlannerHeader/PlannerHeader';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import WarningSummary from '../components/WarningSummary/WarningSummary';
import './Main.css';
import Sidebar from './Sidebar';
import SidebarArea from './SidebarArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Font Awesome Icon Imports
library.add(faSignOutAlt,faHeart, faExclamationTriangle, faPlus, faTimes, faTrash, faPlusCircle, faSignInAlt, faCheck, faAngleLeft, faAngleRight);

class Main extends Component {
  state = {
    isCourseListOpen: false,
    showSnackbar : false,
    currentPlan: {},
    user: {
      name: "test",
      standing: 0
    },
    warnings: [],
    planList: [],
    saveTimeout: 1000
  }

  planNameRef = null

  getNextTerm(latestTerm, latestSession) {
    let nextTermNumber;
    let nextTermYear = latestSession.year;
    let nextTermSeason = "W";

    if (latestTerm.number === 1) {
      nextTermNumber = 2;
      nextTermSeason = latestSession.season;
    } else {
      if (latestSession.season == "W") {
        nextTermYear = parseInt(latestSession.year) + 1;
        nextTermSeason = "S";
      }
      nextTermNumber = 1;
    }

    const nextTerm = {
      coursesContained: [],
      year: nextTermYear,
      number: nextTermNumber,
      season: nextTermSeason
    };

    return nextTerm;
  }

  addTermToPlan = async () => {
    // TODO: should be doing most logic in express, not client side
    console.log("Adding term to plan...");
    // set initial session to random one
    const plan = {...this.state.currentPlan};
    let mostRecentSession = {};
    let mostRecentSessionId = {};
    let latestTerm = {};

    if (plan.sessions.allIds.length === 0) {
      mostRecentSession = await axios.get('/api/sessions/current');
      mostRecentSession = mostRecentSession.data;
      console.trace(mostRecentSession);
      plan.sessions.byId[mostRecentSession.id] = mostRecentSession;
      console.log('No sessions found adding current', mostRecentSession);
      plan.sessions.allIds.push(mostRecentSession.id);
      mostRecentSessionId = mostRecentSession.id;
    } else {
      mostRecentSessionId = plan.sessions.allIds[0];
      for (const sessionId in plan.sessions.byId) {
        const currentSession = plan.sessions.byId[sessionId];
        const currentSessionDate = currentSession.year + currentSession.season;
        const mostRecentSession = plan.sessions.byId[mostRecentSessionId];
        console.log(mostRecentSession);
        const mostRecentSessionDate = mostRecentSession.year + mostRecentSession.season;
        console.log(currentSessionDate, mostRecentSessionDate);
        if (currentSessionDate > mostRecentSessionDate) {
          console.log("Earlier");
          mostRecentSessionId = sessionId;
        }
      }
      mostRecentSession = plan.sessions.byId[mostRecentSessionId];
    }
    
    latestTerm = plan.terms.byId[plan.sessions.byId[mostRecentSessionId].terms[plan.sessions.byId[mostRecentSessionId].terms.length - 1]];
    let nextTermInfo = {};
    if (latestTerm) {
      nextTermInfo = this.getNextTerm(latestTerm, mostRecentSession);
    } else {
      nextTermInfo.coursesContained = [];
      nextTermInfo.year = mostRecentSession.year;
      nextTermInfo.season = mostRecentSession.season;
      nextTermInfo.number = 1;
    }
    console.log("Adding term: ", nextTermInfo);
    let latestSession;
    if (nextTermInfo.year !== mostRecentSession.year || nextTermInfo.season !== mostRecentSession.season) {
      const latestSessionRequest = await axios.get(`/api/sessions?year=${nextTermInfo.year}&season=${nextTermInfo.season}`);
      latestSession = latestSessionRequest.data;
      plan.sessions.byId[latestSession.id] = latestSession;
      console.log('need more session', latestSession);
      plan.sessions.allIds.push(latestSession.id);
    } else {
      latestSession = mostRecentSession;
      latestSession.id = mostRecentSessionId;
      console.log('same session', latestSession);
    }
    console.log({"executing next term request": {latestSession, nextTermInfo}});
    const nextTermRequest = await axios.get(`/api/terms?sessionId=${latestSession.id}&number=${nextTermInfo.number}`);
    const nextTerm = nextTermRequest.data;
    plan.sessions.byId[latestSession.id].terms.push(nextTerm.id);
    plan.terms.byId[nextTerm.id] = nextTerm;
    plan.terms.allIds.push(nextTerm.id);
    axios.post(`/api/plans/${plan.id}/term/${nextTerm.id}`);
    console.log(plan);
    this.updatePlan(plan);
    console.log("Added term to plan");

  }

  openCourseListSidebar = () => {
    this.setState({ isCourseListOpen : true });
  }

  closeCourseListSidebar = () => {
    this.setState({ isCourseListOpen: false });
  }

  optimizeHandler = () => {
    console.log("Optimize button clicked");
    //optimize button logic goes here
  }

  toggleFavourite = async () => {
    this.setState(prevState => {
      return {
        ...prevState,
        currentPlan: {
          ...prevState.currentPlan,
          isFavourite: !prevState.currentPlan.isFavourite
        }
      };
    }, async () => {
      const favResponse = await axios.post(`/api/plans/${this.state.currentPlan.id}/user/${this.state.user.id}/favourite/${+ this.state.currentPlan.isFavourite}`);
      if (favResponse.status === 200) {
        const newPlanList = await this.getPlanList(this.state.user.id);
        console.log("Favourited plan, retrieving new list of plans", newPlanList);
    
        this.setState({planList: newPlanList});
      }
      
    });

    
  }

  createPlanHandler = () => {
    this.props.history.push('/new');
  }

  updateWarnings = async () => {
    let warnings = [];
    try {
      const response = await axios.post('api/warnings', 
        {
          plan: this.state.currentPlan,
          user: this.state.user
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      warnings = response.data;
    } catch(err) {
      console.log(err);
    }

    console.log("setting warnings", warnings);
    this.setState({warnings: warnings});
  }

  updatePlan = (plan) => {
    console.log({message: "Updating plan",
      "old plan": this.state.currentPlan,
      "new plan": plan});
    this.setState({ currentPlan: plan }, this.updateWarnings);
  }

  nameTimeoutId
  onNameChange = (e) => {
    let name = e.target.value;
    if (!name) {
      name = '';
    }
    this.setState(prevState => {
      return {
        ...prevState,
        currentPlan: {
          ...prevState.currentPlan,
          name: name
        }
      };
    });
    if (this.nameTimeoutId) {
      clearTimeout(this.nameTimeoutId);
    }
    this.nameTimeoutId = setTimeout(async () => {
      const nameResponse = await axios.post(`/api/plans/${this.state.currentPlan.id}/name`, {name: this.state.currentPlan.name});
      if (nameResponse.status === 200) {
        const newPlanList = await this.getPlanList(this.state.user.id);
        console.log("Renamed plan, retrieving new list of plans", newPlanList);
    
        this.setState({planList: newPlanList});
      }
    }, this.state.saveTimeout);
    
  }

  descTimeoutId
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

    if (this.descTimeoutId) {
      clearTimeout(this.descTimeoutId);
    }
    this.descTimeoutId = setTimeout(async () => {
      await axios.post(`/api/plans/${this.state.currentPlan.id}/description`, {desc: this.state.currentPlan.description});
    });
  }

  showSnackbar = () => {
    this.setState({ showSnackbar: true });
  }

  closeSnackbar = () => {
    this.setState({ showSnackbar: false });
  }

  savePlan = async () => {
    if (this.shouldRenderPlan()) {
      console.log({"Saving current plan = ": this.state.currentPlan} );
      const response = await axios.post(`/api/plans/${this.state.currentPlan.id}/save`, {plan: this.state.currentPlan});
      console.log(response.data);
    }
  }

  loadPlan = async (planId) => {
    console.log(planId);
    const response = await axios.get(`/api/plans/${planId}`);
    const plan = response.data;
    console.log("loading plan", plan);
    if (plan) {
      this.setState({currentPlan: plan});
    }
  }

  getPlanList = async (userId) => {
    const planResponse = await axios.get(`/api/plans/user/${userId}`);
    const plans = planResponse.data;
    return plans;
  }

  componentWillMount = async () => {
    const userId = sessionStorage.getItem("userId");
    const userResponse = await axios.get(`/api/users/${userId}`);
    const user = userResponse.data;
    console.log({"current user": user});
    this.setState({
      user: user
    });
    const planList = await this.getPlanList(userId);
    this.setState({planList: planList});
    if (this.props.history.location.state && this.props.history.location.state.newPlan) {
      console.log("loading new plan");
      this.loadPlan(this.props.history.location.state.newPlan);
    } else {
      if (planList.length > 0) {
        await this.loadPlan(planList[0].id);
      }
    }

  }

  shouldRenderPlan = () => {
    if (Object.keys(this.state.currentPlan).length !== 0) {
      return true;
    }
  }

  newPlan = async () => {
    this.props.history.push('/new');
  }


  deletePlan = async (id) => {
    await axios.delete(`/api/plans/${id}`);
    const newPlanList = await this.getPlanList(this.state.user.id);
    console.log("New list of plans", newPlanList);

    this.setState({planList: newPlanList}, async () => {
      if (this.state.planList.length > 0) {
        await this.loadPlan(this.state.planList[0].id);
      }
    });
  }
  
  render() {
    return (
      <div id="main">
        <Sidebar>
          <SidebarArea>
            <StudentInfo user={this.state.user}/>
          </SidebarArea>
          <SidebarArea>
            <PlanList plans={this.state.planList} loadPlan={this.loadPlan} newPlan={this.newPlan} deletePlan={this.deletePlan}/>
          </SidebarArea>
          {this.shouldRenderPlan() && 
            <SidebarArea>
              <NoteArea onChange={this.onDescriptionChange}>{this.state.currentPlan.description}</NoteArea>
            </SidebarArea>}
        </Sidebar>
        
        {this.shouldRenderPlan() &&
          <PlannerHeader onTitleChange={this.onNameChange} title={this.state.currentPlan.name}>
            <PlanName onChange={this.onNameChange}>{this.state.currentPlan.name}</PlanName>
            <div className="planner-header-wrapper" >
              <FavouriteBtn isFavourite={this.state.currentPlan.isFavourite} onClick={this.toggleFavourite}/>
              <OptimizeBtn click={this.optimizeHandler}/>
              <WarningSummary click={this.showSnackbar} numberOfWarnings={this.state.warnings.length} user={this.state.user} />
              <BackdropButton open={this.openCourseListSidebar} close={this.closeCourseListSidebar} isOpen={this.state.isCourseListOpen} />
              <button className='add-term' onClick={() => {this.addTermToPlan(this.scrollToRight);}}>
                <FontAwesomeIcon icon="plus-circle" />
                Add term
              </button>
            </div>
          </PlannerHeader>}
        {this.shouldRenderPlan() &&
          <PlannerArea
            isCourseListOpen={this.state.isCourseListOpen}
            closeCourseList={this.closeCourseListSidebar}
            plan={this.state.currentPlan}
            user={this.state.user}
            updatePlan={this.updatePlan}
            showSnackbar={this.state.showSnackbar}
            closeSnackbar={this.closeSnackbar}
            warnings={this.state.warnings}
          />}
        {!this.shouldRenderPlan() && <div className="cente`re`d">Create a plan to get started!</div>}
      </div>
    );
  }
}

Main.propTypes = {
  history: PropTypes.object
};

export default Main;