import React from 'react';
import classNames from 'classnames';
import ReduxFormDropdownList from '../../components/ReduxFormDropdownList/ReduxFormDropdownList';
import ReduxFormDate from '../../components/ReduxFormDate/ReduxFormDate';

function renderFieldType(field, inputClassName, iconClassName) {
  switch (field.formElement) {
    case 'select':
      return (
        <div>
          <label>{field.label}</label>
          <ReduxFormDropdownList
            className={inputClassName}
            {...field.input}
            options={field.options}
            // style={{ padding: 0 }}
          />
        </div>
      );
      break;
      case 'date':
        return (
          <div>
            <label>{field.label}</label>
            <ReduxFormDate
              className={inputClassName}
              {...field.input}
              // options={field.options}
              // style={{ padding: 0 }}
            />

          </div>
        );
        break;
    case 'textarea':
      const spanClass = classNames({
        'pull-right': true,
        'over-limit': field.input.value !== undefined ? field.input.value.length > field.charLimit : false,
      });

      return (
        <div>
          <label style={{ width: '100%' }}>
            {field.label}
            <span
              className={spanClass}
              style={{ fontSize: '.5rem', paddingTop: '.5rem' }}
            >{field.input.value !== undefined ? field.input.value.length : 0}/{field.charLimit}
            </span>
          </label>
          <textarea rows="10" className={inputClassName} {...field.input}>
          </textarea>

          {/* <ReduxFormTextarea
            label={field.label}
            className={inputClassName}
            input={field.input}
            charLimit={field.charLimit}
            // {...field.input}
          /> */}
        </div>
      );
      break;
    case 'checkbox':
      return (
        <div className="form-check mt-4">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" {...field.input} />
            {field.label}
          </label>
        </div>
      );
      break;
    default:
      if (field.formIcon !== undefined) {
        return (
          <div>
            <label>{field.label}</label>
            <div className="input-group">
              <div className={iconClassName}><i className={field.formIcon} /></div>
              <input
                autoComplete="nope"
                className={inputClassName}
                type={field.type}
                {...field.input}
                disabled={field.disabled}
              />
            </div>
          </div>
        );
      }

      return (
        <div>
          <label>{field.label}</label>
          <input
            autoComplete="nope"
            className={inputClassName}
            type={field.type}
            {...field.input}
            disabled={field.disabled}
          />
        </div>
      );

  }
}

export const renderComponent = (field) => {
  const { meta: { touched, dirty, submitFailed, error, invalid, valid, active } } = field;
  // const groupClassName = `form-group ${ (touched || submitFailed) && invalid ? 'is-invalid' : ''}`;
  const groupClassName = classNames({
    "form-group": true,
    "is-invalid": (touched || submitFailed) && invalid,
    // "input-group": field.formIcon !== undefined ? true : false,
    // "is-valid": submitFailed && valid && !active
  });

  // const inputClassName = `form-control ${ (touched || submitFailed) && invalid ? 'is-invalid' : ''}`;
  const inputClassName = classNames({
    "form-control": true,
    "is-invalid": (touched || submitFailed) && invalid,
    // "is-valid": submitFailed && dirty && valid && !active
  });

  const iconClassName = classNames({
    "input-group-addon": true,
    "is-invalid": (touched || submitFailed) && invalid,
  });

  return (
    <div className={groupClassName}>
      {renderFieldType(field, inputClassName, iconClassName)}
      <div className="form-control-feedback">
        { (touched || submitFailed) && invalid ? error : ''}
      </div>
    </div>
  );
}

export const syncValidation = (values, formFields) => {
  const errors = {};

  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
  const emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const fourDidgetRegex = /\d{4}(?!\d)/;

  formFields.forEach(field => {
    if ( !!field.validator && field.validator.includes('email') ) {
      errors[field.dataField] = ( emailRegex.test(values[field.dataField]) || !values[field.dataField] )
        ? undefined
        : "Invalid email address";
    }

    if ( !!field.validator && field.validator.includes('password') ) {
      errors[field.dataField] = ( passRegex.test(values[field.dataField]) )
        ? undefined
        : "Password must be at least 8 characters and contain at least 1 uppcase letter, 1 lowercase letter, and 1 number";
    }

    if ( !!field.validator && field.validator.includes('verifyPassword') ) {
      errors[field.dataField] = (values[field.dataField] !== values['Password']) ? "Passwords don't match!" : undefined;
    }

    if ( !!field.validator && field.validator.includes('fourDidgetYear') ) {
      if (!values[field.dataField] || values[field.dataField] === null) {
        errors[field.dataField] = undefined;
      } else {
        errors[field.dataField] = ( fourDidgetRegex.test(values[field.dataField]) )
        ? undefined
        : "Format: 4 didget year";
      }
    }

    if ( !!field.validator && field.validator.includes('greaterThanZero') ) {
      errors[field.dataField] = (
        parseInt(values[field.dataField]) < 1 || !values[field.dataField] || isNaN(values[field.dataField])
      ) ? "Must be a number and more than zero" : undefined;
    }

    if ( !!field.validator && field.validator.includes('charLimit') ) {
      if (!errors[field.dataField]) {
        errors[field.dataField] = ( values[field.dataField] && values[field.dataField].length > field.charLimit )
          ? "Over character limit"
          : undefined;
      }
    }

    if ( !!field.validator && field.validator.includes('requiredField') ) {
      if (!errors[field.dataField]) {
        errors[field.dataField] = ( !values[field.dataField] || values[field.dataField] === null ) ? "Required" : undefined;
      }
    }

  });

  return errors;
}
