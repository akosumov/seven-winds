import { api } from './api'

export const getRows = async () => {
	try {
		const res = await api.get('/list')
		return res.data
	} catch (error) {
		console.log(error)
		throw new Error('Failed to get rows')
	}
}

export const createRow = async (row: OutlayRowRequest) => {
	try {
		const res = await api.post('/create', row)
		return res.data
	} catch (error) {
		console.log(error)
		throw new Error('Failed to create row')
	}
}

export const updateRowFetch = async (
	row: OutlayRowUpdateRequest,
	rID: number
) => {
	try {
		const res = await api.post(`/${rID}/update`, row)
		return res.data
	} catch (error) {
		console.log(error)
		throw new Error('Failed to create row')
	}
}

export const deleteRowFetch = async (rID: number) => {
	try {
		const res = await api.delete(`/${rID}/delete`)
		return res.data
	} catch (error) {
		console.log(error)
		throw new Error('Failed to create row')
	}
}
