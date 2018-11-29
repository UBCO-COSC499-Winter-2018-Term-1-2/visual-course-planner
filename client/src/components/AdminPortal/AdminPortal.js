import React, { Component } from 'react';
import './AdminPortal.css';
import CourseListSideBar from '../CourseListSideBar/CourseListSideBar';

class AdminPortal extends Component {

  render() {

    return (
      <div className="admin-portal-parent-wrapper">
                
        <div className="admin-acc-logout-wrapper">
          <div className="admin-acc-logout-container">
            <div className="admin-username-container">
              <p className="username"> User: Admin Username</p> {/*use generic username component*/}
            </div>
            <div className="admin-logoutBtn-container">
              <button className="logout-button">Logout</button> {/*use generic logout component button*/}
            </div>
            <CourseListSideBar></CourseListSideBar>
          </div>
        </div>
                
        <div className="admin-heading-container">
          <h1 className="admin-heading"> ADMIN PORTAL</h1>
        </div>
                
        <div className="admin-body-wrapper">
                   
          <div className="admin-body-description-container">
            <h4 className="choose-file-heading">CHOOSE YOUR FILE</h4>
            <p className="admin-disclaimer-para">Please make sure file includes all the degree requirements for a specific 
                           and the current offered courses for the current year. 
            </p>
          </div>
                    
          <div className="admin-uploadfile-container">
            <button className="upload-file-btn">Upload File</button>
            <p className="upload-file-status">No file selected (code logic)</p>
          </div>
                   
          <div className="admin-comment-input-container">
            <input type="text" className="comments-input" placeholder="Comments..."></input>
          </div>
                   
          <div className="admin-submit-container">
            <button className="submit-file-btn">Submit</button>
            <p className="admin-submit-disclaimer-para">
                            Uploaded information affects students&#39; ability to create their course plan.
                            It is recommended to keep information up to date. 
            </p>
          </div>
               
        </div>

      </div>
    );

  }
}

export default AdminPortal;