import request from '@/app/services'

export const getEmojis = (params?: { name?: string }) => request('/api/emoji', { method: 'GET', params })
export const getEmojiDetail = (id: number) => request(`/api/emoji/${id}`, { method: 'GET' })
export const addEmoji = (data: Loose) => request('/api/emoji', { method: 'POST', data })
export const deleteEmoji = (id: number) => request(`/api/emoji/${id}`, { method: 'DELETE' })
export const updateEmoji = (id: number, data: Loose) => request(`/api/emoji/${id}`, { method: 'PUT', data })

export default {
  getEmojis,
  getEmojiDetail,
  addEmoji,
  deleteEmoji,
  updateEmoji
}
