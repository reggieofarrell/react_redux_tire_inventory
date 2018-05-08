import React, {Component} from 'react';
import InventoryBootstrapTable from '../../containers/InventoryBootstrapTable';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';

const TireBrands = () => {
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
    dataField: "BrandCode",
    displayName: "Brand Code"
  }, {
    dataField: "BrandName",
    displayName: "Brand Name"
  }, {
    dataField: "PartCode",
    displayName: "Part Code"
  }, {
    dataField: "Quality",
    formElement: 'select',
    hardSelectOptions: [null, 'Big 3', '2nd Tier', '3rd Tier', '4th Tier']
  }
];

  return (
    <div className="">
      <InventoryBootstrapTable endpoint="TireBrands" columns={columns} />
    </div>
  );
};

export default TireBrands;
