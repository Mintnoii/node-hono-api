<template>
 <n-form
          ref="formRef"
          name="login"
          autocomplete="off"
          label-placement="left"
          label-width="auto"
          :model="formState"
          :rules="formRule"
        >
          <!-- <n-form-item class="mb-10" name="username" path="username">
            <n-input
              v-model:value="formState.username"
              class="box-input"
              placeholder="请输入手机号"
              clearable
              @keydown.enter="onFinish"
            />
          </n-form-item> -->
          <n-form-item class="mb-10" name="email" path="email">
            <n-input
              v-model:value="formState.email"
              class="box-input"
              placeholder="请输入邮箱"
              clearable
              @keydown.enter="onFinish"
            />
          </n-form-item>
          <n-form-item name="password" path="password">
            <n-input
              v-model:value="formState.password"
              type="password"
              class="box-input"
              show-password-on="click"
              placeholder="请输入密码"
              @keydown.enter="onFinish"
            />
          </n-form-item>
          <div class="flex justify-end text-14 text-text-2">
            <n-popover trigger="hover" placement="bottom">
              <template #trigger>
                <div>忘记密码？</div>
              </template>
              <span>请联系开发者</span>
            </n-popover>
          </div>
          <n-button block class="mt-34" type="primary" @click="onFinish"> 登录 </n-button>
        </n-form>
</template>

<script lang="ts" setup>
import { FormInst, FormItemRule } from 'naive-ui'
// import { getUserInfo, useUser } from '@/entities/user'
// import { isValidPhoneNumber } from '@/shared/lib'


const formRef = ref<FormInst | null>(null)

// const { userLogin, setUserInfo } = useUser()
const router = useRouter()

defineOptions({
  name: 'Login'
})

interface ILoginBody {
  username: string
  password: string
  email: string
}

const formState = reactive<ILoginBody>({
  username: '',
  password: '',
  email: ''
})
const formRule = {
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
const onFinish = async (e: MouseEvent | KeyboardEvent) => {
  e.preventDefault()
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
