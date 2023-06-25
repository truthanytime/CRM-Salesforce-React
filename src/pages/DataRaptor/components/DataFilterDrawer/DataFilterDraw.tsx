import { Divider, Grid, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as FilterIcon } from 'assets/icons/filterBlue.svg';
import { FilterPanel } from 'components/FilterPanel';
import { SecondaryButton } from 'components/ui';
import { FC, Fragment, useState } from 'react';
import { useDataRaptor } from 'store/dataRaptor/hooks';

const DataFilterDraw: FC = () => {
  const { fields, filters, addFilter, removeFilter, setFilter } = useDataRaptor();
  // State to keep track of the drawer open/close state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  // Function to toggle the drawer open/close state
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };
  const handleRemoveFilter = (name: string, type: string) => {
    removeFilter({ name: name, type: type });
  };
  const handleSetFilter = (name: string, operator: string, compare: string) => {
    setFilter({ name: name, operator: operator, compare: compare });
  };
  return (
    <div>
      <Fragment>
        <SecondaryButton startIcon={<FilterIcon />} onClick={toggleDrawer(true)}>
          Filters
        </SecondaryButton>
        <Drawer anchor={'right'} open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 400, height: '700px', marginTop: 7, px: 3, py: 3 }} role="presentation">
            <Stack sx={{ mx: 1, width: '100%' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ color: 'neutral.main', fontWeight: 'bold' }}>
                  Filter
                </Typography>
                <CrossIcon onClick={toggleDrawer(false)} cursor="pointer" />
              </Stack>
              <Grid>
                <Typography variant="p12" color="neutral.400">
                  Filter data by displayed columns
                </Typography>
              </Grid>
              <Divider sx={{ my: 1 }} />
              <FilterPanel
                addFilter={addFilter}
                removeFilter={handleRemoveFilter}
                filters={filters}
                fields={fields}
                setFilter={handleSetFilter}
              />
            </Stack>
          </Box>
        </Drawer>
      </Fragment>
    </div>
  );
};
export default DataFilterDraw;
