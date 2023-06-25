import { FC, useState, useEffect, useMemo } from 'react';
import { Typography, Grid, Box } from '@mui/material';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { SearchDropdown } from 'components/SearchDropdown';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import { Deal } from 'store/deal/types';
import { useDeal } from 'store/deal/hooks';
import { Loader } from 'components/Loader';
import { OptionValue } from 'core/types';
import { Container, DealsSection, DealsContainer } from './ui';
import { DealModal } from './components';
import { ReactComponent as DealRoundIcon } from 'assets/icons/accountRound.svg';
import { DealsTable } from './components/DealsTable';
import { generatePath, useNavigate } from 'react-router-dom';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';

const DealPage: FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const { loading, error, deals, getDeals } = useDeal();

  useEffect(() => {
    getDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('filterVlaue', filterValue);

  const toggleModal = () => {
    if (modalOpen && selectedDeal) setSelectedDeal(undefined);
    setModalOpen((prevState) => !prevState);
  };

  const suggestions = useMemo(() => {
    if (!searchTerm) return [];
    const regex = new RegExp(searchTerm, 'i');
    return deals.reduce((acc, val) => {
      const dealName = val.dealName;
      if (dealName.match(regex)) acc.push({ label: dealName, value: dealName });
      return acc;
    }, [] as OptionValue<string>[]);
  }, [deals, searchTerm]);

  // const data = useMemo(() => {
  //   if (!filterValue) return deals;
  //   return deals.filter((deal) => deal.dealFirstName === filterValue);
  // }, [deals, filterValue]);

  return (
    <Container>
      <Grid container spacing={2} sx={{ backgroundColor: 'neutral.white', padding: '24px 32px 16px' }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h2" sx={{ color: 'neutral.main' }}>
            Deal
          </Typography>

          <Box display="flex" flexDirection="row" alignItems="center" marginTop={2.5}>
            <Box width="250px" marginRight={2}>
              <SearchDropdown
                id="search-deals"
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
            Create deal
          </PrimaryButton>
        </Grid>
        {/* )} */}
      </Grid>

      <DealsSection>
        {deals.length > 0 ? (
          <DealsTable
            deals={deals}
            setSelectedDeal={(deal) => {
              navigate(generatePath(PRIVATE_ABS_ROUTE_PATHS.dealScapeDetail, { id: String(deal.dealId) }));
              setSelectedDeal(deal);
              toggleModal();
            }}
          />
        ) : (
          <>
            <DealsContainer marginTop={1}>
              {/* {isAdmin && ( */}
              <>
                <DealRoundIcon />
                <Typography
                  variant="labelRegular12"
                  component="p"
                  sx={{ color: 'neutral.n400', my: 3, width: 240, textAlign: 'center' }}
                >
                  You don’t have any deals yet.
                  <br /> Create first deal and to work with.
                </Typography>
                <PrimaryButton startIcon={<PlusIcon />} onClick={toggleModal}>
                  Create deal
                </PrimaryButton>
              </>
              {/* )} */}
            </DealsContainer>
          </>
        )}
      </DealsSection>

      <DealModal open={modalOpen} toggleOpen={toggleModal} deal={selectedDeal} />

      {!!error && (
        <Typography variant="caption" color="red">
          {typeof error === 'string' ? error : 'Something went wrong!'}
        </Typography>
      )}

      {loading && <Loader />}
    </Container>
  );
};

export default DealPage;
