import React, { Component } from 'react';

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
            <button id="fav-plan-btn" onClick={this.toggleFavouriteHandler}>
                {/*<FontAwesomeIcon icon="fas fa-heart" />*/}
                {this.state.isFavourite ? <p>It is Favourite</p> : <p>It is Not Favourite</p>}
            </button>
        );
    }
    
}

export default FavouriteBtn;