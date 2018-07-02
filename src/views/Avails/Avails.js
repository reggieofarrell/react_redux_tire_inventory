import React from 'react';
import InventoryBootstrapTable from '../../containers/InventoryBootstrapTable';
import { columns } from './_columns.js';

const Avails = () => {
  return (
    <InventoryBootstrapTable
      endpoint="Avails"
      columns={columns}
      hasFilters={true}
      hasLoadAll={true}
      hasAvgCost={true}
    />
  );
}

export default Avails;
