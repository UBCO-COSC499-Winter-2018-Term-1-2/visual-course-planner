import React , {Component} from 'react';
import './ScrollButton.css';
import PropTypes from 'prop-types';

class ScrollButton extends Component {
  
  constructor(props){
    super();
    this.direction = props.direction;
    this.scrollItem = props.scrollItem;
    this.onclickHandler = props.onClick;

  }

  render(){
    return(
      <button 
        className = {this.direction == "left" ? "left" : "right" }
        scrollItem = {this.scrollItem}
        onClick = {(e) => this.onclickHandler(e, this.scrollItem, this.direction)}>
        
        {this.direction == "left" ? "<" : ">"}
      
      </button>
    );
  }
}

ScrollButton.propTypes = {
  direction: PropTypes.string.isRequired,
  scrollItem: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ScrollButton;