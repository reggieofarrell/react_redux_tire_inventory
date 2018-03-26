import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class BsTableActionsDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleEditRecordModal = this.toggleEditRecordModal.bind(this);
    this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleEditRecordModal() {
    console.log('toggleEditRecordModal row', this.props.record);
    this.props.setRecord(this.props.record);
    this.props.toggleEdit();
  }

  handleDeleteRecord() {
    this.props.deleteRecord(this.props.record.recid);
  }

  render() {
    return (
      <ButtonDropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          <i className="fa fa-cog"></i>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.toggleEditRecordModal}>
            Edit / View
          </DropdownItem>
          <DropdownItem onClick={this.handleDeleteRecord}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
