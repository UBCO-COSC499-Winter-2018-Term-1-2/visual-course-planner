import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FavouriteBtn extends Component {
    constructor(props){
        super(props);
        this.state = {
          isFavourite: props.favourite
        };
      };

    toggleFavouriteHandler = () =>{
        const isFavourite = this.state.isFavourite;
        this.setState({isFavourite: !isFavourite});
        //will need more functionality here
      }

    render(){
        return(
            <button className="fav-icon-container" onClick={this.toggleFavouriteHandler}>
                
                {this.state.isFavourite ? <FontAwesomeIcon icon="fas fa-heart" /> :<FontAwesomeIcon icon="far fa-heart" />}
            </button>
        );
    }
    
}

export default FavouriteBtn;