/// <reference types="vite/client" />

declare interface Window {
  theme: any
  /** NProgress instance */
  NProgress?: import('nprogress').NProgress
  /** Loading bar instance */
  $loadingBar?: import('naive-ui').LoadingBarProviderInst
  // /** Dialog instance */
  $dialog?: import('naive-ui').DialogProviderInst
  // /** Message instance */
  $message?: import('naive-ui').MessageProviderInst
  // /** Notification instance */
  $notification?: import('naive-ui').NotificationProviderInst
  [key: string]: any
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
