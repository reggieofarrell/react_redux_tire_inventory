import React, {Component} from 'react';
import IventoryBootstrapTable from '../../containers/IventoryBootstrapTable/IventoryBootstrapTable';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';

const Suppliers = () => {
  const columns = [
    { dataField: "recid", hidden: true, export: false, isKey: true, hiddenOnInsert: true},
    actionsBtnConfig,
    { dataField: "SupplierName", displayName: "Name", validator: 'requiredField'  },
    { dataField: "ContactName", displayName: "Contact", validator: 'requiredField' },
    { dataField: "ContactTitle", displayName: "Contact Title", hidden: true },
    { dataField: "StreetAddress1", displayName: "Address 1", hidden: true },
    { dataField: "StreetAddress2", displayName: "Address 2", hidden: true },
    { dataField: "City" },
    { dataField: "StateProv", displayName: "State / Province", hidden: true },
    { dataField: "CountryRegion", displayName: "Country / Region", },
    { dataField: "Phone1", displayName: "Phone 1",  validator: 'requiredField' },
    { dataField: "Phone2", displayName: "Phone 2", hidden: true },
    { dataField: "Cell1", displayName: "Cell 1" },
    { dataField: "Cell2", displayName: "Cell 2", hidden: true },
    { dataField: "Fax1", displayName: "Fax 1" },
    { dataField: "Fax2", displayName: "Fax 2", hidden: true },
    { dataField: "Email1", displayName: "Email 1", validator: ["email", "requiredField"] },
    { dataField: "Email2", displayName: "Email 2", hidden: true, validator: "email" },
    { dataField: "WebUrl", displayName: "Website" },
    { dataField: "VendorRating", displayName: "Rating", formElement: 'select',
      hardSelectOptions:[null, '1', '2', '3', '4'] },
    { dataField: "Notes", hidden: true, formElement: 'textarea' },

  ];

  return (
    <div className="">
      <IventoryBootstrapTable endpoint="Suppliers" columns={columns} />
    </div>
  );
}

export default Suppliers;
