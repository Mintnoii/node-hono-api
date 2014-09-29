<template>
  <NInput
    v-model="value"
    clearable
    placeholder="请输入"
    v-bind="$attrs"
    @keydown.enter="handleSearch"
    @blur="handleSearch"
  >
    <template #suffix>
      <svg-icon name="common/search" size="mini" class="cursor-pointer" @click.stop="handleSearch" />
    </template>
  </NInput>
</template>

<script setup lang="ts">
import { NInput } from 'naive-ui'
const value = defineModel({ default: '' })
const attrs = useAttrs()
const lastValue = ref(attrs.value)
const emits = defineEmits(['search'])
// 输入框的值变化时触发搜索，同时记录最后的值，避免重复搜索
const handleSearch = () => {
  if (lastValue.value !== attrs.value) {
    lastValue.value = attrs.value
    emits('search')
  }
}
</script>
