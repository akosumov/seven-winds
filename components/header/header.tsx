'use client'

import { useState } from 'react'

import styles from './header.module.sass'
import { Undo } from 'lucide-react'
import { Grip } from 'lucide-react'

export default function Header() {
	const [isActive, setIsActive] = useState<boolean>(true)

	return (
		<div className={styles.header}>
			<Grip size={30} className={styles.elem} />
			<Undo size={30} className={styles.elem} />
			<div className={isActive ? styles.active : styles.elem}>Просмотр</div>
			<div className={styles.elem}>Управление</div>
		</div>
	)
}
