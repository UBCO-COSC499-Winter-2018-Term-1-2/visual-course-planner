import React , {Component} from 'react';
import './ScrollButton.css';
import PropTypes from 'prop-types';

class ScrollButton extends Component {

  render(){
    return(
      <button 
        className = {this.props.direction == "left" ? "left" : "right" }
        onClick = {() => {this.props.scrollClick(this.props.direction);}}
        onMouseOver = {this.props.onMouseOver}>
        
        {this.props.direction === "left" ? "<" : ">"}
      
      </button>
    );
  }
}

ScrollButton.propTypes = {
  direction: PropTypes.string.isRequired,
  scrollItem: PropTypes.object.isRequired,
  scrollClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired
};

export default ScrollButton;