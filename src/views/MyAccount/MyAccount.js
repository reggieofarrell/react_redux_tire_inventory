import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import { Row, Col } from 'reactstrap';
import MyAccountForm from '../../containers/Forms/MyAccountForm/MyAccountForm';
import { formFields } from './_config';
import { setUser } from '../../actions';

class MyAccount extends Component {
  constructor(props) {
  	super(props);
  	this.state = {};

    this.changePasswordFormFields = [
      { dataField: "CurrentPassword", displayName: "Enter Current Password", inputType: "password"},
      { dataField: "Password", displayName:"New Password", inputType: "password", validator: "password" },
      { dataField: "VerifyPassword", displayName: "Verify New Password", validator: "verifyPassword", inputType: "password" },
    ]
  }

  componentWillMount() {
    this.props.setUser();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <h4 className="pull-left"><i className="fa fa-user title-icon"></i> My Account</h4>
            {/* <button className="btn btn-primary btn-sm pull-right" onClick={this.sweetAlert}><i className="fa fa-lock"></i> Reset Password</button> */}
          </Col>
        </Row>
        <br/>
        <MyAccountForm initialValues={this.props.user} formFields={formFields} changePasswordFormFields={this.changePasswordFormFields} enableReinitialize/>
      </div>
    );
  }
}

function mapStateToProps({user}) {
  return {user: user.data};
}

export default connect(mapStateToProps, { setUser })(MyAccount);
