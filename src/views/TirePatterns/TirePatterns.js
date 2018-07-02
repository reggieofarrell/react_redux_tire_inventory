import React from 'react';
import InventoryBootstrapTable from '../../containers/InventoryBootstrapTable';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';

const TirePatterns = () => {
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
      dataField: "TirePattern",
      displayName: "Pattern",
      width: "100%"
    }
  ];

  return (
    <div className="">
      <InventoryBootstrapTable endpoint="TirePatterns" columns={columns} />
    </div>
  );
};

export default TirePatterns;
