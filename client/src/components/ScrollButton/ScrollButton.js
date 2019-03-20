import React , {Component} from 'react';
import './ScrollButton.css';
import PropTypes from 'prop-types';

class ScrollButton extends Component {

  render(){
    return(
      <button 
        className = {this.props.direction == "left" ? "left" : "right" }
        onClick = {(e) => this.props.onClick(e, this.props.scrollItem, this.props.direction)}>
        
        {this.props.direction === "left" ? "<" : ">"}
      
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