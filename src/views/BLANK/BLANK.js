import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../actions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.setUser();
  }

  render() {
    return (
      <div className="animated fadeIn">
        Nothing to see here
      </div>
    )
  }
}

export default connect(null, {setUser})(Dashboard);
