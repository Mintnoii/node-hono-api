<template>
  <div>JSON 编辑器</div>
  <JSONViewer />
</template>

<script setup lang="ts">
import { JSONViewer } from '@/shared/libs'
</script>

<route lang="yaml">
meta:
  layout: default
  menu: { show: true, order: 1, label: 'JSON 编辑器', icon: database }
</route>
