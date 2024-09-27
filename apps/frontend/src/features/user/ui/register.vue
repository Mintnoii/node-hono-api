<script setup lang="ts">
import { FormItemRule } from 'naive-ui'
import { UserApi } from '@/entities/user'

// import { useRouterPush } from '@/hooks/common/router';
// import { useFormRules, useNaiveForm } from '@/hooks/common/form';
// import { useCaptcha } from '@/hooks/business/captcha';
const emits = defineEmits(['pwd-login'])
defineOptions({
  name: 'Register'
})

// const { toggleLoginModule } = useRouterPush();
// const { formRef, validate } = useNaiveForm();
// const { label, isCounting, loading, getCaptcha } = useCaptcha();

interface FormModel {
  // phone: string;
  // code: string;
  name: string
  email: string | undefined
  password: string
  // confirmPassword: string;
}

const model: FormModel = reactive({
  // phone: '',
  // code: '',
  name: 'TestUser',
  email: undefined,
  password: ''
  // confirmPassword: ''
})

// const rules = computed<Record<keyof FormModel, FormItemRule[]>>(() => {
//   const { formRules, createConfirmPwdRule } = useFormRules();

//   return {
//     phone: formRules.phone,
//     code: formRules.code,
//     password: formRules.pwd,
//     confirmPassword: createConfirmPwdRule(model.password)
//   };
// });
async function handleSubmit() {
  console.log(model, 'model')
  const [err, resp] = await UserApi.register(model)
  if (err || !resp.ok) {
    window.$message?.error('注册失败')
  } else {
    window.$message?.success('注册成功')
    await UserApi.login(model)
    // await authStore.login(model.userName, model.password);
  }
}
</script>

<template>
  <NForm ref="formRef" :model="model" size="large" :show-label="false">
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
    <NFormItem path="name">
      <NInput v-model:value="model.name" placeholder="请输入名称" />
    </NFormItem>
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
      <NButton type="primary" size="large" round block @click="handleSubmit"> 注册 </NButton>
      <NButton size="large" round block @click="emits('pwd-login')"> 返回 </NButton>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
