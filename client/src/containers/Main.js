import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faExclamationTriangle, faHeart, faPlus, faPlusCircle, faSignInAlt, faSignOutAlt, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
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

// Font Awesome Icon Imports
library.add(faSignOutAlt,faHeart, faExclamationTriangle, faPlus, faTimes, faTrash, faPlusCircle, faSignInAlt, faCheck);

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
    this.props.history.push('/degree-selection');
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
    if (this.nameTimeoutId) {
      clearTimeout(this.nameTimeoutId);
    }
    this.nameTimeoutId = setTimeout(async () => {
      const nameResponse = await axios.post(`/api/plans/${this.state.currentPlan.id}/name/${this.state.currentPlan.name}`);
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

  componentDidMount = async () => {
    const userId = sessionStorage.getItem("userId");
    const userResponse = await axios.get(`/api/users/${userId}`);
    const user = userResponse.data;
    console.log({"current user": user});
    this.setState({
      user: user
    });
    const planList = await this.getPlanList(userId);
    this.setState({planList: planList});
    if (planList.length > 0) {
      await this.loadPlan(planList[0].id);
    }
  }

  shouldRenderPlan = () => {
    if (Object.keys(this.state.currentPlan).length !== 0) {
      return true;
    }
  }

  newPlan = async () => {
    this.props.history.push('/degree-selection');
  }


  deletePlan = async (id) => {
    await axios.delete(`/api/plans/${id}`);
    const newPlanList = await this.getPlanList(this.state.user.id);
    console.log("New list of plans", newPlanList);

    this.setState({planList: newPlanList});
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
            <FavouriteBtn isFavourite={this.state.currentPlan.isFavourite} onClick={this.toggleFavourite}/>
            <OptimizeBtn click={this.optimizeHandler}/>
            <WarningSummary click={this.showSnackbar} numberOfWarnings={this.state.warnings.length} user={this.state.user} />
            <BackdropButton open={this.openCourseListSidebar} close={this.closeCourseListSidebar} isOpen={this.state.isCourseListOpen} />
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
        {!this.shouldRenderPlan() && <div className="centered">Create a plan to get started!</div>}
      </div>
    );
  }
}

Main.propTypes = {
  history: PropTypes.object
};

export default Main;