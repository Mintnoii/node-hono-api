<template>
  <span :class="`svg-icon ${size || ''}`" :style="{ width: `${width}px`, height: `${height}px` }">
    <svg aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>
  </span>
</template>

<script setup lang="ts">
interface Props {
  name: string
  size?: 'mini' | 'small' | 'middle' | 'large'
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  width: 28,
  height: 28
})

const symbolId = computed(() => {
  const namePathArr = String(props.name).replace('/', '-')
  return `#svg-icon-${namePathArr}`
})
</script>

<style lang="scss">
.svg-icon {
  position: relative;
  display: inline-block;
  vertical-align: baseline;

  svg {
    display: inline-block;
    width: 100%;
    height: 100%;
    outline: none;
    vertical-align: baseline;
  }

  &.mini svg {
    transform: scale(0.8);
  }

  &.small svg {
    transform: scale(0.9);
  }

  &.middle svg {
    transform: scale(1.2);
  }

  &.large svg {
    transform: scale(1.5);
  }
}
</style>
