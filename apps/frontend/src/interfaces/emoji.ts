import request from '@/services'

export const getEmojis = () => request('/api/emoji', { method: 'GET' })
export const deleteEmoji = (id: number) => request(`/api/emoji/${id}`, { method: 'DELETE' })

export default {
  getEmojis,
  deleteEmoji
}
