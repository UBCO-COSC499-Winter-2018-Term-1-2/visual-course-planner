import React, { Component } from 'react';
import './AdminPortal.css';
import axios from 'axios';

class AdminPortal extends Component {

  state = {
    name: "Samantha Jones",
    selectedFile: null, 
    loaded: 0,
    documentType: "courses"
  };

  Progress = () => {
    if (this.state.selectedFile) {
      return <p className="file-select-text">{this.state.selectedFile.name} Progress: {Math.round(this.state.loaded, 2) } %</p>;
    } else {
      return <p className="file-select-text">No file selected.</p>;
    }
  }

  handleUpload = () => {
    let data = new FormData();
    data.append('file', this.state.selectedFile, this.state.selectedFile.name);
    data.append("documentType", this.state.documentType);
    axios
      .post('/api/admin/upload', data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
          });
        }
      })
      .then(res => {
        console.log(res.statusText);
      });
  }

  handleSelectedFile = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0
    });
  }

  handleChangeType = (e) => {
    this.setState({
      documentType: e.target.value
    });
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
                
        <h1 className="admin-heading admin-portal-element">Admin Portal</h1>
                
        <div className="admin-body-wrapper">

          <div className="admin-body-description-container admin-portal-element">
            <label className="choose-file-heading">choose your file</label>
            <p className="admin-disclaimer-para">Please make sure file includes all the degree requirements for a specific 
              and the current offered courses for the current year. 
            </p>
          </div>
                    
          <div className="admin-uploadfile-container admin-portal-element">
            <label id="choose-file-label" htmlFor="choose-file-btn">Choose File</label>
            <input type="file" accept=".csv,text/csv" id="choose-file-btn" onChange={this.handleSelectedFile}/>
            <this.Progress/>
          </div>

          <div className="admin-portal-element">
            <p>Select document type: </p>
            <div className="admin-radio-input">
              <input type="radio" id="courses" name="document-type" value="courses"  onChange={this.handleChangeType} checked={this.state.documentType === 'courses'}/>
              <label id="document-type-courses-label" htmlFor="courses">Courses Offered</label>
            </div>
            <div className="admin-radio-input">
              <input type="radio" id="degree" name="document-type" value="degree" onChange={this.handleChangeType} checked={this.state.documentType === 'degree'}/>
              <label id="document-type-degree-label" htmlFor="degree">Degree Requirements</label>
            </div>
          </div>
                   
          <div className="admin-comment-input-container admin-portal-element">
            <textarea className="comments-input focus-element" placeholder="Comments..."></textarea>
          </div>
                   
          <div className="admin-submit-container admin-portal-element">
            <button className="submit-file-btn" onClick={this.handleUpload}>Upload</button>
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