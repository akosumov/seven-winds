import styles from './navigation.module.sass'
import { ChevronDown, LayoutDashboard } from 'lucide-react'

export default function Navigation() {
	const data = [
		'По проекту',
		'Объекты',
		'РД',
		'МТО',
		'СМР',
		'График',
		'МиМ',
		'Рабочие',
		'Капвложение',
		'Бюджет',
		'Финансирование',
		'Панормы',
		'Камеры',
		'Поручения',
		'Контрагенты',
	]

	return (
		<aside className={styles.aside}>
			<div className={styles.search}>
				<div className={styles.items}>
					<span>Название проекта</span>
					<span>Аббревиатура</span>
				</div>
				<ChevronDown size={25} className={styles.chevron} />
			</div>

			<div className={styles.box}>
				{data.map(item => (
					<div className={styles.item} key={item}>
						<LayoutDashboard size={25} />
						<span>{item}</span>
					</div>
				))}
			</div>
		</aside>
	)
}
