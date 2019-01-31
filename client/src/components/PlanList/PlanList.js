import React, { Component } from 'react';


class PlannerList extends Component {
  constructor(props){
    super(props);
    this.state = {
      favourites: ["BA Major in Comp Sci"],
      plans: ["BSc Major in Comp Sci"]
    };
  }


  render() {
    const listFavourites = this.state.favourites.map((name) => <li key={name}>{name}</li>);
    const listPlans = this.state.plans.map((name) => <li key={name}>{name}</li>);
    return (
      <div id="plan-list">
        <div className="sidebar-info-area">
          <h3 className="sidebar-header">DEGREE PLANS</h3>
          <h4 className="sidebar-header">Favourites</h4>
          <ul>
            {listFavourites}
          </ul>
          <h4 className="sidebar-header">Plans</h4>
          <ul>
            {listPlans}
          </ul>
        </div>
      </div>
    );
  }
}

export default PlannerList;