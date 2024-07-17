'use client';

import { useState } from 'react';

import { Undo, Grip } from 'lucide-react';

import styles from './header.module.sass';

export default function Header() {
  const [isActive] = useState<boolean>(true);

  return (
    <div className={styles.header}>
      <Grip size={30} className={styles.elem} />
      <Undo size={30} className={styles.elem} />
      <div className={isActive ? styles.active : styles.elem}>Просмотр</div>
      <div className={styles.elem}>Управление</div>
    </div>
  );
}
