import { useCallback } from 'react';
import { TreeResponse } from '@/app/dashboard.types';
import { deleteRowFetch } from '../api/rows';

const useDeleteRow = (
  id: number,
  setData: (callback: (prevData: TreeResponse[]) => TreeResponse[]) => void,
) =>
  useCallback(async () => {
    const deleteRecursive = (items: TreeResponse[]): TreeResponse[] =>
      items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          child: deleteRecursive(item.child || []),
        }));
    setData((prevData) => deleteRecursive(prevData));

    await deleteRowFetch(id);
  }, [setData, id]);

export default useDeleteRow;
