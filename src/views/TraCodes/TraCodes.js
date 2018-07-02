import React from 'react';
import InventoryBootstrapTable from '../../containers/InventoryBootstrapTable';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';

const TraCodes = () => {
  const columns = [
    {
      dataField: "recid",
      isKey: true,
      hidden: true,
      export: false,
      isKey: true
    },
    actionsBtnConfig,
    {
      dataField: "TRACode",
      width: "100%"
    }
  ];

  return (
    <InventoryBootstrapTable endpoint="TraCodes" columns={columns} />
  );
};

export default TraCodes;
