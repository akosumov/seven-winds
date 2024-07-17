import { useCallback } from 'react'
import { updateRowFetch } from '../api/rows'

export const useUpdateRow = (
	id: number,
	updateRow: TreeResponse,
	setData: (callback: (prevData: TreeResponse[]) => TreeResponse[]) => void
) => {
	return useCallback(async () => {
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
	}, [id, updateRow, setData])
}
