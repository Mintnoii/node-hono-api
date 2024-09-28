<template>
  <div>home-subpage</div>

  <JSONViewer />
</template>

<script setup lang="ts">
import { JSONViewer } from '@/shared/libs'
</script>

<route lang="yaml">
meta:
  layout: default
  menu: { show: true, order: 1, label: '二级页面', icon: database }
</route>
<style lang="scss" scoped></style>
