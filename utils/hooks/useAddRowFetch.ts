import { useCallback } from 'react'
import { createRow, getRows } from '../api/rows'

export const useAddRowFetch = (
	updateRow: TreeResponse,
	parentId: number,
	setData: (callback: (prevData: TreeResponse[]) => TreeResponse[]) => void
) => {
	return useCallback(async () => {
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
					return {
						...row,
						child: [newRow],
					}
				}
				return {
					...row,
					child: row.child ? updateRecursive(row.child) : [],
				}
			})
		}

		const initialData = await getRows()
		setData(initialData)
	}, [updateRow, parentId, setData])
}
