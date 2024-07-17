'use client';

import Header from '@/components/header/header';
import Navigation from '@/components/navigation/navigation';
import TableRow from '@/components/table/tableRow';
import { useEffect, useState } from 'react';
import { getRows } from '@/utils/api/rows';
import { newRowTemplate } from '@/utils/constants/newRowTemplate';
import styles from './dashboard.module.sass';
import { TreeResponse } from './dashboard.types';

export default function Dashboard() {
  const [data, setData] = useState<TreeResponse[]>([]);
  const [newRow] = useState<TreeResponse>(newRowTemplate);

  const getRowsData = async () => {
    const initialData = await getRows();
    setData(initialData);
  };

  useEffect(() => {
    getRowsData();

    return () => {};
  }, []);

  return (
    <div className={styles.bg}>
      <Header />
      <div className={styles.page}>
        <Navigation />
        <main className={styles.main}>
          <div className={styles.title}>
            <span>Строительно монтажные работы</span>
          </div>
          <div className={styles.content}>
            <table>
              <thead>
                <tr>
                  <th>Уровень</th>
                  <th>Наименование работ</th>
                  <th>Основная з/п</th>
                  <th>Оборудование</th>
                  <th>Накладные расходы</th>
                  <th>Сметная прибыль</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row: TreeResponse) => (
                  <TableRow
                    data={row}
                    parentId={row.id}
                    newRow={newRow}
                    setData={setData}
                    key={Math.random()}
                    level={1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
