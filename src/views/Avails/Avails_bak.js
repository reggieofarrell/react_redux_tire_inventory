import React, {Component} from 'react';
import IventoryBootstrapTable from '../../containers/IventoryBootstrapTable/IventoryBootstrapTable';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';
import axios from 'axios';
import _ from 'lodash';

const Avails = () => {
  const columns = [
    { dataField: "recid", isKey: true, hidden: true, export: false, isKey: true },
    actionsBtnConfig,
    { dataField: "AvailDate", displayName: "Avail Date", validator: "requiredField" },
    { dataField: "SupplierName", displayName: "Supplier Name", validator: "requiredField"  },
    { dataField: "BrandName", displayName: "Brand" },
    { dataField: "TirePattern", displayName: "Pat", formFieldType: 'select', endpoint: "TirePatterns" },
    { dataField: "CondCode", displayName: "Cond" },
    { dataField: "TireSize", displayName: "Size" },
    { dataField: "PlyRating", displayName: "P Rat" },
    { dataField: "TRACode", displayName: "TRA" },
    { dataField: "FOBLocation", displayName: "Loc" },
    { dataField: "Quantity", displayName: "Qty" },
    { dataField: "Cost" },
    { dataField: "Comments", hidden: true },
    { dataField: "RubberCompound", displayName: "RC" },
    { dataField: "PackageName", displayName: "Package Name" },
    { dataField: "Currency", displayName: "Cur" },
    { dataField: "HasNumbers", displayName: "#'s" },
  ];

  const selectOptions = {
    TirePattern: getSelectOptions('TirePatterns', 'TirePattern')
  };

  const getSelectOptions = ({endpoint, dataField}) => {
    axios.get(`http://localhost:8888/api/${endpoint}`).then(response => {
      console.log(`response from select endpoint: ${endpoint}`, response.data);
      const renderedOptions = response.data.map(option => {
        return {
          label: option[dataField],
          value: option.recid
        }
      });
      console.log(`select options for ${dataField}`, renderedOptions);
      return renderedOptions;
    });
  };

  // substring(0, 10)

  return (
    <div className="">
      <IventoryBootstrapTable endpoint="Avails" columns={columns} />
    </div>
  );
};

export default Avails;
