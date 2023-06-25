import { Pagination, PaginationRenderItemParams, Stack } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDataRaptor } from 'store/dataRaptor/hooks';
import { useMigration } from 'store/migration/hooks';
import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { PaginationItem } from '../ui';
import { CustomSelect } from 'components/CustomSelect';

// TeamFooter component
export const DataListFooter = () => {
  const { pageSize, totalDataCount, rowsPerPage, pageIndex, setPageIndex, setPageSize } = useDataRaptor();
  const { data, getMigrationTableDataById } = useMigration();
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (totalDataCount !== undefined && totalDataCount) {
      setPageCount(Math.floor(totalDataCount / pageSize) + 1);
      setPageIndex(0);
    }
  }, [totalDataCount, pageSize]);

  useEffect(() => {
    if (pageSize && data.migratedTableName.length) {
      getMigrationTableDataById({
        migrationId: data.migrationId,
        tableId: data.migratedTableName,
        skip: pageIndex * pageSize,
        take: pageSize,
      });
    }
  }, [pageSize, pageIndex]);

  const handleChangePageSize = (value: number) => {
    setPageSize(value);
    setPageIndex(0);
    setPage(1);
  };

  const handleChangePageIndex = (value: number) => {
    setPageIndex(value - 1);
    setPage(value);
  };

  const renderItem = (item: PaginationRenderItemParams) => {
    return <PaginationItem {...item} components={{ previous: ChevronLeftIcon, next: ChevronRightIcon }} />;
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end">
      <CustomSelect<number>
        value={pageSize}
        options={rowsPerPage.map((size) => ({ label: `${size} per page`, value: size }))}
        onSelect={async (value) => handleChangePageSize(value)}
        small
      />
      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={(event: ChangeEvent<unknown>, page: number) => handleChangePageIndex(page)}
        renderItem={renderItem}
      />
    </Stack>
  );
};
