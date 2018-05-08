import React, {Component} from 'react';
import IventoryBootstrapTable from '../../containers/IventoryBootstrapTable';
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
      <IventoryBootstrapTable endpoint="FobLocations" columns={columns} />
    </div>
  );
};

export default FobLocations;
