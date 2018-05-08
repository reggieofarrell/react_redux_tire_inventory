import React, {Component} from 'react';
import InventoryBootstrapTable from '../../containers/InventoryBootstrapTable';
import actionsBtnConfig from '../../components/BsTableActionsDropdown/_dropdownColConfig';

const PlyRatings = () => {
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
    dataField: "PlyRating",
    displayName: "Ply Rating",
    width: "100%"
  }
];

  return (
    <div className="">
      <InventoryBootstrapTable endpoint="PlyRatings" columns={columns} />
    </div>
  );
};

export default PlyRatings;
