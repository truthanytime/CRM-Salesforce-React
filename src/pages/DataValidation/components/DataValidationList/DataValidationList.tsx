import { Box, IconButton } from '@mui/material';
import { DataGridPro, GridColDef, GridCellParams } from '@mui/x-data-grid-pro';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { mapDBColumnsAndFilterTypeInDataRaptor } from 'core/constants';
import theme from 'core/theme';
import { makeCorrectUrl, stringToDate } from 'core/utils';
import { useCallback, useEffect, useState } from 'react';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import { FilterIndex } from 'store/dataRaptor/types';
import { useMigration } from 'store/migration/hooks';
import { TableField } from 'store/migration/types';
import { BaseCheckbox, ColumnSortedAscendingIcon, ColumnSortedDescendingIcon, ColumnUnsortedIcon } from './ui';
import { DataListFooter } from './components/DataListFooter';
import { useDataRaptorRule } from 'store/dataRaptorRule/hooks';
import { Condition, RuleConditionComponentType } from 'store/dataRaptorRule/dto/rulesDto';
import { updateRecordOnMigrationTable } from 'http/migration';
import useValidation from './hook';
import renderProgress from 'components/renderProgress';

interface DataValidationListProps {
  toggleBookmark: (id: string) => void;
}

const DataValidationList = (props: DataValidationListProps) => {
  const [columns, setColumns] = useState<any[]>([]);
  const [rows, setData] = useState<any[]>([]);
  const { rowsPerPage, selectedTable, setFields } = useDataRaptor();
  const { loading, data } = useMigration();
  const {
    data: { rulesByMigrationAndTable },
  } = useDataRaptorRule();
  const { data: dataValidationData, pageSize, skip, getDataValidationData } = useValidation();
  const { migratedTableField, migrationId } = data;

  // const renderProgress = useCallback((value: number) => {
  //   const data = {
  //     color: theme.palette.green.main,
  //     text: 'Good',
  //   };
  //   if (value > 70) {
  //     data.color = theme.palette.green.main;
  //     data.text = 'Good';
  //   } else if (value > 50) {
  //     data.color = theme.palette.orange.main;
  //     data.text = 'Average';
  //   } else {
  //     data.color = theme.palette.red.main;
  //     data.text = 'Poor';
  //   }
  //   return (
  //     <Box
  //       sx={{
  //         p: 1,
  //         borderRadius: 1,
  //         backgroundColor: data.color,
  //       }}
  //     >
  //       {data.text} {value}/100
  //     </Box>
  //   );
  // }, []);
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

    newColumns.unshift({
      field: 'edit',
      headerName: 'EDIT',
      headerClassName: 'super-app-theme--header-middle',
      cellClassName: 'super-app-theme--cell',
      width: 64,
      renderCell() {
        return (
          <IconButton
            sx={{
              marginRight: 1,
              border: 1,
              color: theme.palette.blue.main,
              borderRadius: 2,
            }}
          >
            <RemoveRedEyeIcon></RemoveRedEyeIcon>
          </IconButton>
        );
      },
    });

    newColumns.unshift({
      field: 'bookmark',
      headerName: 'BOOKMARK',
      width: 64,
      resizable: true,
      renderCell: (params) => {
        return (
          <IconButton
            sx={{
              marginRight: 1,
              color: theme.palette.neutral.darkGray,
              borderRadius: 2,
              backgroundColor: theme.palette.lightBg.main,
            }}
          >
            {params.value ? <StarOutlinedIcon></StarOutlinedIcon> : <StarBorderOutlinedIcon></StarBorderOutlinedIcon>}
          </IconButton>
        );
      },
    });

    setFields(fields);
    setColumns(newColumns);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [migratedTableField]);

  useEffect(() => {
    getDataValidationData(migrationId, selectedTable, skip, pageSize);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [migrationId, selectedTable, skip, pageSize]);

  useEffect(() => {
    setData(dataValidationData);
  }, [dataValidationData]);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        backgroundColor: 'darkBg.main',
        position: 'relative',
        borderRadius: 0.5,
        px: 4,
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
        initialState={{ pinnedColumns: { left: ['bookmark', 'edit', 'confidence_score'] } }}
        components={{
          Footer: DataListFooter,
          BaseCheckbox,
          ColumnSortedAscendingIcon,
          ColumnSortedDescendingIcon,
          ColumnUnsortedIcon,
        }}
        getCellClassName={(params: GridCellParams<any, any, any>) => {
          const appliedRuleIds = Object.keys(params.row.rules_applied);
          const fields: string[] = [];
          appliedRuleIds.forEach((appliedRuleId) => {
            const rule = rulesByMigrationAndTable?.find((item) => item.ruleId === appliedRuleId);
            rule?.rule.where.forEach((condition) => {
              if (condition.type === RuleConditionComponentType.CONDITIONAL) {
                fields.push((condition as Condition).field.split('.')[1]);
              }
            });
          });
          if (fields.includes(params.field)) {
            return 'super-app-theme--highlight';
          } else {
            return '';
          }
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
        onCellClick={(params: GridCellParams) => {
          if (params.field === 'bookmark') {
            setData((prev) => {
              const temp = [...prev];
              const index = temp.findIndex((item) => item.id === params.id);
              const tempRow = temp[index];
              tempRow.bookmark = !tempRow.bookmark;
              temp.splice(index, 1, tempRow);
              try {
                updateRecordOnMigrationTable(data.migrationId, selectedTable, [tempRow]);
              } catch (e) {
                //eslint-disable-next-line no-console
                console.log('updationg record failed: ', e);
              }
              return temp;
            });
            props.toggleBookmark(params.row.Id as string);
          }
        }}
      />
    </Box>
  );
};
export default DataValidationList;
