import { Box, IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { DataGridPro, GridColDef, GRID_TREE_DATA_GROUPING_FIELD, DataGridProProps } from '@mui/x-data-grid-pro';
import theme from 'core/theme';
import { useCallback, useEffect, useState } from 'react';
import { useMigration } from 'store/migration/hooks';
import { flatDuplicateDetectionData } from 'utils/dataProcessing';
import { useDuplicateDetection } from 'store/duplicateDetection/hook';
import { DuplicateDetectionPageStatus } from 'store/duplicateDetection/types';
import renderProgress from 'components/renderProgress';

const mocData = [
  {
    ID: ['ID1', 'ID2', 'ID3'],
    Name: 'nameExactMatch',
    confidence_score: [10, 20, 50],
  },
  {
    ID: ['ID4', 'ID5', 'ID6'],
    Name: ['a', 'aa', 'aaa'],
    confidence_score: 50,
  },
];

const groupingColDef: DataGridProProps['groupingColDef'] = {
  headerName: 'More',
  width: 50,
};

const DuplicateDetectionGroupList = () => {
  const [columns, setColumns] = useState<any[]>([]);
  const [rows, setData] = useState<any[]>([]);
  const [rowsArray, setRowsArray] = useState<any[]>([]);
  const { setPageStatus, setRowPageData } = useDuplicateDetection();

  // Use effect hook to set columns and data state
  useEffect(() => {
    const newColumns: GridColDef[] = [];

    newColumns.push({
      field: 'Name',
      headerName: 'Name',
      headerClassName: 'h-40',
      flex: 3,
    });

    newColumns.push({
      field: 'confidence_score',
      headerName: 'SCORE',
      flex: 3,
      renderCell(params) {
        return renderProgress(params.value);
      },
    });

    newColumns.push({
      field: 'duplicates',
      headerName: 'DUPLICATES',
      flex: 3,
    });

    newColumns.push({
      field: 'edit',
      headerName: 'ACTION',
      headerClassName: 'super-app-theme--header-right',
      flex: 1,
      renderCell(params) {
        return (
          params.value && (
            <IconButton
              onClick={() => {
                setPageStatus(DuplicateDetectionPageStatus.ROWS);
                const adultName = params.row.path;
                const IDs = rows.filter((item) => item.path.includes(`${adultName}/`)).map((item) => item.ID);
                const temp = rowsArray
                  .filter((item) => IDs.includes(item.ID))
                  .map((item, index) => ({
                    id: index,
                    ...item,
                  }));
                setRowPageData(temp);
              }}
              sx={{
                marginRight: 1,
                border: 1,
                color: theme.palette.blue.main,
                borderRadius: 2,
                position: 'absolute',
                right: 30,
              }}
            >
              <RemoveRedEyeIcon></RemoveRedEyeIcon>
            </IconButton>
          )
        );
      },
    });

    setColumns(newColumns);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsArray, rows]);

  useEffect(() => {
    const temp = flatDuplicateDetectionData(mocData);
    setData(temp.groupArray);
    setRowsArray(temp.flattenData);
  }, [mocData]);

  return (
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'darkBg.main',
        borderRadius: 0.5,
        px: 4,
      }}
    >
      <DataGridPro
        treeData
        getTreeDataPath={(row) => row.path.split('/')}
        rows={rows}
        columns={columns}
        initialState={{ pinnedColumns: { left: [GRID_TREE_DATA_GROUPING_FIELD] } }}
        headerHeight={40}
        sx={{
          flex: 1,
        }}
        groupingColDef={groupingColDef}
      />
    </Box>
  );
};
export default DuplicateDetectionGroupList;
