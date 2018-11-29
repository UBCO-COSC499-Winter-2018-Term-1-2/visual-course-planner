import React, { Component } from 'react';
import './AdminPortal.css';

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
            {/* <CourseListSideBar></CourseListSideBar> */}
          </div>
        </div>
                
        <h1 className="admin-heading"> ADMIN PORTAL</h1>
                
        <div className="admin-body-wrapper">

        <form enctype="multipart/form-data" method="post">
          <div className="admin-body-description-container">
            <label className="choose-file-heading">CHOOSE YOUR FILE</label>
            <p className="admin-disclaimer-para">Please make sure file includes all the degree requirements for a specific 
                           and the current offered courses for the current year. 
            </p>
          </div>
                    
          <div className="admin-uploadfile-container">
            <label id="choose-file-label" for="choose-file-btn">Choose File</label>
            <input type="file" id="choose-file-btn"/>
          </div>
                   
          <div className="admin-comment-input-container">
            <textarea className="comments-input" placeholder="Comments..."></textarea>
          </div>
                   
          <div className="admin-submit-container">
            <button className="submit-file-btn">Submit</button>
            <p className="admin-submit-disclaimer-para">
            Uploaded information affects students&#39; ability to create their course plan.
            It is recommended to keep information up to date. 
            </p>
          </div>
        </form>
  
        </div>
      </div>
    );

  }
}

export default AdminPortal;