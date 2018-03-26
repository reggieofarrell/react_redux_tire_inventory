import React from 'react';
import { Field } from 'redux-form';

export const Input = ({ config }) => {

  return (
    <div className="form-group">
      <Field
        label={config.formFieldDisplayName || (config.displayName || config.dataField)}
        name={config.dataField}
        type={config.inputType || 'text'}
        // formElement={config.formElement}
        component="input"
        className="form-control"
      />
      <div className="form-control-feedback">
        {/* {touched ? error : ''} */}
      </div>
    </div>
  )
}
