import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Main from './containers/Main';
import Login from './components/Login/LoginInterface';
import Signup from './components/Signup/SignupInterface';
import AdminPortal from "./components/AdminPortal/AdminPortal";
import UserProfile from "./components/UserProfile/profile";
import PreviousCourses from "./components/PreviousCourses/PreviousCourses";
import DegreeYear from "./components/DegreeYear/DegreeYear";

const protectedComponent = (component) => {
  console.log("checking auth");
  if (sessionStorage.getItem("userId")) {
    return component;
  }
  return <Redirect to='/login'/>;
};

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/main" render={(props) => protectedComponent(<Main {...props}/>)} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/admin" render={(props) => protectedComponent(<AdminPortal {...props}/>)} />
      <Route path="/profile" render={(props) => protectedComponent(<UserProfile {...props}/>)} />
      <Route path="/course-history" render={(props) => protectedComponent(<PreviousCourses {...props}/>)} />
      <Route path="/degree-selection" render={(props) => protectedComponent(<DegreeYear {...props}/>)} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
