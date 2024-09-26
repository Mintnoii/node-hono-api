import request from '@/services'

export const getUsers = () => request('/api/emoji', { method: 'GET' })
