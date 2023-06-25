import { useCallback, useState, useEffect } from 'react';
import {
  getDataValidationViolatedMigrationTableDataById,
  getValidationViolatedDataTotalById,
} from 'http/dataRaptor/dataRaptorRules';

const useDataValidation = () => {
  const [pageSize, setPageSize] = useState<number>(25);
  const [skip, setSkip] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [violatedTotalCount, setViolatedTotalCount] = useState<number>(0);

  useEffect(() => {
    setSkip(pageIndex * pageSize);
  }, [pageIndex]);

  const getDataValidationData = useCallback(
    async (migrationId: string, tableId: string, skip: number, pageSize: number) => {
      const backendData = await getDataValidationViolatedMigrationTableDataById(migrationId, tableId, skip, pageSize);
      const temp: any[] = [];
      backendData.forEach((item: any, index: number) => {
        temp.push({
          edit: true,
          id: pageIndex * pageSize + index + 1,
          ...item,
        });
      });
      setData(temp);
    },
    [],
  );

  const getDataValidationTotalCount = useCallback(async (migrationId: string, tableId: string) => {
    const totalCount = await getValidationViolatedDataTotalById(migrationId, tableId);
    setViolatedTotalCount(totalCount);
  }, []);

  return {
    pageSize,
    pageIndex,
    skip,
    data,
    violatedTotalCount,
    setPageSize,
    setPageIndex,
    getDataValidationData,
    getDataValidationTotalCount,
  };
};

export default useDataValidation;
