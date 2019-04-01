import React, { Component } from 'react';
import './NewPlan.css';
import Input from '../Input/Input';
import PropTypes from 'prop-types';
import axios from 'axios';

class NewPlanInterface extends Component {

  //FORM INITIAL SETUP ::
  state = {
    form: {
      degree: {
        elementType: 'select',
        elementConfig: {
          options:[
            {value: '', displayValue: 'Choose degree'},
          ]
        },
        validation: {
          required: true
        },
        label: 'DESIRED DEGREE',
        value: '',
        valid: true,
        inputElementTouched: false 
      },
      specialization: {
        elementType: 'select',
        elementConfig: {
          options:[
            {value: '', displayValue: 'Choose major'},
          ]
        },
        validation: {
          required: true
        },
        label: 'SPECIALIZATION',
        value: '',
        valid: true,
        inputElementTouched: false 
      },
      
    
    }, //end of profile menu
    formIsValid: false,
    loading: false,
    // selectedDegrees: []
  }
  
  checkValidity(value, rules) {
    let isValid = true;
  
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }
  
    return isValid;
  }

  
  //THIS COPIES THE (DEFAULT) LOGIN MENU, CREATES A 'NEW' ONE WITH VALUES THE USER INSERTED 
  //IE. EMAIL AND PASSWORD.
  inputChangeHandler = (event, inputIdentifier) => {
    console.log(event.target.value); //prints values to console
    const updatedDegreeYear = {
      ...this.state.form
    };
    const updatedMenuElement = { 
      ...updatedDegreeYear[inputIdentifier]
    };
    updatedMenuElement.value = event.target.value;
    //CHECKS IF EACH STATE HAS A VALUE
    updatedMenuElement.valid = this.checkValidity(updatedMenuElement.value, updatedMenuElement.validation);
    updatedMenuElement.inputElementTouched = true;
    updatedDegreeYear[inputIdentifier] = updatedMenuElement;
    
    let formIsValid = true;
    for (let inputIdentifier in updatedDegreeYear){
      formIsValid = updatedDegreeYear[inputIdentifier].valid && formIsValid;
    }
    this.setState({form: updatedDegreeYear, formIsValid: formIsValid});
    
  }

  getDegrees = async () => {
    return await axios.get('/api/degrees')
      .then(response => { return response.data; })
      .catch(error => {
        console.error(error);
        return [];
      });
  }

  getSpecializations = async (degreeId) => {
    let specializations = [];
    if (degreeId !== '') {
      console.log("Getting specializations for : " + degreeId);
      specializations = await axios.get('/api/specializations/' + degreeId)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          console.error(err);
          return [];
        });
    }
    
    return specializations;
  }

  submitDegreeInformation = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('userId');
    const formData = new FormData();
    for (let formElementIdentifier in this.state.form) {
      formData.append(formElementIdentifier, this.state.form[formElementIdentifier].value);
    }
    formData.append("userId", userId);
    formData.append("specializationId", this.state.form.specialization.value);
    console.log({"submitting info": formData});

    const planId = await axios.post(`/api/plans/new`, formData)
      .then(response => {
        return response.data.insertId;
      })
      .catch(error => {
        console.log(error);
      });

    this.props.history.push({ pathname: '/main', state: { newPlan: planId }});
  }

  componentWillUpdate =  async (nextProps, nextState) => {
    console.log({msg: "ComponentWillUpdate", currentState:this.state ,nextState: nextState});
    if (nextState.form.degree.value !== this.state.form.degree.value) {
      console.log(`1Need to update specs, degrees are diff: ${this.state.form.degree.value} -> ${nextState.form.degree.value}`, specializations);

      let specializations = await this.getSpecializations(nextState.form.degree.value);
      console.log(`2Need to update specs, degrees are diff: ${this.state.form.degree.value} -> ${nextState.form.degree.value}`, specializations);
      specializations = specializations.map(specialization => { return { value: specialization.id, displayValue: specialization.name};});
      console.log(`3Need to update specs, degrees are diff: ${this.state.form.degree.value} -> ${nextState.form.degree.value}`, specializations);

      this.setState({
        ...nextState,
        form: {
          ...nextState.form,
          
          specialization: {
            ...nextState.form.specialization,
            elementConfig: {
              options: [
                { value: '', displayValue: "Choose major" },
                ...specializations
              ]
            },
            value: ''
          }
        }
      });
    }
  }

  componentDidMount = async () => {
    console.log("ComponentDidMount");
    let degrees = await this.getDegrees();
    degrees = degrees.map(degree => { return { value: degree.id, displayValue: degree.name};});

    this.setState(prevState => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          degree: {
            ...prevState.form.degree,
            elementConfig: {
              options: [
                { value: '', displayValue: "Choose degree" },
                ...degrees
              ]
            }
          }
        }
      };	
    });
  }

  render(){
    const formElementsArray = [];
    for (let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
      });
    }

    const form = (
      <form onSubmit={this.submitDegreeInformation}>
        {formElementsArray.map(formElement => (
          <Input 
            label={formElement.config.label}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid} //config is referring to all elements next to a state (ie. email validation, valid, type etc)
            shouldBeValidated={formElement.config.validation.required}
            inputElementTouched={formElement.config.inputElementTouched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)} />
        ))}

        <div className="btn-div">
          <button type="submit" className="green-borderbtn" disabled={!this.state.formIsValid}>Submit</button> 
        </div>

      </form>
    );

    return(
      <div>
        <div className="degree-year-menu">
          <h1 className="yellow-title">Degree Selection </h1>
          <label className="green-title">Select All That Apply</label>
          
          <p className="msg-text">
          Please select your desired degree you wish to enroll in at the Univeristy of British Columbia Okanagan Campus.
          </p>

          {form} 
          
        </div> 
      </div>
    );
  }
}

NewPlanInterface.propTypes = {
  history: PropTypes.object.isRequired
};
    
  
export default NewPlanInterface;
