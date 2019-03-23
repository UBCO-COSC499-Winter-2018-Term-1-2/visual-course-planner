import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SidebarArea extends Component {


  render () {


    return (
      <div className="sidebar-info-area">
        {this.props.children}
      </div>
    );
  }

}

SidebarArea.propTypes = {
  children: PropTypes.object
};

export default SidebarArea;