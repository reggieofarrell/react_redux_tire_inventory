import React from 'react';
import InventoryBootstrapTable from '../../containers/InventoryBootstrapTable';
import { columns } from './_columns';

const Users = () => {
  return (
    <InventoryBootstrapTable endpoint="User" columns={columns} />
  );
};

export default Users;
