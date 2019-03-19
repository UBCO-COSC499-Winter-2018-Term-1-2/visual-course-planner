import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './FavouriteBtn.css';

class FavouriteBtn extends Component {

  render(){
    return(
      <div className="fav-plan-btn-container"  onClick={this.props.onClick}>
        <FontAwesomeIcon
          icon="heart"
          size="2x"
          className= {this.props.isFavourite ? "fav-icon-red" : "fav-icon-grey" }/>
      </div>
    );
  }

}

FavouriteBtn.propTypes = {
  isFavourite: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default FavouriteBtn;