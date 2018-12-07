import React from 'react';
import styling from '../Login/LoginInterface.css';

const input = ( props ) => {
  let inputElement = null;
  let cssInputElement = "InputElement";
  let cssInvalid = "Invalid";

  const inputStyling = [cssInputElement];

  if (props.invalid && props.shouldBeValidated && props.inputElementTouched){
    inputStyling.push(cssInvalid);
    //shouldBeValidated is used if state element has "validation" -- will be used on other pages
  }

  switch ( props.elementType ) {
  case ( 'input' ):
    inputElement = <input
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
  case ( 'select' ):
    inputElement = (
      <select
        className={inputStyling.join(' ')}
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
      <label className={styling.Label}>{props.label}</label>
      {inputElement}
    </div>
  );

};

export default input;