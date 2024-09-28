<template>
  <div class="wh-full flex-col gap-10 p-10">
    <div class="flex-center justify-between">
      <n-h2>图片列表</n-h2>
      <n-button type="primary" @click="createNew"> 新增图片 </n-button>
    </div>
    <div class="list-container">
      <n-card
        v-for="item in emojis"
        :key="item.id"
        class="w-200 cursor-pointer"
        content-class="p-4!"
        size="small"
        @click.stop="showDetail(item)"
      >
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
import { EmojiApi } from '@/interfaces'
import { Refresh } from '@vicons/ionicons5'
import { NThing } from 'naive-ui'
import EditForm from '@/shared/ui/edit-form/index.vue'
const emojis = ref<Loose>([])
const options = [
  {
    label: '重命名',
    key: 'rename'
  },
  {
    label: '删除',
    key: 'delete'
  }
]
const handleDelete = async () => {
  //  const [err, resp] = await DemoApi.deleteEmojis(1)
}
const model = ref<Loose>({
  name: 'test'
})
const refresh = async () => {
  // fetch('/api/emoji')
  const [err, resp] = await EmojiApi.getEmojis()
  console.log(resp, 'resp')
  emojis.value = resp?.data
}
const onSelect = async (key: string, item: Loose) => {
  if (key === 'rename') {
    // emits('rename', props.app)
    window.$dialog?.info({
      title: '重命名',
      positiveText: '确定',
      content: () =>
        h(EditForm, {
          model: model.value,
          'onUpdate:model': (newValue) => (model.value = newValue),
          items: [
            {
              key: 'name',
              name: 'name',
              path: 'name',
              label: '名称',
              field_type: 'input',
              field_props: {
                placeholder: '请输入名称'
              }
            }
          ]
        }),
      onPositiveClick: async () => {
        await EmojiApi.updateEmoji(item.id, model.value)
        window.$message?.success('修改成功')
        refresh()
        // 立即关闭弹窗
        return true
      }
    })
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
const createNew = async () => {
  const [err, resp] = await EmojiApi.addEmoji({
    name: 'test',
    url: 'https://picsum.photos/seed/picsum/200/200'
  })
  if (err) return
  window.$message?.success('创建成功')
  refresh()
}
const showDetail = async (item: Loose) => {
  const [err, resp] = await EmojiApi.getEmojiDetail(item.id)
  if (err) return
  window.$dialog?.info({
    title: `${resp?.data?.name}`,
    content: () =>
      h(NThing, {
        size: 'small',
        // title: `${resp?.data?.name}`,
        content: JSON.stringify(resp?.data)
      })
  })
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
  // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 自动适应列数 */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px; /* 设置卡片间距 */
}
</style>
