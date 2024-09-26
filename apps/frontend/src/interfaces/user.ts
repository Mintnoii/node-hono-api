import request from '@/services'

export const getUsers = () => request('/api/user', { method: 'GET' })
export const register = (data:Loose) => request('/api/users/register', { method: 'POST', data })
