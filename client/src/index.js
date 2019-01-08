import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Main from './containers/Main';
import Login from './components/Login/LoginInterface';
import CreateAccount from './components/Signup/CreateAccountMenu';
import AdminPortal from "./components/AdminPortal/AdminPortal";
import UserProfile from "./components/UserProfile/profile";
import PreviousCourses from "./components/PreviousCourses/PreviousCourses";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/main" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/create-account" component={CreateAccount} />
      <Route path="/admin" component={AdminPortal} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/course-history" component={PreviousCourses} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
