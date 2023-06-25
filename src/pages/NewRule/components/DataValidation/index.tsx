import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { GridItem } from 'components/ui';
import { CustomSelect } from 'components/CustomSelect';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import { useMigration } from 'store/migration/hooks';
import { Option } from 'pages/NewRule/types';
import ConditionComponent from './ConditionComponent';

const DataValidationRuleDefinition = () => {
  const { selectedTable } = useDataRaptor();
  const {
    data: { migratedTables },
  } = useMigration();

  const [tableOptions, setTableOptions] = useState<Option[]>([]);

  useEffect(() => {
    const options = migratedTables.map((table) => {
      return { value: table.table_name, label: table.table_name };
    });
    setTableOptions(options);
  }, [migratedTables]);

  return (
    <Box>
      <Grid
        container
        display="flex"
        justifyContent="flex-start"
        sx={{ backgroundColor: 'darkBg.main', p: 1.5, rowGap: 2 }}
      >
        <Grid container display="flex" justifyContent="center">
          <GridItem xs={1}>
            <Typography variant="labelRegular12" component="label" ml={1} my={'auto'} fontWeight={'bold'}>
              Where:
            </Typography>
          </GridItem>
          <GridItem xs={4}>
            <CustomSelect<string>
              id="where[0].table"
              name="where[0].table"
              variant="outlined"
              placeholder="Table"
              value={selectedTable}
              options={tableOptions}
              disabled={true}
              sx={{ backgroundColor: 'neutral.white', width: '90%' }}
              onSelect={async (value) => {
                // setFieldValue('where[0].table', value)
              }}
            />
          </GridItem>
        </Grid>
        <Grid container display="flex" justifyContent="flex-start" sx={{ rowGap: 1 }}>
          <ConditionComponent></ConditionComponent>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataValidationRuleDefinition;
