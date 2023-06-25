import { FC, useState, useMemo, useCallback } from 'react';
import { useGridApiContext, useGridRootProps, GridSelectedRowCount } from '@mui/x-data-grid';

import { TablePagination } from '../TablePagination';
import { CustomSelect } from '../CustomSelect';
import { SecondaryRedButton } from '../ui';
import { Container, SelectedRowsContainer } from './ui';
import { Typography } from '@mui/material';
import { DeleteModal } from 'components/DeleteModal';
import { noop } from 'core/utils';

interface TableFooterProps {
  entity: string;
  pluralEntity: string;
  idProp: string;
  onDelete: (ids: number[]) => Promise<void>;
  onSuccess?: () => void;
}

const TableFooter: FC<TableFooterProps> = ({ entity, pluralEntity, idProp, onDelete, onSuccess = noop }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();
  const selectedRows = apiRef.current.getSelectedRows();

  const selectedIds = useMemo(() => {
    const selectedIds: number[] = [];

    selectedRows.forEach((value) => {
      selectedIds.push(value[idProp]);
    });

    return selectedIds;
  }, [idProp, selectedRows]);

  const toggleModalOpen = useCallback(() => {
    setModalOpen((prevState) => !prevState);
  }, []);

  const onDeleteSelected = useCallback(async () => {
    if (selectedIds.length === 0) return;
    setError(false);
    setLoading(true);
    try {
      await onDelete(selectedIds);
      onSuccess();
      toggleModalOpen();
    } catch (err) {
      setError((err as Error)?.message ?? true);
    }
    setLoading(false);
  }, [onDelete, onSuccess, selectedIds, toggleModalOpen]);

  if (rootProps.hideFooter) return null;

  return (
    <>
      <Container>
        {!!error && (
          <Typography variant="p12" sx={{ marginRight: 1, color: 'red.main' }}>
            {typeof error === 'string' ? error : 'Something went wrong!'}
          </Typography>
        )}

        {!rootProps.hideFooterRowCount && selectedRows.size > 0 && (
          <SelectedRowsContainer>
            <GridSelectedRowCount selectedRowCount={selectedRows.size} />

            <SecondaryRedButton onClick={toggleModalOpen}>Delete</SecondaryRedButton>
          </SelectedRowsContainer>
        )}

        <CustomSelect<number>
          value={rootProps.pageSize as number}
          options={rootProps.rowsPerPageOptions.map((size) => ({ label: `${size} per page`, value: size }))}
          onSelect={async (value) => apiRef.current.setPageSize(value)}
          small
        />

        {!rootProps.hideFooterPagination && <TablePagination />}
      </Container>

      <DeleteModal
        open={modalOpen}
        toggleOpen={toggleModalOpen}
        loading={loading}
        error={error}
        entity={selectedIds.length === 1 ? entity : undefined}
        pluralEntity={selectedIds.length > 1 ? pluralEntity : undefined}
        onDelete={onDeleteSelected}
      />
    </>
  );
};

export default TableFooter;
