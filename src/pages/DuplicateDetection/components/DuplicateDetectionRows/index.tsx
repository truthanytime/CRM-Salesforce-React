import { Box } from '@mui/material';
import { DataGridPro, GridColDef, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid-pro';
import { mapDBColumnsAndFilterTypeInDataRaptor } from 'core/constants';
import theme from 'core/theme';
import { makeCorrectUrl, stringToDate } from 'core/utils';
import { useCallback, useEffect, useState } from 'react';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import { FilterIndex } from 'store/dataRaptor/types';
import { useMigration } from 'store/migration/hooks';
import { TableField } from 'store/migration/types';
import {
  BaseCheckbox,
  ColumnSortedAscendingIcon,
  ColumnSortedDescendingIcon,
  ColumnUnsortedIcon,
} from 'pages/DataValidation/components/DataValidationList/ui';
import { useDuplicateDetection } from 'store/duplicateDetection/hook';
import renderProgress from 'components/renderProgress';

const DuplicateDetectionRowList = () => {
  const { rowsPageData, setMergingRows } = useDuplicateDetection();
  const [pageSize, setPageSize] = useState<number>(25);
  const [columns, setColumns] = useState<any[]>([]);
  const [rows, setData] = useState<any[]>([]);
  const { rowsPerPage, setFields } = useDataRaptor();
  const {
    loading,
    data: { migratedTableField },
  } = useMigration();

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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [migratedTableField]);

  useEffect(() => {
    if (rowsPageData && rowsPageData.length !== 0) {
      setData([...rowsPageData]);
    }
  }, [rowsPageData]);

  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'darkBg.main',
        borderRadius: 0.5,
        px: 4,
      }}
    >
      <DataGridPro
        checkboxSelection
        loading={loading === true}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPage}
        disableSelectionOnClick
        headerHeight={40}
        initialState={{ pinnedColumns: { left: [GRID_CHECKBOX_SELECTION_COL_DEF.field, 'confidence_score'] } }}
        components={{
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
          '& .super-app-theme--highlight': {
            bgcolor: theme.palette.yellow.light,
          },
        }}
        onSelectionModelChange={(data) => {
          setMergingRows([...data]);
        }}
      />
    </Box>
  );
};
export default DuplicateDetectionRowList;
