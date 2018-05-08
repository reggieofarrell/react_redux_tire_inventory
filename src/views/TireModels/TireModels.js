import React, {Component} from 'react';
import IventoryBootstrapTable from '../../containers/IventoryBootstrapTable';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';

const TireBrands = () => {
  const columns = [
  {
    dataField: "recid",
    hidden: true,
    hiddenOnInsert: true,
    export: false,
    isKey: true
  },
  actionsBtnConfig,
  {
    dataField: "ModelName",
    displayName: "Model",
    width: "100%"
  }
];

  return (
    <div className="">
      <IventoryBootstrapTable endpoint="TireModels" columns={columns} />
    </div>
  );
};

export default TireBrands;
