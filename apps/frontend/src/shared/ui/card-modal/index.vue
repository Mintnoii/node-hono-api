<template>
  <slot name="trigger" :open="open" :close="close"></slot>
  <n-modal v-bind="$attrs" v-model:show="show" class="w-auto" preset="card" :auto-focus="false" :bordered="false">
    <slot></slot>
    <template #footer>
      <div v-if="showFooter" class="flex gap-12 justify-end">
        <xm-button @click="handleCancel">{{ cancelBtnAttr?.text }}</xm-button>
        <xm-button :disabled="confirmBtnAttr?.disabled" type="primary" @click="emits('confirm', { model, close })">{{
          confirmBtnAttr?.text
        }}</xm-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
interface ICardModal {
  showFooter?: boolean
  cancelBtn?: {
    disabled?: boolean
    text?: string
  }
  confirmBtn?: {
    disabled?: boolean
    text?: string
  }
}
const model = defineModel<any>('model', { default: {} })
const show = defineModel<boolean>('show', { default: false })
const open = () => {
  show.value = true
}
const close = () => (show.value = false)
const props = withDefaults(defineProps<ICardModal>(), {
  showFooter: true,
  cancelBtn: undefined,
  confirmBtn: undefined
})
const cancelBtnAttr = computed(() => ({ disabled: false, text: '取消', ...props.cancelBtn }))
const confirmBtnAttr = computed(() => ({ disabled: false, text: '确认', ...props.confirmBtn }))

const emits = defineEmits(['confirm', 'cancel', 'close'])

const handleCancel = () => {
  close()
  emits('cancel')
}

watch(show, (val) => {
  if (!val) {
    emits('close')
  }
})
</script>
