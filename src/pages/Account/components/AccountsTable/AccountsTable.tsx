import { FC, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams } from '@mui/x-data-grid';
import format from 'date-fns/format';

import { deleteAccount as deleteAccountApi } from 'http/account';
import { TableFooter } from 'components/TableFooter';
import { Account } from 'store/account/types';
import { useAccount } from 'store/account/hooks';
import { BaseCheckbox, ColumnSortedAscendingIcon, ColumnSortedDescendingIcon, ColumnUnsortedIcon } from './ui';
import './AccountsTable.css';

const AccountFooter: FC = () => {
  const { getAccounts } = useAccount();

  return (
    <TableFooter
      entity="account"
      pluralEntity="accounts"
      idProp="accountId"
      onDelete={async (ids: number[]) => {
        await Promise.all(ids.map((id) => deleteAccountApi(id)));
      }}
      onSuccess={getAccounts}
    />
  );
};

const columns: GridColDef[] = [
  {
    field: 'accountName',
    headerName: 'Name',
    flex: 1,
  },
  // {
  //   field: 'accountType',
  //   headerName: 'Type',
  //   flex: 1,
  // },
  {
    field: 'revenuePerYear',
    headerName: 'Revenue',
    flex: 1,
  },
  {
    field: 'employeesNumber',
    headerName: 'Employees Number',
    flex: 1,
  },
  {
    field: 'createDate',
    headerName: 'Last Activity',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => format(new Date(params.row.createDate), 'PP'),
  },
];

interface AccountsTableProps {
  accounts: Account[];
  setSelectedAccount: (account: Account) => void;
}

const AccountsTable: FC<AccountsTableProps> = ({ accounts, setSelectedAccount }) => {
  const [pageSize, setPageSize] = useState(5);

  const onRowClick = (params: GridRowParams) => {
    setSelectedAccount(params.row);
  };

  return (
    <Box style={{ height: 525, width: '100%' }} className="accounts-table" data-testid="accounts-table">
      <DataGrid
        rows={accounts}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25, 50]}
        checkboxSelection
        disableSelectionOnClick
        headerHeight={40}
        rowHeight={64}
        // loading={loading}
        onRowClick={onRowClick}
        components={{
          Footer: AccountFooter,
          BaseCheckbox,
          ColumnSortedAscendingIcon,
          ColumnSortedDescendingIcon,
          ColumnUnsortedIcon,
        }}
        disableColumnMenu
        disableVirtualization
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowId={(row: Account) => row.accountId as number}
      />
    </Box>
  );
};

export default AccountsTable;
