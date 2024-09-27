import request from '@/app/services'

export const getUsers = () => request('/api/user', { method: 'GET' })
export const register = (data: Loose) => request('/api/users/register', { method: 'POST', data })
export const login = (data: Loose) => request('/api/users/login', { method: 'POST', data })
