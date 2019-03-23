import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Sidebar extends Component {


  render () {


    return (
      <div className="sidebar">
        {this.props.children}
      </div>
    );
  }

}

Sidebar.propTypes = {
  children: PropTypes.array
};

export default Sidebar;