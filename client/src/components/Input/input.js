import React from 'react';
// import styling from '../Login/LoginInterface.css';
import styling from '../Input/input.css';

const input = ( props ) => {
  let inputElement = null;
  let cssInputElement = "input-element";
  let cssInvalid = "invalid";
  let greenTitle = "green-title";
  let cssSelectItems ="select-items";
 

  const inputStyling = [cssInputElement];
  const selectStyling = [cssSelectItems];
  // const labelStyling = [cssLabel];
  

  if (props.invalid && props.shouldBeValidated && props.inputElementTouched){
    inputStyling.push(cssInvalid);
    //shouldBeValidated is used if state element has "validation" -- will be used on other pages
  }
  
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

    // case ( 'label' ):
    //   inputElement = <a 
    //     className={greenTitle}>
    //   </a>;
    //   break;

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