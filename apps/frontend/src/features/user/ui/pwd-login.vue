<template>
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <!-- <NFormItem path="phone">
      <NInput v-model:value="model.phone" placeholder="手机号" />
    </NFormItem> -->
    <!-- <NFormItem path="code">
      <div class="w-full flex-y-center gap-16px">
        <NInput v-model:value="model.code" :placeholder="$t('page.login.common.codePlaceholder')" />
        <NButton size="large" :disabled="isCounting" :loading="loading" @click="getCaptcha(model.phone)">
          {{ label }}
        </NButton>
      </div>
    </NFormItem> -->
    <!-- <NFormItem path="name">
      <NInput v-model:value="model.name" placeholder="请输入名称" />
    </NFormItem> -->
    <NFormItem path="email">
      <NInput v-model:value="model.email" placeholder="请输入邮箱" />
    </NFormItem>
    <NFormItem path="password">
      <NInput v-model:value="model.password" type="password" show-password-on="click" placeholder="输入密码" />
    </NFormItem>
    <!-- <NFormItem path="confirmPassword">
      <NInput
        v-model:value="model.confirmPassword"
        type="password"
        show-password-on="click"
        placeholder="再次输入密码"
      />
    </NFormItem> -->
    <NSpace vertical :size="18" class="w-full">
      <NButton class="flex-1" block @click="emits('register')"> 没有账号？去注册 </NButton>
      <NButton type="primary" size="large" round block @click="handleSubmit"> 登录 </NButton>
      <!-- <NButton size="large" round block @click="toggleLoginModule('pwd-login')">
        {{ $t('page.login.common.back') }}
      </NButton> -->
    </NSpace>
  </NForm>
</template>

<script lang="ts" setup>
import { FormInst, FormItemRule } from 'naive-ui'
// import { getUserInfo, useUser } from '@/entities/user'
// import { isValidPhoneNumber } from '@/shared/lib'
import useMintForm from '@/shared/hooks/use-mint-form'
import { UserApi } from '@/entities/user'

const { formRef, validate } = useMintForm()
// const { userLogin, setUserInfo } = useUser()
const router = useRouter()
const emits = defineEmits(['register'])
defineOptions({
  name: 'Login'
})

interface ILoginBody {
  username: string
  password: string
  email: string | undefined
}

const model = reactive<ILoginBody>({
  username: '',
  password: '',
  email: undefined
})
const rules = {
  username: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        // const isValid = isValidPhoneNumber(value)
        const isValid = true
        if (!value) {
          return new Error('请输入手机号')
        } else if (!isValid) {
          return new Error('请输入正确的邮箱')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [{ required: true, message: '请输入密码!', trigger: ['input', 'blur'] }]
}
const handleSubmit = async (e: MouseEvent | KeyboardEvent) => {
  await validate()
  const [err, resp] = await UserApi.login(model)
  if (err || !resp.ok) {
    window.$message?.error('登录失败')
  } else {
    window.$message?.success('登录成功')
  }
  // try {
  //   await formRef.value?.validate()
  //   const [err, resp] = await userLogin(formState)
  //   if (err || !resp?.ok) {
  //     // window.$message.error(err.msg || '账号或密码错误')
  //   } else {
  //     const { key, user_id = '' } = resp?.data || {}
  //     setUserInfo({
  //       ...resp?.data,
  //       authorization: `token ${user_id} ${key}`
  //     })
  //     router.push({ path: '/application/manage' })
  //     window.$message.success('登录成功')
  //   }
  // } catch (err) {
  //   console.log(err)
  // }
}
</script>
<route lang="yaml">
meta:
  layout: blank
</route>
