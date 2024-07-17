import { useCallback } from 'react';
import { TreeResponse } from '@/app/dashboard.types';
import { updateRowFetch } from '../api/rows';

const useUpdateRow = (
  id: number,
  updateRow: TreeResponse,
  setData: (callback: (prevData: TreeResponse[]) => TreeResponse[]) => void,
) =>
  useCallback(async () => {
    const updateRecursive = (rows: TreeResponse[]): TreeResponse[] =>
      rows.map((row) => {
        if (row.id === id) {
          return { ...row, ...updateRow };
        }
        return {
          ...row,
          child: row.child ? updateRecursive(row.child) : [],
        };
      });
    setData((prevData) => updateRecursive(prevData));
    await updateRowFetch(updateRow, updateRow.id);
  }, [id, updateRow, setData]);

export default useUpdateRow;
