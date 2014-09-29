<template>
  <n-layout class="h-full flex-col">
    <!-- <n-layout-header :inverted="inverted" bordered>
      Header Header Header
      <n-menu mode="horizontal" :inverted="inverted" :options="menuOptions" />
    </n-layout-header> -->
    <n-layout has-sider class="h-full">
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        :inverted="inverted"
      >
        <n-menu
          :inverted="inverted"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          @update:value="handleMenu"
        />
      </n-layout-sider>
      <n-layout class="max-h-full box-border">
        <router-view />
      </n-layout>
    </n-layout>
    <!-- <n-layout-footer :inverted="inverted" bordered> Footer Footer Footer </n-layout-footer> -->
  </n-layout>
</template>

<script setup lang="ts">
import { MenuOption, NIcon } from 'naive-ui'
import { objectify, fork } from 'radash'
const inverted = ref(false)
const router = useRouter()

const groupRoutes = () => {
  const routes = router.getRoutes().filter((route) => route?.meta?.menu)
  const rootMap = objectify(routes, (r) => r.path)
  // console.log(routes, 'routes', rootMap)
  routes.forEach((route) => {
    const pathsArr = route.path.split('/')
    const preroutes = pathsArr.slice(0, -1).join('/')
    const parent = rootMap[preroutes]
    if (parent && !route.meta.hasParent) {
      route.meta.hasParent = true
      parent.children.push(route)
    }
  })
  let [menus] = fork(Object.values(rootMap), (item) => !item.meta.hasParent)
  menus = menus.map(routeMapper).sort((a: any, b: any) => a.order - b.order) as any
  menus.forEach((menu) => {
    menu.children = menu.children?.filter((item) => !!item.path)
  })
  return menus as any
}

const routeMapper = (route: any) => {
  const menu = route?.meta?.menu as any
  const children = route.children?.length
    ? route.children.map(routeMapper).sort((a: any, b: any) => a.order - b.order)
    : undefined

  return {
    label: menu?.label || '',
    path: route.path,
    key: route.path,
    order: menu?.order,
    type: menu?.type,
    icon: renderIcon({ name: menu.icon, size: 24 }),
    // activeIcon: renderIcon(BookIcon),
    ...(children && { children })
  }
}
const renderIcon = ({ name, size }: { name: any; size: number }) => {
  return () => h(NIcon, { name, size })
}

const menuOptions = groupRoutes()

const handleMenu = (key: string, item: MenuOption) => {
  console.log(key, item)
  router.push({ path: key })
  // emit("update:modelValue", e);
}
</script>
