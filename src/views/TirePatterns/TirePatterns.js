import React, {Component} from 'react';
import IventoryBootstrapTable from '../../containers/IventoryBootstrapTable/IventoryBootstrapTable';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';

const TirePatterns = () => {
  const columns = [
    { dataField: "recid", isKey: true, hidden: true, export: false, isKey: true, hiddenOnInsert: true },
    actionsBtnConfig,
    { dataField: "TirePattern", displayName: "Pattern", width: "100%" },
    // { dataField: "Creator", width: "100%"},
  ];

  return (
    <div className="">
      <IventoryBootstrapTable endpoint="TirePatterns" columns={columns} />
    </div>
  );
};

export default TirePatterns;
