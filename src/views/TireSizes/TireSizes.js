import React, {Component} from 'react';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';
import InventoryBootstrapTable from '../../containers/InventoryBootstrapTable';

const TireSizes = () => {
  const columns = [
  {
    dataField: "recid",
    isKey: true,
    hidden: true,
    export: false,
    isKey: true,
    hiddenOnInsert: true
  },
  actionsBtnConfig,
  {
    dataField: "TireSize",
    displayName: "Size",
    width: "100%"
  }, {
    dataField: "Weight",
    width: "100%",
    sortType: "numeric",
    dataFormatType: "number"
  }, {
    dataField: "OD",
    width: "100%",
    sortType: "numeric",
    dataFormatType: "number"
  }
];

  return (
    <div className="">
      <InventoryBootstrapTable endpoint="TireSizes" columns={columns} />
    </div>
  );
};

export default TireSizes;
