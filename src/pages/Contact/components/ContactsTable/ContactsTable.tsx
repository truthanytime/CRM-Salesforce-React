import { FC, useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams } from '@mui/x-data-grid';
import format from 'date-fns/format';

import { deleteContact as deleteContactApi } from 'http/contact';
import { TableFooter } from 'components/TableFooter';
import { Contact } from 'store/contact/types';
import { useContact } from 'store/contact/hooks';
import { BaseCheckbox, ColumnSortedAscendingIcon, ColumnSortedDescendingIcon, ColumnUnsortedIcon } from './ui';
import './ContactsTable.css';

const ContactFooter: FC = () => {
  const { getContacts } = useContact();

  return (
    <TableFooter
      entity="contact"
      pluralEntity="contacts"
      idProp="contactId"
      onDelete={async (ids: number[]) => {
        await Promise.all(ids.map((id) => deleteContactApi(id)));
      }}
      onSuccess={getContacts}
    />
  );
};

const columns: GridColDef[] = [
  {
    field: 'contactName',
    headerName: 'Name',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => `${params.row.firstName} ${params.row.lastName}`,
  },
  {
    field: 'contactAssociate',
    headerName: 'Account',
    flex: 1,
  },
  {
    field: 'contactRole',
    headerName: 'Role',
    flex: 1,
  },
  {
    field: 'createdDate',
    headerName: 'Last Activity',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => format(new Date(params.row.updateDate), 'PP'),
  },
];

interface ContactsTableProps {
  contacts: Contact[];
  setSelectedContact: (contact: Contact) => void;
}

const ContactsTable: FC<ContactsTableProps> = ({ contacts, setSelectedContact }) => {
  const [pageSize, setPageSize] = useState(5);

  const onRowClick = (params: GridRowParams) => {
    setSelectedContact(params.row);
  };

  return (
    <Box style={{ height: 525, width: '100%' }} className="contacts-table" data-testid="contacts-table">
      <DataGrid
        rows={contacts}
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
          Footer: ContactFooter,
          BaseCheckbox,
          ColumnSortedAscendingIcon,
          ColumnSortedDescendingIcon,
          ColumnUnsortedIcon,
        }}
        disableColumnMenu
        disableVirtualization
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowId={(row: Contact) => row.contactId as number}
      />
    </Box>
  );
};

export default ContactsTable;
