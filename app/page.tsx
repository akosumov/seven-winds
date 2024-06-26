'use client'

import Header from '@/components/header/header'
import styles from './dashboard.module.sass'
import Navigation from '@/components/navigation/navigation'
import TableRow from '@/components/table/tableRow'
import { useEffect, useState } from 'react'
import {
	createRow,
	deleteRowFetch,
	getRows,
	updateRowFetch,
} from '@/utils/api/rows'

export default function Dashboard() {
	const [data, setData] = useState<TreeResponse[]>([])
	const [newRow, setNewRow] = useState<TreeResponse>({
		child: [],
		equipmentCosts: 0,
		estimatedProfit: 0,
		id: 0,
		machineOperatorSalary: 0,
		mainCosts: 0,
		materials: 0,
		mimExploitation: 0,
		overheads: 0,
		rowName: '',
		salary: 0,
		supportCosts: 0,
		total: 0,
	})

	const getRowsData = async () => {
		const initialData = await getRows()

		setData(initialData)
	}

	useEffect(() => {
		getRowsData()

		return () => {}
	}, [])

	const addRow = (parentId: number | null) => {
		const newDataRecursive = (rows: TreeResponse[]): TreeResponse[] => {
			return rows.map(row => {
				if (row.id === parentId) {
					return {
						...row,
						child: row.child ? [...row.child, newRow] : [newRow],
					}
				}

				return {
					...row,
					child: row.child ? newDataRecursive(row.child) : [],
				}
			})
		}
		setData(prevData => newDataRecursive(prevData))
	}

	const addRowFetch = async (updateRow: TreeResponse, parentId: number) => {
		const res = await createRow({
			equipmentCosts: updateRow.equipmentCosts,
			estimatedProfit: updateRow.estimatedProfit,
			machineOperatorSalary: updateRow.machineOperatorSalary,
			mainCosts: updateRow.mainCosts,
			materials: updateRow.materials,
			mimExploitation: updateRow.mimExploitation,
			overheads: updateRow.overheads,
			parentId: parentId,
			rowName: updateRow.rowName,
			salary: updateRow.salary,
			supportCosts: updateRow.supportCosts,
		})

		const newRow: TreeResponse = { ...updateRow, id: res.current.id }

		const updateRecursive = (rows: TreeResponse[]): TreeResponse[] => {
			return rows.map(row => {
				if (row.id === parentId) {
					return { ...row, child: [newRow] }
				}
				return {
					...row,
					child: row.child ? updateRecursive(row.child) : [],
				}
			})
		}
		setData(prevData => updateRecursive(prevData))
	}

	const updateRow = async (id: number, updateRow: TreeResponse) => {
		const updateRecursive = (rows: TreeResponse[]): TreeResponse[] => {
			return rows.map(row => {
				if (row.id === id) {
					return { ...row, ...updateRow }
				}
				return {
					...row,
					child: row.child ? updateRecursive(row.child) : [],
				}
			})
		}
		setData(prevData => updateRecursive(prevData))
		const res = await updateRowFetch(updateRow, updateRow.id)
	}

	const deleteRow = async (id: number) => {
		const deleteRecursive = (items: TreeResponse[]): TreeResponse[] => {
			return items
				.filter(item => item.id !== id)
				.map(item => ({
					...item,
					child: deleteRecursive(item.child || []),
				}))
		}
		setData(prevData => deleteRecursive(prevData))

		await deleteRowFetch(id)
	}

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
								{data.map((row: TreeResponse) => {
									return (
										<TableRow
											data={row}
											parentId={row.id}
											key={Math.random()}
											addRow={addRow}
											updateRow={updateRow}
											deleteRow={deleteRow}
											addRowFetch={addRowFetch}
										/>
									)
								})}
							</tbody>
						</table>
					</div>
				</main>
			</div>
		</div>
	)
}
