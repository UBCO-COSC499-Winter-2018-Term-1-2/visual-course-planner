import React from 'react';
import styling from '../Input/input.css';
import PropTypes from 'prop-types';

const input = ( props ) => {
  let inputElement = null;
  let cssInputElement = "input-element";
  let cssInvalid = "invalid";
  let greenTitle = "green-title";
  let cssSelectItems ="select-items";
  let cssCourseList ="course-list";
 

  const inputStyling = [cssInputElement];
  const selectStyling = [cssSelectItems];
  const listStyling = [cssCourseList];
  // const labelStyling = [cssLabel];
  

  if (props.invalid && props.shouldBeValidated && props.inputElementTouched){
    inputStyling.push(cssInvalid);
    //shouldBeValidated is used if state element has "validation" -- will be used on other pages
  }
  
  input.propTypes = {
    invalid: PropTypes.input,
    shouldBeValidated: PropTypes.string,
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

  case ( 'text' ):
    inputElement = <p
      className={inputStyling.join(' ')}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed} 
    />;
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