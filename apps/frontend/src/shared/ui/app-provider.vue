<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <ContextHolder />
          <slot />
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<script setup lang="ts">
import { createTextVNode, defineComponent } from 'vue'
import {
  useDialog,
  useLoadingBar,
  useMessage,
  useNotification,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider
} from 'naive-ui'
defineOptions({ name: 'AppProvider' })

const ContextHolder = defineComponent({
  name: 'ContextHolder',
  setup() {
    function register() {
      window.$loadingBar = useLoadingBar()
      window.$dialog = useDialog()
      window.$message = useMessage()
      window.$notification = useNotification()
    }

    register()

    return () => createTextVNode()
  }
})
</script>
<style lang="scss">
.n-notification-wrapper {
  .n-notification {
    .n-notification-main {
      .n-notification-main-footer {
        flex-direction: row-reverse;
      }
    }
  }
}
</style>
