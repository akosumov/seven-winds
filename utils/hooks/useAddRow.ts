import { useCallback } from 'react';
import { TreeResponse } from '@/app/dashboard.types';

const useAddRow = (
  parentId: number | null,
  newRow: TreeResponse,
  setData: (callback: (prevData: TreeResponse[]) => TreeResponse[]) => void,
) =>
  useCallback(() => {
    const newDataRecursive = (rows: TreeResponse[]): TreeResponse[] =>
      rows.map((row) => {
        if (row.id === parentId) {
          return {
            ...row,
            child: row.child ? [...row.child, newRow] : [newRow],
          };
        }

        return {
          ...row,
          child: row.child ? newDataRecursive(row.child) : [],
        };
      });
    setData((prevData) => newDataRecursive(prevData));
  }, [parentId, newRow, setData]);

export default useAddRow;
