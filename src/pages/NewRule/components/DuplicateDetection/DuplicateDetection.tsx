import { useState, useEffect } from 'react';

import { Box, Typography } from '@mui/material';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import { useMigration } from 'store/migration/hooks';
import { Option } from 'pages/NewRule/types';
import { CustomSelect } from 'components/CustomSelect';
import DND from './DND';

const DuplicateDetectionRuleDefinition = () => {
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
    <Box
      sx={{
        m: 2.5,
        bgcolor: 'white',
        borderRadius: 1,
        p: 3,
      }}
    >
      <Typography variant="b16" color="neutral.main">
        Define Fields and Criteria
      </Typography>
      <br />
      <Typography variant="p12" color="primary.gray">
        Select fields to match and define matching criteria.
      </Typography>
      <br></br>

      <Typography
        variant="p12"
        color="neutral.main"
        mt={3}
        sx={{
          display: 'block',
        }}
      >
        Object:
      </Typography>
      <CustomSelect<string>
        id="where[0].table"
        name="where[0].table"
        variant="outlined"
        placeholder="Table"
        value={selectedTable}
        options={tableOptions}
        disabled={true}
        sx={{ backgroundColor: 'neutral.white', width: 306 }}
        onSelect={async (value) => {
          // setFieldValue('where[0].table', value)
        }}
      />
      <DND></DND>
    </Box>
  );
};

export default DuplicateDetectionRuleDefinition;
