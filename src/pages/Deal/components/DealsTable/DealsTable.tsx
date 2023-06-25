import { FC, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams } from '@mui/x-data-grid';
import format from 'date-fns/format';

import { deleteDeal as deleteDealApi } from 'http/deal';
import { TableFooter } from 'components/TableFooter';
import { Deal } from 'store/deal/types';
import { useDeal } from 'store/deal/hooks';
import { BaseCheckbox, ColumnSortedAscendingIcon, ColumnSortedDescendingIcon, ColumnUnsortedIcon } from './ui';
import './DealsTable.css';

const DealFooter: FC = () => {
  const { getDeals } = useDeal();

  return (
    <TableFooter
      entity="deal"
      pluralEntity="deals"
      idProp="dealId"
      onDelete={async (ids: number[]) => {
        await Promise.all(ids.map((id) => deleteDealApi(id)));
      }}
      onSuccess={getDeals}
    />
  );
};

const columns: GridColDef[] = [
  {
    field: 'dealName',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'createdDate',
    headerName: 'Last Activity',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => format(new Date(params.row.createdDate), 'PP'),
  },
];

interface DealsTableProps {
  deals: Deal[];
  setSelectedDeal: (deal: Deal) => void;
}

const DealsTable: FC<DealsTableProps> = ({ deals, setSelectedDeal }) => {
  const [pageSize, setPageSize] = useState(5);

  const onRowClick = (params: GridRowParams) => {
    setSelectedDeal(params.row);
  };

  return (
    <Box style={{ height: 525, width: '100%' }} className="deals-table" data-testid="deals-table">
      <DataGrid
        rows={deals}
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
          Footer: DealFooter,
          BaseCheckbox,
          ColumnSortedAscendingIcon,
          ColumnSortedDescendingIcon,
          ColumnUnsortedIcon,
        }}
        disableColumnMenu
        disableVirtualization
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowId={(row: Deal) => row.dealId as number}
      />
    </Box>
  );
};

export default DealsTable;
