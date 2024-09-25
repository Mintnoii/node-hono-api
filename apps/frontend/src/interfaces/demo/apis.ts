import request from '@/services'

/**
 * 获取所有数字人，即配置树
 * @url /dmp/material/index/
 * @method GET
 */
// const getSettings = () => myRequest('/dmp/material/index/')

// const userLogin = (data: any) => myRequest('/user/account/admin_login/', { method: 'POST', data })

const getEmojis = () => request('/api/emoji', { method: 'GET' })
const deleteEmoji = (id: number) => request(`/api/emoji/${id}`, { method: 'DELETE' })

export default {
  getEmojis,
  deleteEmoji
}
