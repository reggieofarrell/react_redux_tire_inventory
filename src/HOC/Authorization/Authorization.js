import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent, allowedRoles) {
  class Authentication extends Component {
    componentWillMount() {
      if (!allowedRoles.includes(this.props.role)) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props}/>
    }
  }

  function mapStateToProps({user}) {
    return {role: user.data.Role}
  }

  return connect(mapStateToProps)(Authentication);
}
