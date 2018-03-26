import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AlertList } from "react-bs-notifier";
import { createAlert, dismissAlert } from '../../actions';

class IventoryAlert extends Component {
  render() {
    return (
      <AlertList
        position="top-right"
        alerts={this.props.alerts}
        timeout={2000}
        dismissTitle=""
        onDismiss={this.props.dismissAlert}
      />
    );
  }
}

function mapStateToProps({alerts}) {
  return {alerts};
}

export default connect(mapStateToProps, {createAlert, dismissAlert})(IventoryAlert);
