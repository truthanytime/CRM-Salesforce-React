import { FC, useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

import { updateUser as updateUserApi, deleteUser as deleteUserApi } from 'http/user';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { TableFooter } from 'components/TableFooter';
import { UserType } from 'core/types';
import { SecondaryButton } from 'components/ui';
import { CustomSelect } from 'components/CustomSelect';
import { USER_ROLE_OPTIONS } from 'core/constants';
import { User } from 'store/user/types';
import { Loader } from 'components/Loader';
import { userSelector, useUser } from 'store/user/hooks';
import { RootState } from 'store/types';
import {
  Container,
  BaseCheckbox,
  ColumnSortedAscendingIcon,
  ColumnSortedDescendingIcon,
  ColumnUnsortedIcon,
  TitleContainer,
} from './ui';
import { AddNewUserModal, UserDetailsModal } from './components';

const TeamFooter: FC = () => {
  const { user, getUsers } = useUser();

  return (
    <TableFooter
      entity="user"
      pluralEntity="users"
      idProp="userId"
      onDelete={async (ids: number[]) => {
        const filteredIds = ids.reduce((acc, val) => {
          if (val !== user?.userId) acc.push(val);
          return acc;
        }, [] as number[]);
        await Promise.all(filteredIds.map((id) => deleteUserApi(id)));
      }}
      onSuccess={getUsers}
    />
  );
};

const UserRoleCell: FC<{ userId: number }> = ({ userId }) => {
  const { updateUser } = useUser();
  const user = useSelector((state: RootState) => userSelector(state, userId));

  return (
    <CustomSelect<UserType>
      value={user?.userType as UserType}
      options={USER_ROLE_OPTIONS}
      onSelect={async (value) => {
        if (!user?.userId) return;
        await updateUserApi(user.userId, { userType: value });
        updateUser({ userId: user.userId, user: { userType: value } });
      }}
    />
  );
};

const columns: GridColDef[] = [
  {
    field: 'userName',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'userEmail',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'userRole',
    headerName: 'Role',
    flex: 1,
    renderCell: (params: GridRenderCellParams<string>) => <UserRoleCell userId={params.row.userId} />,
  },
  {
    field: 'permissions',
    headerName: 'Permissions',
    flex: 2,
  },
];

const Team: FC = () => {
  const [modalOpen, setModalOpened] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined);
  const { loading, error, users, getUsers } = useUser();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleModal = () => setModalOpened((prevState) => !prevState);

  const toggleDetails = () => {
    if (detailsOpen) setSelectedUserId(undefined);
    setDetailsOpen((prevState) => !prevState);
  };

  const onRowClick = (params: GridRowParams) => {
    setSelectedUserId(params.row.userId);
    toggleDetails();
  };

  return (
    <Container position="relative">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleContainer>
            <Typography variant="h3" sx={{ color: 'neutral.main' }}>
              Users
            </Typography>

            <SecondaryButton startIcon={<PlusIcon />} onClick={toggleModal}>
              Add new user
            </SecondaryButton>
          </TitleContainer>
        </Grid>

        <Grid item xs={12} style={{ height: 480, width: '100%' }} data-testid="team-table">
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            headerHeight={40}
            rowHeight={64}
            loading={loading}
            onRowClick={onRowClick}
            components={{
              Footer: TeamFooter,
              BaseCheckbox,
              ColumnSortedAscendingIcon,
              ColumnSortedDescendingIcon,
              ColumnUnsortedIcon,
            }}
            disableColumnMenu
            disableVirtualization
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            getRowId={(row: User) => row.userId as number}
          />
        </Grid>

        {!!error && (
          <Grid item xs={12}>
            <Typography variant="caption" color="red">
              {typeof error === 'string' ? error : 'Something went wrong!'}
            </Typography>
          </Grid>
        )}
      </Grid>

      <AddNewUserModal open={modalOpen} toggleOpen={toggleModal} />

      <UserDetailsModal open={detailsOpen} toggleOpen={toggleDetails} userId={selectedUserId} />

      {loading && <Loader />}
    </Container>
  );
};

export default Team;
