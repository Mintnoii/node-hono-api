<template>
  <div class="login-page wh-full flex">
    <!-- <div class="w-25vw h-full bg-fill-1 flex-center">
      <div class="flex-col-center">
        <svg-icon name="logo" :width="96" :height="96" />
        <div class="mt-24 font-700 text-36 mb-16 text-text-1">Mint-Admin</div>
        <div class="text-text-3 text-20">🌿 薄荷管理系统</div>
      </div>
    </div> -->
    <div class="flex-1 flex-center">
      <n-card class="z-5 rounded-8 w-420 pb-36 shadow-sm shadow-light-700">
        <!-- <n-h1 class="text-center">
          <div class="text-20 font-600 flex items-baseline justify-center">欢迎登录薄荷管理系统</div>
        </n-h1> -->
          <h3 class="text-18px text-primary font-medium">{{ activeModule.label }}</h3>
         <Transition :name="'fade-slide'" mode="out-in" appear>
              <component :is="activeModule.component" />
            </Transition>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FormInst, FormItemRule } from 'naive-ui'
import { PwdLogin, Register} from '@/modules/user'
defineOptions({
  name: 'Login'
})

const moduleMap = {
  'pwd-login': { label: '登录', component: PwdLogin },
  // 'code-login': { label: loginModuleRecord['code-login'], component: CodeLogin },
  register: { label: '注册', component: Register },
  // 'reset-pwd': { label: loginModuleRecord['reset-pwd'], component: ResetPwd },
  // 'bind-wechat': { label: loginModuleRecord['bind-wechat'], component: BindWechat }
};
const activeModule = computed(() => moduleMap['register']);

interface ILoginBody {
  username: string
  password: string
  email: string
}

</script>
<route lang="yaml">
meta:
  layout: blank
</route>
