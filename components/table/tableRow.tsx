import { FileText, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import useAddRow from '@/utils/hooks/useAddRow';
import useAddRowFetch from '@/utils/hooks/useAddRowFetch';
import useUpdateRow from '@/utils/hooks/useUpdateRow';
import useDeleteRow from '@/utils/hooks/useDeleteRow';
import { TreeResponse } from '@/app/dashboard.types';
import styles from '../../app/dashboard.module.sass';

interface TableRowProps {
  data: TreeResponse;
  level: number;
  parentId: number;
  newRow: TreeResponse;
  setData: (callback: (prevData: TreeResponse[]) => TreeResponse[]) => void;
}

export default function TableRow({
  data,
  level = 1,
  parentId,
  newRow,
  setData,
}: TableRowProps) {
  const [currentRow, setCurrentRow] = useState(data);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const addRow = useAddRow(data.id, newRow, setData);
  const addRowFetch = useAddRowFetch(currentRow, parentId, setData);
  const updateRow = useUpdateRow(currentRow.id, currentRow, setData);
  const deleteRow = useDeleteRow(data.id, setData);

  useEffect(() => {
    if (!data.rowName.length) {
      setIsEdit(true);
    }
  }, [data.rowName.length]);

  const editingRow = () => {
    setIsEdit(true);
    setIsUpdate(true);
  };
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      if (currentRow.rowName.length) {
        if (isUpdate) {
          await updateRow();
          setIsEdit(false);
          setIsUpdate(false);
        } else {
          await addRowFetch();
          setIsEdit(false);
        }
      }
    }
  };

  return (
    <>
      <tr onDoubleClick={editingRow}>
        <td>
          <div
            className={styles.icons}
            style={{ marginLeft: `${level * 10 + 25}px` }}
          >
            <FileText
              size={20}
              color="SteelBlue"
              className={styles.icon}
              onClick={() => {
                if (!isEdit) {
                  addRow();
                  setIsEdit(false);
                }
              }}
            />
            {!isEdit && data.id !== 1 && data.rowName.length ? (
              <Trash2
                size={20}
                color="red"
                className={styles.trash}
                onClick={() => {
                  deleteRow();
                }}
              />
            ) : (
              ''
            )}
          </div>
        </td>
        {isEdit ? (
          <>
            <td>
              <input
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => {
                  setCurrentRow((prev) => ({
                    ...prev,
                    rowName: e.target.value,
                  }));
                }}
                value={currentRow.rowName}
              />
            </td>
            <td>
              <input
                type="number"
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => {
                  setCurrentRow((prev) => ({
                    ...prev,
                    salary: +e.target.value,
                  }));
                }}
                value={currentRow.salary}
              />
            </td>
            <td>
              <input
                type="number"
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => {
                  setCurrentRow((prev) => ({
                    ...prev,
                    equipmentCosts: +e.target.value,
                  }));
                }}
                value={currentRow.equipmentCosts}
              />
            </td>
            <td>
              <input
                type="number"
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => {
                  setCurrentRow((prev) => ({
                    ...prev,
                    supportCosts: +e.target.value,
                  }));
                }}
                value={currentRow.supportCosts}
              />
            </td>
            <td>
              <input
                type="number"
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e) => {
                  setCurrentRow((prev) => ({
                    ...prev,
                    estimatedProfit: +e.target.value,
                  }));
                }}
                value={currentRow.estimatedProfit}
              />
            </td>
          </>
        ) : (
          <>
            <td>{data.rowName}</td>
            <td>{data.salary}</td>
            <td>{data.equipmentCosts}</td>
            <td>{data.supportCosts}</td>
            <td>{data.estimatedProfit}</td>
          </>
        )}
      </tr>
      {data.child &&
        data.child.map((child) => (
          <TableRow
            key={Math.random()}
            data={child}
            level={level + 1}
            parentId={data.id}
            newRow={newRow}
            setData={setData}
          />
        ))}
    </>
  );
}
