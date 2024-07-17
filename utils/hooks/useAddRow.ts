import { useCallback } from 'react'

export const useAddRow = (
	parentId: number | null,
	newRow: TreeResponse,
	setData: (callback: (prevData: TreeResponse[]) => TreeResponse[]) => void
) => {
	return useCallback(() => {
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
	}, [parentId, newRow, setData])
}
