import { FileText, Trash2 } from 'lucide-react'
import styles from '../../app/dashboard.module.sass'
import { useEffect, useState } from 'react'

interface TableRowProps {
	data: TreeResponse
	level?: number
	parentId: number
	addRow: (parentId: number) => void
	addRowFetch: (updateRow: TreeResponse, parentId: number) => void
	updateRow: (id: number, updateRow: TreeResponse) => void
	deleteRow: (id: number) => void
}

export default function TableRow({
	data,
	level = 1,
	parentId,
	addRow,
	addRowFetch,
	updateRow,
	deleteRow,
}: TableRowProps) {
	const [currentRow, setCurrentRow] = useState(data)

	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isUpdate, setIsUpdate] = useState<boolean>(false)

	useEffect(() => {
		if (!data.rowName.length) {
			setIsEdit(true)
		}
	}, [])

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>,
		field: keyof TreeResponse
	) => {
		if (event.key === 'Enter') {
			if (currentRow.rowName.length) {
				if (isUpdate) {
					console.log(currentRow)
					updateRow(currentRow.id, currentRow)
					setIsEdit(false)
					setIsUpdate(false)
				} else {
					addRowFetch(currentRow, parentId)
					setIsEdit(false)
				}
			}
		}
	}

	const editingRow = () => {
		setIsEdit(true)
		setIsUpdate(true)
	}

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
							color='SteelBlue'
							className={styles.icon}
							onClick={() => {
								if (!isEdit) {
									addRow(data.id)
									setIsEdit(false)
								}
							}}
						/>
						{!isEdit && data.id != 1 && data.rowName.length ? (
							<Trash2
								size={20}
								color='red'
								className={styles.trash}
								onClick={() => {
									deleteRow(data.id)
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
								onKeyDown={e => handleKeyDown(e, 'rowName')}
								onChange={e => {
									setCurrentRow(prev => ({ ...prev, rowName: e.target.value }))
								}}
								value={currentRow.rowName}
							/>
						</td>
						<td>
							<input
								type='number'
								onKeyDown={e => handleKeyDown(e, 'salary')}
								onChange={e => {
									setCurrentRow(prev => ({ ...prev, salary: +e.target.value }))
								}}
								value={currentRow.salary}
							/>
						</td>
						<td>
							<input
								type='number'
								onKeyDown={e => handleKeyDown(e, 'equipmentCosts')}
								onChange={e => {
									setCurrentRow(prev => ({
										...prev,
										equipmentCosts: +e.target.value,
									}))
								}}
								value={currentRow.equipmentCosts}
							/>
						</td>
						<td>
							<input
								type='number'
								onKeyDown={e => handleKeyDown(e, 'supportCosts')}
								onChange={e => {
									setCurrentRow(prev => ({
										...prev,
										supportCosts: +e.target.value,
									}))
								}}
								value={currentRow.supportCosts}
							/>
						</td>
						<td>
							<input
								type='number'
								onKeyDown={e => handleKeyDown(e, 'estimatedProfit')}
								onChange={e => {
									setCurrentRow(prev => ({
										...prev,
										estimatedProfit: +e.target.value,
									}))
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
				data.child.map(child => {
					return (
						<TableRow
							key={Math.random()}
							data={child}
							level={level + 1}
							addRow={addRow}
							addRowFetch={addRowFetch}
							updateRow={updateRow}
							deleteRow={deleteRow}
							parentId={data.id}
						/>
					)
				})}
		</>
	)
}
