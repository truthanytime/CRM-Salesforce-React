import { FC, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import { PRIVATE_ROUTE_PATHS } from 'core/constants';
import { Button } from 'components/ui';
import { TableFooter } from 'components/TableFooter';
import { deleteTenant as deleteTenantApi } from 'http/tenant';
import { BaseCheckbox, ColumnSortedAscendingIcon, ColumnSortedDescendingIcon, ColumnUnsortedIcon } from './ui';
import { useTenant } from 'store/tenant/hooks';
import { Tenant } from 'store/tenant/types';

const CompanyFooter: FC = () => {
  const { getTenants } = useTenant();

  return (
    <TableFooter
      entity="tenant"
      pluralEntity="tenants"
      idProp="tenantId"
      onDelete={async (ids: number[]) => {
        await Promise.all(ids.map((id) => deleteTenantApi(id)));
      }}
      onSuccess={getTenants}
    />
  );
};

const columns: GridColDef[] = [
  {
    field: 'tenantName',
    headerName: 'Tenant Name',
    flex: 1,
  },
  {
    field: 'ownerName',
    headerName: 'Owner',
    flex: 1,
  },
  {
    field: 'createDate',
    headerName: 'Created',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => new Date(params.row.createDate).toLocaleDateString(),
  },
];

const SuperAdmin: FC = () => {
  const navigate = useNavigate();
  const { loading, error, tenants, getTenants } = useTenant();

  useEffect(() => {
    getTenants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRowClick = (params: GridRowParams) => {
    navigate(PRIVATE_ROUTE_PATHS.createCompany, { state: { ...params.row } });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Companies</Typography>
        </Grid>

        <Grid item xs={12} style={{ height: 480, width: '100%' }}>
          <DataGrid
            rows={tenants}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            loading={loading}
            onRowClick={onRowClick}
            getRowId={(row: Tenant) => row.tenantId}
            headerHeight={40}
            rowHeight={64}
            components={{
              Footer: CompanyFooter,
              BaseCheckbox,
              ColumnSortedAscendingIcon,
              ColumnSortedDescendingIcon,
              ColumnUnsortedIcon,
            }}
            disableColumnMenu
            disableVirtualization
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={() => navigate(PRIVATE_ROUTE_PATHS.createCompany)}>Add New Company</Button>
          </Box>
        </Grid>

        {!!error && (
          <Grid item xs={12}>
            <Typography variant="caption" color="red">
              {typeof error === 'string' ? error : 'Something went wrong!'}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default SuperAdmin;
