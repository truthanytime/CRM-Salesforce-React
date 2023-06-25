import { Box } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { ReactComponent as BoxLeftButtonIcon } from 'assets/icons/boxLeft.svg';
import { ReactComponent as BoxRightButtonIcon } from 'assets/icons/boxRight.svg';
import { mapDBColumnsAndFilterTypeInDataRaptor } from 'core/constants';
import theme from 'core/theme';
import { makeCorrectUrl, stringToDate } from 'core/utils';
import { useEffect, useState } from 'react';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import { FilterIndex } from 'store/dataRaptor/types';
import { useMigration } from 'store/migration/hooks';
import { TableField } from 'store/migration/types';
import {
  BaseCheckbox,
  ColumnSortedAscendingIcon,
  ColumnSortedDescendingIcon,
  ColumnUnsortedIcon,
  FloatingIconButton,
} from './ui';
import { DataListFooter } from './components/DataListFooter';
import renderProgress from 'components/renderProgress';

// Interface for DataRaptorList component props
interface DataRaptorListProps {
  data: any[];
}

// DataRaptorList component
const DataRaptorList = (props: DataRaptorListProps) => {
  const [columns, setColumns] = useState<any[]>([]);
  const [rows, setData] = useState<any[]>([]);
  const { pageSize, rowsPerPage, confidenceScoreSectionState, updateConfidenceScoreSectionState, setFields } =
    useDataRaptor();
  const { loading, data } = useMigration();
  const { migratedTableField } = data;
  // Use effect hook to set columns and data state
  useEffect(() => {
    const newColumns: GridColDef[] = [];
    const fields: FilterIndex[] = [];
    migratedTableField.forEach((field: TableField, index: number) => {
      if (index == 0) {
        newColumns.push({
          field: 'id',
          headerName: '#',
          headerClassName: 'super-app-theme--header-left',
          cellClassName: 'super-app-theme--cell-left',
          width: 64,
          resizable: true,
        });
      } else {
        const column = {
          field: field.fieldName,
          headerName: field.fieldName,
          headerClassName: 'super-app-theme--header-middle',
          cellClassName: 'super-app-theme--cell',
          resizable: true,
        };
        switch (mapDBColumnsAndFilterTypeInDataRaptor.get(field.type)) {
          case 'number':
            newColumns.push({ ...column, width: 150 });
            fields.push({ name: field.fieldName, type: 'number', operator: '', compare: '', xsd_type: field.xsd_type });
            break;
          case 'text':
            if (field.type === 'url') {
              newColumns.push({
                ...column,
                renderCell: (params) => {
                  return (
                    <a href={makeCorrectUrl(params.value)} target="_blank" rel="noreferrer">
                      {params.value}
                    </a>
                  );
                },
                width: 200,
              });
            } else {
              newColumns.push({ ...column, width: 150 });
            }
            fields.push({ name: field.fieldName, type: 'text', operator: '', compare: '', xsd_type: field.xsd_type });
            break;
          case 'date':
            newColumns.push({ ...column, renderCell: (params) => stringToDate(params.value), width: 150 });
            fields.push({ name: field.fieldName, type: 'date', operator: '', compare: '', xsd_type: field.xsd_type });
            break;
          case 'dropdown':
            newColumns.push({ ...column, width: 150 });
            fields.push({
              name: field.fieldName,
              type: 'dropdown',
              operator: '',
              compare: '',
              xsd_type: field.xsd_type,
            });
            break;
          default:
            newColumns.push({
              ...column,
              valueGetter: ({ value }) => value && JSON.stringify(value),
              // headerClassName: 'hidden',
              // cellClassName: 'hidden',
              width: 200,
            });
        }
      }
    });

    const confidenceScoreColumnIndex = newColumns.findIndex((item) => item.field === 'confidence_score');
    if (confidenceScoreColumnIndex > -1) {
      const temp = { ...newColumns[confidenceScoreColumnIndex] };
      newColumns.splice(confidenceScoreColumnIndex, 1);
      newColumns.unshift({
        ...temp,
        renderCell(params) {
          return renderProgress(params.value);
        },
      });
    }

    setFields(fields);
    setColumns(newColumns);
  }, [migratedTableField]);

  useEffect(() => {
    setData(props.data as any[]);
  }, [props.data]);

  // Confidence Score Field hide or show
  const handleConfidenceScoreField = (e: any) => {
    updateConfidenceScoreSectionState();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        backgroundColor: 'darkBg.main',
        position: 'relative',
        borderRadius: 0.5,
      }}
    >
      <DataGridPro
        loading={loading === true}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPage}
        disableSelectionOnClick
        headerHeight={40}
        initialState={{ pinnedColumns: { left: ['confidence_score'] } }}
        components={{
          Footer: DataListFooter,
          BaseCheckbox,
          ColumnSortedAscendingIcon,
          ColumnSortedDescendingIcon,
          ColumnUnsortedIcon,
        }}
        sx={{
          '& .super-app-theme--header-left': {
            ml: 2,
            px: 1,
            borderRight: `1px solid ${theme.palette.neutral.n200}`,
          },
          '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
            display: 'unset',
          },
          '& .hidden': {
            display: 'none',
          },
          '& .super-app-theme--header-middle': {
            borderRight: `1px solid ${theme.palette.neutral.n200}`,
            px: 1,
            width: 'fit-content',
          },
          '& .super-app-theme--cell': {
            px: 1,
          },
          '& .super-app-theme--cell-left': {
            ml: 2,
            px: 1,
          },
        }}
      />
      <FloatingIconButton onClick={handleConfidenceScoreField}>
        {confidenceScoreSectionState && <BoxRightButtonIcon width={10} height={10} />}
        {!confidenceScoreSectionState && <BoxLeftButtonIcon width={10} height={10} />}
      </FloatingIconButton>
    </Box>
  );
};
export default DataRaptorList;
