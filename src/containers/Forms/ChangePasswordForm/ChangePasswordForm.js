import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import { setUser, createAlert } from '../../../actions';
import { updateRecord } from '../../../actions/crud_actions';
import { Row, Col } from 'reactstrap';
import classNames from 'classnames';
import { swal } from 'react-redux-sweetalert2';
import { renderComponent, syncValidation } from '../form_utils';
// import ChangePasswordModal from '../../../components/Modals/ChangePasswordModal';
// import axios from 'axios';
import { client } from '../../../actions/client';
// import { formFields } from './_config'

class ChangePasswordForm extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      isSubmitting: false
    };

  }

  renderFields() {
    return this.props.formFields.map( field => {
      return (
        <div className="col-md-12">
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
        </div>
      );
    });
  }

  handleFormSubmit(values) {
    this.setState({isSubmitting: true});

    const {
      createAlert,
      setUser,
      updateRecord,
      closeModal
    } = this.props;

    const data = JSON.stringify(values);

    // updateRecord('User', this.props.user.UserID, data,
    //   () => {
    //     this.setState({isSubmitting: false});
    //     closeModal();
    //     createAlert({
    //       type: 'success',
    //       headline: 'Success'
    //     });
    //   },
    //   () => {
    //     this.setState({isSubmitting: false});
    //   }
    // );

    client.post('User/change_password', data)
      .then(response => {
        this.setState({isSubmitting: false});
        closeModal();
        if (!!response.data.success) {
          createAlert({
            type: 'success',
            headline: 'Success'
          });
        } else {
          createAlert({
            type: 'danger',
            headline: 'Error'
          });
        }
      })
      .catch(response => {
        this.setState({isSubmitting: false});
        closeModal();
        createAlert({
          type: 'danger',
          headline: 'Error'
        });
      });
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
            {this.renderFields()}
          </div>
          <br/><br/>
          <div className="row">
            <div className="col-md-4">
              <button action="submit" className="btn btn-primary" disabled={this.state.isSubmitting}>
                Update Password
                <div className={submitSpinnerClassNames}>
                  <i className="fa fa-cog fa-spin fa-fw ml-2"></i>
                  <span className="sr-only">Submitting Form...</span>
                </div>
              </button>
              <br/>
            </div>
            {this.props.submitFailed
              ? <div className="is-invalid ml-3 mt-2 d-inline-block pull-right">
                <h5 className="mb-0"><i className="fa fa-exclamation-circle"></i> Errors above</h5>
              </div>
              : ''
            }
          </div>
        </form>
        {/* <ChangePasswordModal
          isOpen={this.state.modal}
          toggle={this.toggleNewRecord}

        /> */}
      </div>
    )
  }
}

function validate(values, props) {
  const formFields = props.formFields;
  return syncValidation(values, formFields);
}

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function asyncValidate(values) {
  const data = JSON.stringify(values);
  return client.post('User/check_password', data)
    .then(response => {
      if (!!response.data.error) {
        throw { CurrentPassword: 'Password check failed.  Try again.' };
      }
    })
    .catch(response => {
      throw { CurrentPassword: 'Password check failed.  Try again.' };
    });
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user.data,
    formFields: ownProps.formFields
  }
}

ChangePasswordForm = connect(mapStateToProps, {updateRecord, createAlert, ...swal})(ChangePasswordForm);

// below is also taking care of connecting actions
export default reduxForm({
  form: 'changePassword',
  validate,
  asyncValidate,
  asyncBlurFields: ['CurrentPassword']
})(ChangePasswordForm);
