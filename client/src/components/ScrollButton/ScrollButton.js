import React , {Component} from 'react';
import './ScrollButton.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ScrollButton extends Component {

  render(){
    return(
      <button 
        className = {this.props.direction == "left" ? "scroll left" : "scroll right" }
        onClick = {() => {this.props.scrollClick(this.props.direction);}}>
        
        {this.props.direction === "left" ? <FontAwesomeIcon icon="angle-left" /> : <FontAwesomeIcon icon="angle-right"/>}
      
      </button>
    );
  }
}

ScrollButton.propTypes = {
  direction: PropTypes.string.isRequired,
  scrollItem: PropTypes.object.isRequired,
  scrollClick: PropTypes.func.isRequired
};

export default ScrollButton;