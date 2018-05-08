import React,{Component} from 'react';
import { Field, reduxForm, reset, clearSubmitErrors, initialize, setSubmitSucceeded, submit } from 'redux-form';
import { connect } from 'react-redux';
import { createRecord, updateRecord, fetchCollection } from '../../../actions/crud_actions';
import { createAlert, deleteAlert } from '../../../actions';
import classNames from 'classnames';
import { renderComponent, syncValidation } from '../form_utils';
import CustomCheckbox from '../../../components/CustomCheckbox';


export class NewRecordForm extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      submissionErrors: this.props.submitFailed,
      isSubmitting: false,
      keepOpen: false,
    };

    this.renderFields = this.renderFields.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setKeepOpenTrue = this.setKeepOpenTrue.bind(this);
    this.setKeepOpenFalse = this.setKeepOpenFalse.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.triggerSubmit = this.triggerSubmit.bind(this);
  }

  renderFields() {
    return this.props.formFields.map( formField => {
      if ( !formField.hiddenOnInsert && !(this.props.type === 'Edit' && formField.hiddenOnEdit) ) {
        const options = this.props.selectOptions[formField.dataField];
        return (
          <div className="col-md-6" key={formField.dataField}>
            <Field
              label={formField.formFieldDisplayName || (formField.displayName || formField.dataField)}
              name={formField.dataField}
              type={formField.inputType || 'text'}
              formElement={formField.formElement}
              component={renderComponent}
              className="form-control"
              options={options}
              charLimit={formField.charLimit || null}
              formIcon={formField.formIcon}
            >
            </Field>
          </div>
        );
      }
    });
  }

  resetForm() {
    this.props.dispatch(reset('record'));
  }

  triggerSubmit() {
    this.refs.realSubmit.click();
  }

  handleFormSubmit(values) {
      this.setState({isSubmitting: true});

      const {
        type,
        createRecord,
        updateRecord,
        fetchCollection,
        closeModal,
        generateAlert,
        initialValues,
        endpoint,
        createAlert,
        dispatch
      } = this.props;

      const data = JSON.stringify(values);

      if (type === 'New') {
        createRecord(endpoint, data,
          () => {
            this.setState({isSubmitting: false});
            fetchCollection(endpoint);
            if (!this.state.keepOpen) {
              closeModal();
            } else {
              // this.props.resetForm();
              dispatch(reset('record'));
            }
            createAlert({
              type: 'success',
              headline: 'Success'
            });
          },
          () => {
            this.setState({isSubmitting: false});
          }
        );
      } else if (type === 'Edit') {
        updateRecord(endpoint, initialValues.recid, data,
          () => {
            this.setState({isSubmitting: false});
            fetchCollection(endpoint);
            closeModal();
            createAlert({
              type: 'success',
              headline: 'Success'
            });
          },
          () => {
            this.setState({isSubmitting: false});
          }
        );
      }
  }

  setKeepOpenTrue() {
    this.setState({ keepOpen: true });
  }

  setKeepOpenFalse() {
    this.setState({ keepOpen: false });
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
          <input type="hidden" value="something"/>
          <div className="row">
            {this.renderFields()}
          </div>
          <button ref="realSubmit" action="submit" className="btn btn-primary d-none" disabled={this.state.isSubmitting}>
            {this.props.type === 'New' ? 'Submit' : 'Update'}
            {/* <div className={submitSpinnerClassNames}>
              <i className="fa fa-cog fa-spin fa-fw ml-2"></i>
              <span className="sr-only">Submitting Form...</span>
            </div> */}
          </button>
        </form>
        <button onClick={this.triggerSubmit} className="btn btn-primary" disabled={this.state.isSubmitting}>
          {this.props.type === 'New' ? 'Submit' : 'Update'}
          <div className={submitSpinnerClassNames}>
            <i className="fa fa-cog fa-spin fa-fw ml-2"></i>
            <span className="sr-only">Submitting Form...</span>
          </div>
        </button>
        <button className="btn btn-secondary ml-2" onClick={this.resetForm}>
          {this.props.type === 'New' ? 'Reset' : 'Discard Changes'}
        </button>
        {this.props.submitFailed
          ? <div className="is-invalid ml-3 mt-2 d-inline-block pull-right">
            <h5 className="mb-0"><i className="fa fa-exclamation-circle"></i> Errors above</h5>
          </div>
          : ''
        }
        {this.props.type === 'New' ? (
          <CustomCheckbox
            checkedCallback={this.setKeepOpenTrue}
            uncheckedCallback={this.setKeepOpenFalse}
            label="Keep open on submit"
          />
        ) : ''}
      </div>
    );
  }
}

function validate(values, props) {
  const formFields = props.formFields;
  return syncValidation(values, formFields);
}

function mapStateToProps(state, ownProps) {
  return {
    formFields: ownProps.formFields
  }
}


NewRecordForm = connect(mapStateToProps, {createRecord, updateRecord, fetchCollection, createAlert, deleteAlert})(NewRecordForm);

export default reduxForm({
  form: 'record',
  validate
})(NewRecordForm);
