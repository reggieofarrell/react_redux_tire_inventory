import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import { setUser, createAlert } from '../../../actions';
import { updateRecord } from '../../../actions/crud_actions';
import { Row, Col } from 'reactstrap';
import classNames from 'classnames';
import { swal } from 'react-redux-sweetalert2';
import { renderComponent, syncValidation } from '../form_utils';
import ChangePasswordModal from '../../../components/Modals/ChangePasswordModal';
// import { formFields } from './_config'

class MyAccountForm extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      isSubmitting: false,
      modal: false,
    };

    this.toggleChangePassword = this.toggleChangePassword.bind(this);
  }

  renderFields() {
    return this.props.formFields.map( field => {
      return (
        <Field
          label={field.formFieldDisplayName || (field.displayName || field.dataField)}
          name={field.dataField}
          type={field.inputType || 'text'}
          formElement={field.formElement}
          component={renderComponent}
          className="form-control"
          options={field.options}
          value={this.props.user[field.dataField]}
          disabled={field.disabled}
        >
        </Field>
      );
    });
  }

  handleFormSubmit(values) {
    this.setState({isSubmitting: true});

    const {
      createAlert,
      setUser,
      updateRecord
    } = this.props;

    const data = JSON.stringify(values);

    updateRecord('User', this.props.user.UserID, data,
      () => {
        this.setState({isSubmitting: false});
        createAlert({
          type: 'success',
          headline: 'Success'
        });
        setUser();
      },
      () => {
        this.setState({isSubmitting: false});
      }
    );
  }

  handleChangePassword() {
    const swalOptions = {
      title: 'Hello!',
    	text: 'How you doin?',
    	type: 'success'
    }

    this.props.showAlert(swalOptions);
  }

  toggleChangePassword() {
    // this.setState({ modalType: 'New' });
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const { handleSubmit } = this.props;

    const submitSpinnerClassNames = classNames({
      "d-none": !this.state.isSubmitting,
      "d-inline-block": this.state.isSubmitting
    });

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="row">
            <div className="col-md-4">
              {this.renderFields()}
              <div className="form-group">
                <label htmlFor="Password">Password</label>
                <div className="input-group">
                  <input type="password" className="form-control" value="**********" disabled/>
                  <span className="input-group-btn">
                    <button className="btn btn-primary" type="button" onClick={this.toggleChangePassword}><i className="fa fa-lock"></i> Change</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <br/><br/>
          <div className="row">
            <div className="col-md-4">
              <button action="submit" className="btn btn-primary" disabled={this.state.isSubmitting}>
                Save
                <div className={submitSpinnerClassNames}>
                  <i className="fa fa-cog fa-spin fa-fw ml-2"></i>
                  <span className="sr-only">Submitting Form...</span>
                </div>
              </button>
              <br/>
              <br/>
            </div>
          </div>

          {/* {this.props.submitFailed
            ? <div className="is-invalid ml-3 mt-2 d-inline-block pull-right">
                <h5 className="mb-0"><i className="fa fa-exclamation-circle"></i> Errors above</h5>
              </div>
            : ''
          } */}
        </form>
        <ChangePasswordModal
          isOpen={this.state.modal}
          toggle={this.toggleChangePassword}
          formFields={this.props.changePasswordFormFields}
        />
      </div>
    )
  }
}

function validate(values, props) {
  const formFields = props.formFields;
  return syncValidation(values, formFields);
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user.data,
    formFields: ownProps.formFields
  }
}

MyAccountForm = connect(mapStateToProps, {updateRecord, createAlert, setUser, ...swal})(MyAccountForm);

// below is also taking care of connecting actions
export default reduxForm({
  form: 'myAccount',
  validate
})(MyAccountForm);
