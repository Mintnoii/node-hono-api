<template>
  <n-config-provider
    :theme="lightTheme"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="wh-full"
  >
    <AppProvider>
      <router-view />
    </AppProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN,NConfigProvider, darkTheme, lightTheme, useOsTheme  } from 'naive-ui'
// import type { GlobalTheme } from 'naive-ui'
// import AppProvider from ''
    const osThemeRef = useOsTheme()

// const theme = ref<GlobalTheme | null>(null)

const  theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null))
</script>