import React,{Component} from 'react';
import { Form, Text, Select, TextArea } from 'react-form';
// import axios from 'axios';
import { client } from '../../../.../actions/client.js';

export default class NewRecordForm extends Component {
  constructor(props){
  	super(props);
  	this.state = {};

    this.renderFormFields = this.renderFormFields.bind(this);
    this.errorValidator = this.errorValidator.bind(this);
    this.successValidator = this.successValidator.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.getFieldComponent = this.getFieldComponent.bind(this);
  }

  getInputClassName(hasError) {
    return hasError ? 'react-form-input-error' : '';
  }

  componentWillMount() {
    console.log('select options', this.props.selectOptions);
  }

  getFieldComponent(column) {
    switch (column.formFieldType) {
      case 'select':
        return <Select field={ column.dataField } id={ column.dataField } className="form-control" options={this.props.selectOptions[column.dataField]} />
        break;
      case 'textarea':
        return <TextArea field={ column.dataField } id={ column.dataField } className="form-control" />
        break;
      default:
      return <Text field={ column.dataField } id={ column.dataField } className="form-control" />
      break;
    }
  }

  getAddOn(column) {
    if (column.formIcon !== undefined) {
      return (
        <span className="input-group-addon"><i className={`fa fa-${column.formIcon}`}></i></span>
      );
    } else {
      return <span></span>;
    }
  }

  renderFormFields(formApi) {
    return this.props.columns.map( column => {
      if (!column.hiddenOnInsert) {
        const hasError = formApi.errors[column.dataField] && formApi.touched[column.dataField];
        return (
          <div className={`form-group ${this.getInputClassName(hasError)}`}>
            <label htmlFor={ column.dataField }>{column.formFieldDisplayName || (column.displayName || column.dataField)}</label>
            <div className="input-group">
              {this.getAddOn(column)}
              {this.getFieldComponent(column)}
              <small className="react-form-message-error">
                {hasError ? formApi.errors[column.dataField] : ''}
              </small>
            </div>
          </div>
        );
      }
    });
  }

  errorValidator(values) {
    const mappedErrorValidator = {};

    this.props.columns.forEach(column => {
      if (column.validator === 'requiredField') {
        mappedErrorValidator[column.dataField] = !values[column.dataField] ? "Required" : null;
      }
    });

    // console.log('mappedErrorValidator', mappedErrorValidator);

    return mappedErrorValidator;
  }

  successValidator( values, errors ) {
    const mappedSuccessValidator = {};

    this.props.columns.forEach(column => {
      if (column.validator === 'requiredField') {
        mappedSuccessValidator[column.dataField] = !errors[column.dataField] ? "Good to go" : null;
      }
    });

    // console.log('mappedSuccessValidator', mappedSuccessValidator);

    return mappedSuccessValidator;
  }

  submitForm(submittedValues) {
    if (this.props.type === 'New') {
      client.post(`${this.props.endpoint}`,
        JSON.stringify(submittedValues)
      ).then(response => {
        console.log('new record response', response);
        this.props.addRow(submittedValues);
        this.props.closeModal();
        this.props.generateAlert({
          type: 'success',
          headline: 'Success'
        });
      }).catch(response => {
        console.log('new record error response', response);
        this.generateAlert({
          type: 'danger',
          headline: 'Error',
          message: 'There was a problem creating the record'
        });
      });
    } else if (this.props.type === 'Edit') {
      console.log('edit request triggered');
      const id = this.props.defaultValues.recid;
      client.post(`${this.props.endpoint}/${id}`,
        JSON.stringify(submittedValues)
      ).then(response => {
        console.log('update record response', response);
        this.props.refreshTable();
        this.props.closeModal();
        this.props.generateAlert({
          type: 'success',
          headline: 'Success'
        });
      }).catch(response => {
        console.log('update error response', response);
        this.generateAlert({
          type: 'danger',
          headline: 'Error',
          message: 'There was a problem updating the record'
        });
      });
    }

  }

  // getDefaultValues(this.props.defaultValues) {
  //   const values = this.props.defaultValues;
  //   return _.map(values, (value, key) {
  //
  //   })
  // }

  render() {
    // console.log('default form values', this.props.defaultValues);
    return (
      <Form
        validateError={this.errorValidator}
        validateSuccess={this.successValidator}
        // dontValidateOnMount
        defaultValues={this.props.defaultValues}
        onSubmitFailure={this.scrollToTop}
        onSubmit={this.submitForm}>
        { formApi => (

          <form onSubmit={formApi.submitForm} id="form2">
            {this.renderFormFields(formApi)}
            <button type="submit" className="mb-4 btn btn-primary">{this.props.type === 'New' ? 'Submit' : 'Update'}</button>
          </form>
        )}
      </Form>
    );
  }
}
