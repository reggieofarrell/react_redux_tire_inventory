import React from 'react';
import InventoryBootstrapTable from '../../containers/InventoryBootstrapTable';
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
    <InventoryBootstrapTable endpoint="TireModels" columns={columns} />
  );
};

export default TireBrands;
