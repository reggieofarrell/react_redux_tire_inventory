import React from 'react';
import InventoryBootstrapTable from '../../containers/InventoryBootstrapTable';
import { columns } from './_columns';

const Suppliers = () => {
  return (
    <InventoryBootstrapTable endpoint="Suppliers" columns={columns} />
  );
}

export default Suppliers;
