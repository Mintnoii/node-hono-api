import { useUserStore } from './store'

export const useUser = () => {
  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)
  const { setUserInfo } = userStore
  const logout = () => userStore.$reset()

  return {
    userInfo,
    setUserInfo,
    logout
  }
}
