import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import ChangePasswordForm from '../../containers/Forms/ChangePasswordForm/ChangePasswordForm';

class ChangePasswordModal extends Component {
  constructor(props){
  	super(props);
  	this.state = {};
  }

  render() {
    return (
      <Modal toggle={this.props.toggle} isOpen={this.props.isOpen} >
        <ModalHeader toggle={this.props.toggle} >Change Password</ModalHeader>
        <ModalBody>
          <ChangePasswordForm
            closeModal={this.props.toggle}
            formFields={this.props.formFields}
          />
        </ModalBody>
      </Modal>
    );
  }
}

export default ChangePasswordModal;
