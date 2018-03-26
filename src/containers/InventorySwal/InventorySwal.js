import React, {Component} from 'react';
import { connect } from 'react-redux';
import { AlertList } from "react-bs-notifier";
import SweetAlert, { swal } from 'react-redux-sweetalert2';

let swalOptions = {
	title: 'Hello!',
	text: 'How you doin?',
	type: 'success'
};


class IventorySwal extends Component {
  render() {
    return (
      <SweetAlert

      />
    );
  }
}

// function mapStateToProps({alerts}) {
//   return {alerts};
// }

export default connect(null, {...swal})(IventorySwal);
