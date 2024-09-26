<template>
  <div class="wh-full flex-col gap-10 p-10">
    <div>图片列表</div>
    <div class="list-container">
      <n-card v-for="item in emojis" :key="item.id" class="w-200" content-class="p-4!" size="small">
        <template #cover>
          <div class="w-200 h-200">
            <img class="wh-full" :src="item.url" />
          </div>
        </template>
        <div class="flex items-center justify-between">
          {{ item.name }}
          <n-dropdown trigger="click" :options @select="(key) => onSelect(key, item)">
            <svg-icon name="common/more-circle" size="mini" class="cursor-pointer" @click.stop />
          </n-dropdown>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {EmojiApi} from '@/interfaces'
import { Refresh } from '@vicons/ionicons5'
const emojis = ref<Loose>([])
const options = [
  {
    label: '重命名',
    key: 'rename'
  },
  // {
  //   label: '复制',
  //   key: 'copy'
  // },
  {
    label: '删除',
    key: 'delete'
  }
]
const handleDelete = async () => {
  //  const [err, resp] = await DemoApi.deleteEmojis(1)
}
const refresh = async () => {
  // fetch('/api/emoji')
  const [err, resp] = await EmojiApi.getEmojis()
  console.log(resp, 'resp')
  emojis.value = resp?.data
}
const onSelect = async (key: string, item: Loose) => {
  if (key === 'rename') {
    // emits('rename', props.app)
  } else if (key === 'copy') {
    // handleCopy()
  } else if (key === 'delete') {
    await EmojiApi.deleteEmoji(item.id)
    refresh()
    // window.$dialog.error({
    //   title: '删除确认',
    //   content: () =>
    //     h(XmThing, {
    //       size: 'small',
    //       title: `确认要删除${props.app?.name}应用吗？`,
    //       content: '一旦你点击删除按钮，该应用会被立即删除，此操作无法撤销'
    //     }),
    //   negativeText: '取消',
    //   positiveText: '删除',
    //   onPositiveClick: () => {
    //     handleDelete()
    //     // 立即关闭弹窗
    //     return true
    //   }
    // })
  }
}

onMounted(() => refresh())
</script>

<route lang="yaml">
meta:
  layout: default
  menu: { show: true, order: 1, label: '图片列表', icon: database }
</route>

<style lang="scss" scoped>
.list-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 自动适应列数 */
  gap: 10px; /* 设置卡片间距 */
}
</style>
