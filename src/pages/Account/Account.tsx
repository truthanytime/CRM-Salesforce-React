import { FC, useState, useEffect, useMemo } from 'react';
import { Typography, Grid, Box } from '@mui/material';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { SearchDropdown } from 'components/SearchDropdown';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import { Account } from 'store/account/types';
import { useAccount } from 'store/account/hooks';
import { Loader } from 'components/Loader';
import { OptionValue } from 'core/types';
import { Container, AccountsSection, AccountsContainer } from './ui';
import { AccountModal } from './components';
import { ReactComponent as AccountRoundIcon } from 'assets/icons/accountRound.svg';
import { AccountsTable } from './components/AccountsTable';
import { generatePath, useNavigate } from 'react-router-dom';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';

const AccountPage: FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const { loading, error, accounts, getAccounts } = useAccount();

  useEffect(() => {
    getAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleModal = () => {
    if (modalOpen && selectedAccount) setSelectedAccount(undefined);
    setModalOpen((prevState) => !prevState);
  };
  console.log('filtervalue', filterValue);
  const suggestions = useMemo(() => {
    if (!searchTerm) return [];
    const regex = new RegExp(searchTerm, 'i');
    return accounts.reduce((acc, val) => {
      const accountName = val.accountName;
      if (accountName.match(regex)) acc.push({ label: accountName, value: accountName });
      return acc;
    }, [] as OptionValue<string>[]);
  }, [accounts, searchTerm]);

  // const data = useMemo(() => {
  //   if (!filterValue) return accounts;
  //   return accounts.filter((account) => account.accountFirstName === filterValue);
  // }, [accounts, filterValue]);

  return (
    <Container>
      <Grid container spacing={2} sx={{ backgroundColor: 'neutral.white', padding: '24px 32px 16px' }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h2" sx={{ color: 'neutral.main' }}>
            Account
          </Typography>

          <Box display="flex" flexDirection="row" alignItems="center" marginTop={2.5}>
            <Box width="250px" marginRight={2}>
              <SearchDropdown
                id="search-accounts"
                placeholder="Search all deals..."
                options={suggestions}
                onSelect={(term) => setFilterValue(term)}
                onChange={(term) => setSearchTerm(term)}
              />
            </Box>
          </Box>
        </Grid>

        {/* {isAdmin && ( */}
        <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
          <SecondaryButton>Import</SecondaryButton>

          <PrimaryButton startIcon={<PlusIcon />} sx={{ marginLeft: 2 }} onClick={toggleModal}>
            Create account
          </PrimaryButton>
        </Grid>
        {/* )} */}
      </Grid>

      <AccountsSection>
        {accounts.length > 0 ? (
          <AccountsTable
            accounts={accounts}
            setSelectedAccount={(account) => {
              navigate(generatePath(PRIVATE_ABS_ROUTE_PATHS.accountDetail, { id: String(account.accountId) }));
              setSelectedAccount(account);
              toggleModal();
            }}
          />
        ) : (
          <>
            <AccountsContainer marginTop={1}>
              {/* {isAdmin && ( */}
              <>
                <AccountRoundIcon />
                <Typography
                  variant="labelRegular12"
                  component="p"
                  sx={{ color: 'neutral.n400', my: 3, width: 240, textAlign: 'center' }}
                >
                  You don’t have any accounts yet.
                  <br /> Create first account and to work with.
                </Typography>
                <PrimaryButton startIcon={<PlusIcon />} onClick={toggleModal}>
                  Create account
                </PrimaryButton>
              </>
              {/* )} */}
            </AccountsContainer>
          </>
        )}
      </AccountsSection>

      <AccountModal open={modalOpen} toggleOpen={toggleModal} account={selectedAccount} />

      {!!error && (
        <Typography variant="caption" color="red">
          {typeof error === 'string' ? error : 'Something went wrong!'}
        </Typography>
      )}

      {loading && <Loader />}
    </Container>
  );
};

export default AccountPage;
