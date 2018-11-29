import React, { Component } from 'react';
import './AdminPortal.css';

class AdminPortal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "Samantha Jones"
    }
  }

  render() {

    return (
      <div className="admin-portal-parent-wrapper">
                
        <div className="admin-acc-logout-wrapper">
          <div className="admin-acc-logout-container">
            <div className="admin-username-container">
              <p className="username"> User: {this.state.name}</p> {/*use generic username component*/}
            </div>
            <div className="admin-logoutBtn-container">
              <button className="logout-button">Logout</button> {/*use generic logout component button*/}
            </div>
            {/* <CourseListSideBar></CourseListSideBar> */}
          </div>
        </div>
                
        <h1 className="admin-heading">ADMIN PORTAL</h1>
                
        <div className="admin-body-wrapper">

        <form encType="multipart/form-data" method="post">
          <div className="admin-body-description-container admin-portal-element">
            <label className="choose-file-heading">CHOOSE YOUR FILE</label>
            <p className="admin-disclaimer-para">Please make sure file includes all the degree requirements for a specific 
                           and the current offered courses for the current year. 
            </p>
          </div>
                    
          <div className="admin-uploadfile-container admin-portal-element">
            <label id="choose-file-label" htmlFor="choose-file-btn">Choose File</label>
            <input type="file" id="choose-file-btn"/>
          </div>
                   
          <div className="admin-comment-input-container admin-portal-element">
            <textarea className="comments-input" placeholder="Comments..."></textarea>
          </div>
                   
          <div className="admin-submit-container admin-portal-element">
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