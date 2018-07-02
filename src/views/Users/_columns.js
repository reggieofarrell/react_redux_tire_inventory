import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';

export const columns = [
  {
    dataField: "UserID",
    hidden: true,
    hiddenOnInsert: true,
    export: false,
    isKey: true
  },
  actionsBtnConfig,
  {
    dataField: "Email",
    displayName: "Email / Login",
    formEditReadOnly: true,
    validator: ['requiredField', 'email']
  }, {
    dataField: "FirstName",
    displayName: "First Name"
  }, {
    dataField: "LastName",
    displayName: "Last Name"
  }, {
    dataField: "Phone",
    validator: "requiredField"
  }, {
    dataField: "Password",
    export: false,
    hidden: true,
    hiddenOnEdit: true,
    inputType: "password",
    validator: "password"
  }, {
    dataField: "VerifyPass",
    displayName: "Verify Password",
    export: false,
    hidden: true,
    hiddenOnEdit: true,
    validator: "verifyPassword",
    inputType: "password"
  }, {
    dataField: "Role",
    hiddenOnInsert: true
  }, {
    dataField: "RoleID",
    displayName: "Role",
    export: false,
    hidden: true,
    hiddenOnInsert: false,
    formElement: "select",
    endpoint: "Role",
    selectLabel: "Name",
    validator: "requiredField"
  }
];
