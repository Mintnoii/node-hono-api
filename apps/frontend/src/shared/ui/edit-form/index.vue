<template>
  <n-scrollbar style="max-height: 60vh; padding-right: 20px">
    <n-form
      ref="formRef"
      v-bind="$attrs"
      :model="model"
      label-placement="left"
      label-width="auto"
      require-mark-placement="left"
    >
      <div v-for="item in items" :key="item.key">
        <div v-if="!item.field_type" class="relative w-full">
          <slot :name="item.name" :item />
        </div>
        <n-form-item
          v-else
          v-bind="item"
          :validation-status="validationStatus(item.name)"
          :feedback="feedback(item.name)"
        >
          <div v-if="item.field_type === 'custom'" class="relative w-full">
            <slot :name="item.name" :item />
          </div>
          <component
            :is="COMPONENTS_MAP[item.field_type]"
            v-else
            v-bind="item.field_props"
            v-model:value="model[item.name]"
            :name="item.name"
          />
        </n-form-item>
      </div>

      <slot />
    </n-form>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { FormItemProps, NInput, NInputNumber } from 'naive-ui'

type FieldType = 'input' | 'number' | 'select' | 'textarea' | 'password' | 'custom'
export interface IFormItem extends FormItemProps {
  key: string
  name: string
  field_type?: FieldType
  field_props?: Loose
  items?: IFormItem[]
}

interface IFromProps {
  items: IFormItem[]
}

const COMPONENTS_MAP: Loose = {
  input: NInput,
  number: NInputNumber,
  textarea: h(NInput, { type: 'textarea' }),
  password: h(NInput, { type: 'password', placeholder: '密码', showPasswordOn: 'mousedown' })
}

const model = defineModel<Loose>('model', { default: {} })

const formRef = ref()
const remoteMessages = ref<Loose[]>([])

withDefaults(defineProps<IFromProps>(), {
  items: () => []
})
const validationStatus = (name: string): any => {
  const names = remoteMessages.value.map((item) => item.key)
  return names.includes(name) ? 'error' : undefined
}
const feedback = (name: string) => {
  const mesaage = remoteMessages.value.find((item) => item.key === name)
  return mesaage ? mesaage.error_msg : null
}

defineExpose({
  model,
  validate: () => formRef.value.validate(),
  setMessages: (messages: any) => (remoteMessages.value = messages)
})
</script>
