import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

import NewRecordForm from '../../containers/Forms/NewRecordForm/NewRecordForm';

class NewRecordModal extends Component {
  constructor(props){
  	super(props);
  	this.state = {};
  }

  render() {
    return (
      <Modal size="lg" toggle={this.props.toggle} isOpen={this.props.isOpen} >
        <ModalHeader toggle={this.props.toggle} >{this.props.type} Record</ModalHeader>
        <ModalBody>
          <NewRecordForm
            closeModal={this.props.toggle}
            formFields={this.props.columns}
            selectOptions={this.props.selectOptions}
            addRow={this.props.addRow}
            endpoint={this.props.endpoint}
            type={this.props.type}
            initialValues={this.props.type === 'New' ? null : this.props.defaultValues}
            enableReinitialize
            refreshTable={this.props.refreshTable}
          />
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={this.props.toggle}>Submit</Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>
    );
  }
}

export default NewRecordModal;
