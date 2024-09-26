<script setup lang="ts">
import { computed, reactive } from 'vue';
import {FormItemRule} from 'naive-ui'
import {UserApi} from '@/interfaces'
// import { useRouterPush } from '@/hooks/common/router';
// import { useFormRules, useNaiveForm } from '@/hooks/common/form';
// import { useCaptcha } from '@/hooks/business/captcha';

defineOptions({
  name: 'Register'
});

// const { toggleLoginModule } = useRouterPush();
// const { formRef, validate } = useNaiveForm();
// const { label, isCounting, loading, getCaptcha } = useCaptcha();

interface FormModel {
  // phone: string;
  // code: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const model: FormModel = reactive({
  // phone: '',
  // code: '',
  email: '',
  password: '',
  confirmPassword: ''
});

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
  console.log(model,'model')
  UserApi.register(model)
  // await validate();
  // // request to register
  // window.$message?.success($t('page.login.common.validateSuccess'));
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
    <NFormItem path="email">
      <NInput v-model:value="model.email" placeholder="请输入邮箱" />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        placeholder="输入密码"
      />
    </NFormItem>
    <NFormItem path="confirmPassword">
      <NInput
        v-model:value="model.confirmPassword"
        type="password"
        show-password-on="click"
        placeholder="再次输入密码"
      />
    </NFormItem>
    <NSpace vertical :size="18" class="w-full">
      <NButton type="primary" size="large" round block @click="handleSubmit">
        注册
      </NButton>
      <!-- <NButton size="large" round block @click="toggleLoginModule('pwd-login')">
        {{ $t('page.login.common.back') }}
      </NButton> -->
    </NSpace>
  </NForm>
</template>

<style scoped></style>
