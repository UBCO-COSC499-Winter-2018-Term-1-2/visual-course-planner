import React, { Component } from 'react';
import './AdminPortal.css';
import axios from 'axios';
import StudentInfo from '../StudentInfo/StudentInfo';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ADMIN_COURSE_DOCUMENT = 'courses';
const ADMIN_SPECIALIZATION_DOCUMENT = 'spec';

Modal.setAppElement('#root');
class AdminPortal extends Component {

  state = {
    user: {},
    selectedFile: null, 
    loaded: 0,
    documentType: "courses",
    degrees: [],
    isNewDegree: "false",
    degreeName: "",
    specializationName: "",
    degreeId: 1,
    modalIsOpen: false
  };

  Progress = () => {
    if (this.state.selectedFile) {
      return <p className="file-select-text">{this.state.selectedFile.name} Progress: {Math.round(this.state.loaded, 2) } %</p>;
    } else {
      return <p className="file-select-text">No file selected.</p>;
    }
  }

  submitFile = (e) => {
    e.preventDefault();
    let data = new FormData();

    if (this.state.selectedFile == null) {
      alert("Please select a file.");
      return;
    }

    if (this.state.documentType === ADMIN_SPECIALIZATION_DOCUMENT) {
      // validate degree info
      if (this.state.specializationName === "") {
        alert("Please set a name for this specialization.");
        return;
      } else {
        data.append("specializationName", this.state.specializationName);
      }
      
      data.append("isNewDegree", this.state.isNewDegree);
      
      if (this.state.isNewDegree === "true") {
        if (this.state.degreeName == "") {
          alert("Please set a degree name");
          return;
        } else {
          data.append("degreeName", this.state.degreeName);
        }
      } else {
        data.append("degreeId", this.state.degreeId);
      }
    }

    data.append('file', this.state.selectedFile, this.state.selectedFile.name);
    data.append("documentType", this.state.documentType);
  
    
    axios
      .post('/api/admin/upload', data, {
        onUploadProgress: ProgressEvent => {
          const percentLoaded = ProgressEvent.loaded / ProgressEvent.total * 100;
          this.setState({
            loaded: percentLoaded,
            modalIsOpen: percentLoaded === 100
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

  async getDegrees() {
    let degrees = [];
    try {
      const res = await axios.get('/api/degrees');
      degrees = res.data;
    } catch(err) {
      console.log("Error getting degrees in admin portal: " + err);
    }
 
    return degrees;
  }

  handleDegreeNameChange = (e) => {
    this.setState({
      degreeName: e.target.value
    });
  }

  handleChangeNewDegree = (e) => {
    this.setState({
      isNewDegree: e.target.value
    });
  }


  handleDegreeSelect = (e) => {
    this.setState({
      degreeId: e.target.value
    });
  }

  handleSpecName = (e) => {
    console.log(e.target.value);
    this.setState({
      specializationName: e.target.value
    });
  }

  clearForm = () => {
    this.setState({
      selectedFile: null,
      documentType: "courses"
    });
  }

  closeModal = () => {
    this.clearForm();
    this.setState({modalIsOpen: false});
  }

  componentDidMount = async () => {
    const userResponse = await axios.get('/api/users/' + sessionStorage.getItem('userId'));
    const degrees = await this.getDegrees();

    this.setState({user: userResponse.data, degrees});
  }

  render() {
    const specializationForm = 
      <div className="specialization-form-container">
        <div className="admin-specialization-input">
          <label htmlFor="specialization-name-input">Specialization Name:</label>
          <input type="text" placeholder="e.g. Major in Computer Science" id="specialization-name-input" className="admin-text-input focus-element" onChange={this.handleSpecName}/>
        </div>
        <p>For</p>
        { this.state.degrees.length > 0 && 
        <div className="admin-radio-input">
          <input type="radio" name="isNewDegree" value="false" id="existing-degree-radio" onChange={this.handleChangeNewDegree} checked={this.state.isNewDegree == "false"}/>
          <label htmlFor="existing-degree-radio" className="admin-radio-label">
              Existing degree
          </label>
          <select id="degree-select" className="admin-select-input" onChange={this.handleDegreeSelect}>
            {this.state.degrees.map(s => <option value={s.id} key={s.id}>{s.name}</option>)};
          </select>
          <p>Or</p>
        </div> }
        <div className="admin-radio-input">
          <input type="radio" name="isNewDegree" value="true" id="new-degree-radio" onChange={this.handleChangeNewDegree} checked={this.state.isNewDegree == "true"} />
          <label htmlFor="new-degree-radio" className="admin-radio-label">
              New degree
          </label>
          <input type="text" placeholder="e.g. Bachelor of Science" onChange={this.handleDegreeNameChange} id="new-degree-input" className="admin-text-input focus-element" onFocus={()=> this.setState({isNewDegree: "true"})} />
        </div>
      </div>;

    return (
      <div className="admin-portal-parent-wrapper">
 
        <div className="admin-body-wrapper admin-body-column">
          <h1 className="admin-heading admin-portal-element">Admin Portal</h1>

          <form>
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
                <input type="radio" id="courses" name="document-type" value={ADMIN_COURSE_DOCUMENT}  onChange={this.handleChangeType} checked={this.state.documentType === ADMIN_COURSE_DOCUMENT}/>
                <label id="document-type-courses-label" className="admin-radio-label" htmlFor="courses">Courses Offered</label>
              </div>
              <div className="admin-radio-input">
                <input type="radio" id="degree" name="document-type" value={ADMIN_SPECIALIZATION_DOCUMENT} onChange={this.handleChangeType} checked={this.state.documentType === ADMIN_SPECIALIZATION_DOCUMENT}/>
                <label id="document-type-degree-label" htmlFor="degree" className="admin-radio-label">Specialization Requirements</label>
                {this.state.documentType === ADMIN_SPECIALIZATION_DOCUMENT && specializationForm}
              </div>
            </div>
                    
            <div className="admin-submit-container admin-portal-element">
              <button type="submit" className="submit-file-btn" onClick={this.submitFile}>Upload</button>
              <p className="admin-submit-disclaimer-para">
                Uploaded information affects students&#39; ability to create their course plan.
                It is recommended to keep information up-to-date. 
              </p>
            </div>
          </form>
          
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            className="upload-successful-modal"
            overlayClassName="upload-successful-modal-background"
          >
            <h2>File Upload Successful!</h2>
            <FontAwesomeIcon icon="check" className="modal-icon"/>
            <FontAwesomeIcon icon="times" className="modal-close" onClick={this.closeModal}/>
          </Modal>
           
        </div>
        <div className="admin-body-column sidebar">
          <StudentInfo user={this.state.user} align="right"/>
        </div>

      </div>
    );

  }
}


export default AdminPortal;