import { useCallback } from 'react'
import { deleteRowFetch } from '../api/rows'

export const useDeleteRow = (
	id: number,
	setData: (callback: (prevData: TreeResponse[]) => TreeResponse[]) => void
) => {
	return useCallback(async () => {
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
	}, [id])
}
