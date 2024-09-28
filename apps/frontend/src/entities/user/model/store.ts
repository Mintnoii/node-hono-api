import { defineStore } from 'pinia'
import { UserInfo } from '../types'

const defaultUserInfo: UserInfo = {
  id: '',
  token: '',
  username: '',
  accessToken: ''
}

export const useUserStore = defineStore(
  'userStore',
  () => {
    const userInfo = ref<Loose>(defaultUserInfo)
    const setUserInfo = (payload: Loose) => {
      const { id, token } = payload
      userInfo.value = { ...payload, accessToken: `token ${id} ${token}` }
    }
    return { userInfo, setUserInfo, persist: true }
  },
  {
    persist: {
      key: 'MINT_ADMIN_USERINFO'
    }
  }
)
