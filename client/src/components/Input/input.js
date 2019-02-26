import React from 'react';
import styling from '../Input/input.css';
import PropTypes from 'prop-types';
//import { config } from '@fortawesome/fontawesome-svg-core';

const input = ( props ) => {
  let inputElement = null;
  let cssInputElement = "input-element";
  let cssInvalid = "invalid";
  let greenTitle = "green-title";
  let cssSelectItems ="select-items";
  let cssCourseList ="course-list";
  
  //let cssHideErrors = 'warning-msg';

  const inputStyling = [cssInputElement];
  const selectStyling = [cssSelectItems];
  const listStyling = [cssCourseList];
  // const errorStyling = [cssHideErrors];
  
  //IF A FORMELEMENT IS LEFT EMPTY = ERRORS PRESENTED
  if (props.invalid && props.shouldBeValidated && props.inputElementTouched){
    inputStyling.push(cssInvalid);
    //errorStyling.push(cssErrorMsg)    
  }
 
  
  input.propTypes = {
    invalid: PropTypes.bool,
    shouldBeValidated: PropTypes.bool,
    inputElementTouched: PropTypes.bool,
    elementType: PropTypes.string,
    elementConfig: PropTypes.object,
    value: PropTypes.string,
    changed: PropTypes.func,
    label: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string
  };


  switch ( props.elementType ) {
  case ( 'input' ):
    inputElement = <input
      label={props.title}
      className={inputStyling.join(' ')}
      {...props.elementConfig}
      value={props.value}
      name={props.id}
      id={props.id}
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
    // case ( 'listErrors' ):
    //   inputElement = ( 
    //     <ul 
    //       className={errorStyling.join(' ')}
    //       value={props.value}
    //       onChange={props.changed}>
    //       {props.elementConfig.errors.map(option => (
    //         <li key={option.value} value={option.value}>
    //           {option.displayValue}
    //         </li>
    //       ))}
    //     </ul>
    //   );
    //   break;

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