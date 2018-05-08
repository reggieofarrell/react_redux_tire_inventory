import React, {Component} from 'react';
import InventoryBootstrapTable from '../../containers/InventoryBootstrapTable';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';

const RubberCompounds = () => {
  const columns = [
  {
    dataField: "recid",
    displayName: "Brand Code",
    hidden: true,
    hiddenOnInsert: true,
    export: false,
    isKey: true
  },
  actionsBtnConfig,
  {
    dataField: "Compound",
    width: "100%"
  }
];

  return (
    <div className="">
      <InventoryBootstrapTable endpoint="RubberCompounds" columns={columns} />
    </div>
  );
};

export default RubberCompounds;
