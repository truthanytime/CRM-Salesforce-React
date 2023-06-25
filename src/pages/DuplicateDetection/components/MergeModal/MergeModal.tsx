import { useState, useCallback, useEffect } from 'react';

import {
  Box,
  IconButton,
  Stack,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import theme from 'core/theme';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import { useDuplicateDetection } from 'store/duplicateDetection/hook';
import { useMigration } from 'store/migration/hooks';

interface MergeModalInterface {
  closeMergeModal: () => void;
  [key: string]: any;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1280,
  innerHeight: 800,
};
const MergeModal = (props: MergeModalInterface) => {
  const { rowsPageData, mergingRows, mergedRow, setMergedRow } = useDuplicateDetection();
  const {
    data: { migratedTableField },
  } = useMigration();
  const [mergeModalStage, setMergeModalStage] = useState<number>(0);
  const [mergingRowsData, setMergingRowsData] = useState<any[]>([]);

  const handleBack = useCallback(() => {
    if (mergeModalStage === 0) {
      props.closeMergeModal();
    } else {
      setMergeModalStage((prev) => prev - 1);
    }
  }, [mergeModalStage]);

  const handleNext = useCallback(() => {
    if (mergeModalStage === 0) {
      setMergeModalStage((prev) => prev + 1);
    }
    if (mergeModalStage === 1) {
      handleMerge();
    }
  }, [mergeModalStage]);

  const handleMerge = useCallback(() => {
    console.log('handling merge');
  }, []);

  useEffect(() => {
    const temp = rowsPageData.filter((item) => mergingRows.includes(item.id));
    setMergingRowsData(temp);
    setMergedRow(temp[0]);
  }, [mergingRows, rowsPageData]);

  return (
    <Box {...props} sx={modalStyle}>
      <Stack direction="row" alignItems="center" bgcolor="white" py={3} px={4} borderRadius="4px 4px 0 0">
        <Typography variant="h3" width={1184}>
          Merge Duplicate Account
        </Typography>
        <IconButton onClick={() => props.closeMergeModal()}>
          <CloseIcon></CloseIcon>
        </IconButton>
      </Stack>

      <Box bgcolor="lightBg.main" py={3} px={4}>
        <Stack>
          <Typography variant="b16">
            {mergeModalStage === 0 ? 'Select the fields to merge' : 'Merged Account'}
          </Typography>
          <Typography variant="labelRegular12" color="primary.gray">
            {mergeModalStage === 0 ? 'Then click Next and choose the fields to keep.' : 'Then click Merge.'}
          </Typography>
        </Stack>
        <Box bgcolor="white" mt={3} p={2}>
          <Typography variant="labelRegular12" color="primary.gray">
            {mergeModalStage === 0 && 'Select the fields you want to merge'}
          </Typography>
          <Box height={500} sx={{ overflowY: 'scroll', mt: 2 }}>
            <Table sx={{ mt: 2 }}>
              <TableHead>
                <TableRow sx={{ textTransform: 'uppercase', bgcolor: 'lightBg.main' }}>
                  <TableCell>FIRST BLOCK</TableCell>
                  {mergeModalStage === 0 ? (
                    <>
                      {mergingRowsData.map((item, index) => (
                        <TableCell key={index}>
                          <Radio
                            checked={mergedRow.id === item.id}
                            onClick={() => {
                              setMergedRow({ ...item });
                            }}
                          ></Radio>
                          select all
                        </TableCell>
                      ))}
                    </>
                  ) : (
                    <TableCell>value</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {migratedTableField.map((field) => (
                  <TableRow key={field.Id}>
                    <TableCell>{field.fieldName}</TableCell>
                    {(mergeModalStage === 0 ? mergingRowsData : [mergedRow])
                      .map((item) => item[field.fieldName])
                      .filter((value, index, self) => {
                        return self.indexOf(value) === index;
                      })
                      .map((item, index) => (
                        <TableCell key={`${index}-${field.Id}`}>
                          {mergeModalStage === 0 && (
                            <Radio
                              checked={mergedRow[field.fieldName] === item}
                              onClick={() => {
                                const temp = { ...mergedRow };
                                temp[field.fieldName] = item;
                                setMergedRow(temp);
                              }}
                            ></Radio>
                          )}
                          {item}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>

      <Stack direction="row" justifyContent="space-between" py={3} px={4} borderRadius="0 0 4px 4px" bgcolor="white">
        <SecondaryButton onClick={handleBack}>Back</SecondaryButton>
        <PrimaryButton onClick={handleNext}>{mergeModalStage === 1 ? 'Merge' : 'Next'}</PrimaryButton>
      </Stack>
    </Box>
  );
};

export default MergeModal;
