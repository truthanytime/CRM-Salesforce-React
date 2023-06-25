import { FC } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { DataSourceCard, SelectedDataSourceCard } from './ui';
import { GridItem } from 'components/ui';
import { IntegratedDataSource } from '../../../../store/dataSource/types';

interface DataSourceSelectorProps {
  selectDataSourceHandler: (dataSourceId: string) => void;
  dataSources: IntegratedDataSource[];
  selectedDataSource: IntegratedDataSource | undefined;
}

const DataSourceSelector: FC<DataSourceSelectorProps> = ({
  selectDataSourceHandler,
  dataSources,
  selectedDataSource,
}) => {
  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: 'neutral.main' }}>
          Choose source of records
        </Typography>
      </Box>
      <Grid container sx={{ padding: '1.5rem' }}>
        {dataSources.map((dataSource) => (
          <GridItem xs={12} sm={6} item key={dataSource.data_source_id} sx={{ padding: '1rem' }}>
            {selectedDataSource?.data_source_id === dataSource.data_source_id ? (
              <SelectedDataSourceCard onClick={selectDataSourceHandler.bind(null, dataSource.data_source_id)}>
                <img width="50%" src={dataSource.integration_icon}></img>
                <br />
                <Typography variant="labelMedium14">{dataSource.name}</Typography>
              </SelectedDataSourceCard>
            ) : (
              <DataSourceCard onClick={selectDataSourceHandler.bind(null, dataSource.data_source_id)}>
                <img width="50%" src={dataSource.integration_icon}></img>
                <br />
                <Typography variant="labelMedium14">{dataSource.name}</Typography>
              </DataSourceCard>
            )}
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default DataSourceSelector;
