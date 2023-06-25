import { FC, ChangeEvent } from 'react';
import { gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Pagination, Stack, PaginationRenderItemParams } from '@mui/material';

import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { PaginationItem } from './ui';

const TablePagination: FC = () => {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const renderItem = (item: PaginationRenderItemParams) => {
    return <PaginationItem {...item} components={{ previous: ChevronLeftIcon, next: ChevronRightIcon }} />;
  };

  return (
    <Stack sx={{ marginRight: -3 }}>
      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        onChange={(event: ChangeEvent<unknown>, page: number) => apiRef.current.setPage(page - 1)}
        renderItem={renderItem}
      />
    </Stack>
  );
};

export default TablePagination;
