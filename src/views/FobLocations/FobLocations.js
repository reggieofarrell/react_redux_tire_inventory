import React, {Component} from 'react';
import InventoryBootstrapTable from '../../containers/InventoryBootstrapTable';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';

const FobLocations = () => {
  const columns = [
  {
    dataField: "recid",
    isKey: true,
    hidden: true,
    export: false,
    hiddenOnInsert: true
  },
  actionsBtnConfig,
  {
    dataField: "FOBLocation",
    displayName: "FOB Location",
    width: "100%"
  }
];

  return (
    <div className="">
      <InventoryBootstrapTable endpoint="FobLocations" columns={columns} />
    </div>
  );
};

export default FobLocations;
