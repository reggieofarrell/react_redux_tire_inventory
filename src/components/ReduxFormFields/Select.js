import React from 'react';
import { Field } from 'redux-form';

export const Input = ({ config, options }) => {

  return (
    <div className="form-group">
      <Field
        label={config.formFieldDisplayName || (config.displayName || config.dataField)}
        name={config.dataField}
        type={config.inputType || 'text'}
        // formElement={config.formElement}
        component="select"
        className="form-control"
      >
      {options.map(option => (
        <option value={option.value}>{option.label}</option>
      ))}
      </Field>
      <div className="form-control-feedback">
        {/* {touched ? error : ''} */}
      </div>
    </div>
  )
}
