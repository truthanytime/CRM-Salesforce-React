import React, { useState, useEffect } from 'react';
import { useAsync } from 'utils/async';
import { Loader } from 'components/Loader';

import { getUsers as getUsersApi } from 'http/user/index';
import { User } from 'store/user/types';

type TenantUsersContextProps = {
  users: User[];
  loading: boolean;
};

export const TenantUsersContext = React.createContext<undefined | TenantUsersContextProps>(undefined);

export default function TenantUsersProvider(props: { children: JSX.Element | JSX.Element[] }) {
  // const [loading, setLoading] = useState(true);

  const [tenantUsers, setTenantUsers] = useState<User[]>([]);

  const { data: savedTenantUsers, loading } = useAsync(getUsersApi);

  useEffect(() => {
    if (!savedTenantUsers) {
      return;
    }
    setTenantUsers(savedTenantUsers);
  }, [savedTenantUsers]);

  if (loading) {
    return <Loader />;
  }

  return (
    <TenantUsersContext.Provider
      value={{
        users: tenantUsers,
        loading,
      }}
    >
      {props.children}
    </TenantUsersContext.Provider>
  );
}

export function useTenantUsers() {
  const context = React.useContext(TenantUsersContext);

  if (!context) {
    throw new Error('useTenantUsers must be used within TenantUsersProvider');
  }

  return context;
}
