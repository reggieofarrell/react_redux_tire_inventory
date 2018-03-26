import React, {Component} from 'react';
import IventoryBootstrapTable from '../../containers/IventoryBootstrapTable/IventoryBootstrapTable';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';

const TraCodes = () => {
  const columns = [
    { dataField: "recid", isKey: true, hidden: true, export: false, isKey: true },
    actionsBtnConfig,
    { dataField: "TRACode", width: "100%" },
  ];

  return (
    <div className="">
      <IventoryBootstrapTable endpoint="TraCodes" columns={columns} />
    </div>
  );
};

export default TraCodes;
