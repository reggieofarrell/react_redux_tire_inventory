import React, {Component} from 'react';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  dropAccnt() {
    return (
      <Dropdown className="user-menu" nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="fa fa-user"></i>
          <span className="ml-2 d-none d-sm-inline-block" >{this.props.user.data.DisplayName || this.props.user.data.Email} </span>
          <i className="ml-2 mr-2 fa fa-angle-down"></i>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
          <NavLink to="/my-account">
            <DropdownItem>
              <i className="fa fa-user"></i>My Account
            </DropdownItem>
          </NavLink>
          <a href="/login/?action=logout">
            <DropdownItem>
              <i className="fa fa-lock"></i> Logout
            </DropdownItem>
          </a>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const {...attributes} = this.props;
    return (
      this.dropAccnt()
    );
  }
}

export default HeaderDropdown;
