import React from 'react';
import styling from '../Input/input.css';
import PropTypes from 'prop-types';
//import { config } from '@fortawesome/fontawesome-svg-core';

const input = ( props ) => {
  let inputElement = null;
  let cssInputElement = "input-element";
  let cssInvalid = "invalid";
  let greenTitle = "green-title";
  let warning = "warning-msg";
  let cssSelectItems ="select-items";
  let cssCourseList ="course-list";
  //let emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
  let isEmail = props.name === 'email';
  let isEmailValue = props.value;
  let labelMsg = props.label;
  //let errorString = props.placeholder === 'marioooo';
 

  const inputStyling = [cssInputElement];
  const selectStyling = [cssSelectItems];
  const listStyling = [cssCourseList];
  const labelStyling = [warning];
  const mario = [labelMsg];
  //const  emailVarification =[emailTest];
  //const errorStringMsg = [errorString];
  
  //VALIDATES EMAIL
  function validateEmail (email) {
    //const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(email);
    //regexp.test(email);
  }


  if (props.invalid && props.shouldBeValidated && props.inputElementTouched){
    inputStyling.push(cssInvalid);
    mario.push(labelMsg == "Field cannot be empty" );
    labelStyling.push(warning);
    //`${name} is required and cannot be empty`;
    //console.log("botw is the best game - in my opinion");
    //shouldBeValidated is used if state element has "validation" -- will be used on other pages
  }

  if(isEmail){
    console.log("email value:  " + isEmailValue);
    console.log("validate Email" + validateEmail(isEmailValue));
    
    // emailVarification.push (console.log("orcarina of time is good too"));
    // emailTest.test(props.value);
    // errorStringMsg.push(errorString);
    // `${isEmail} should be a valid email address`;
  }
  
  input.propTypes = {
    invalid: PropTypes.boolean,
    shouldBeValidated: PropTypes.object,
    inputElementTouched: PropTypes.bool,
    elementType: PropTypes.string,
    elementConfig: PropTypes.object,
    value: PropTypes.string,
    changed: PropTypes.func,
    label: PropTypes.string,
    title: PropTypes.string,
  };


  switch ( props.elementType ) {
  case ( 'input' ):
    inputElement = <input
      label={props.title}
      className={inputStyling.join(' ')}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed} />;
    break;

  case ( 'textarea' ):
    inputElement = <textarea
      className={inputStyling.join(' ')}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed} />;
    break;

  case ( 'checkbox' ):
    inputElement = <input
      type="checkbox"
      className={inputStyling.join(' ')}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed} />;
      
    break;

  case ( 'list' ):
    inputElement = ( 
      <li 
        className={listStyling.join(' ')}
        value={props.value}
        onChange={props.changed}>
        {props.elementConfig.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </li>
    );
    break;

  case ( 'select' ):
    inputElement = (
      <select
        className={selectStyling.join(' ')}
        value={props.value}
        onChange={props.changed}>
        {props.elementConfig.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>
    );
    break;
  default:
    inputElement = <input
      className={styling.InputElement}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed} />;
  }

  return (
    <div className={styling.Input}>
      {/* prints labels in the forum + can change css here:: */}
      <label className={greenTitle}>{props.label}</label> 
      {inputElement}
    </div>
  );

};

export default input;