// @unocss-include
import systemLogo from '@/assets/icons/logo.svg?raw'

export function setupLoading() {
  // const themeColor = '#646cff'
  // const { r, g, b } = getRgb(themeColor)

  // rgb(100 108 255) '#646cff'
  const primaryColor = `--primary-color: ${100} ${108} ${255}`

  const loadingClasses = [
    'left-0 top-0',
    'left-0 bottom-0 animate-delay-500',
    'right-0 top-0 animate-delay-1000',
    'right-0 bottom-0 animate-delay-1500'
  ]

  const logoWithClass = systemLogo.replace('<svg', `<svg class="w-32 text-[rgb(var(--primary-color))]"`)

  const dot = loadingClasses
    .map(
      (item) => `<div class="absolute w-16 h-16 bg-[rgb(var(--primary-color))] rounded-8 animate-pulse ${item}"></div>`
    )
    .join('\n')

  const loading = `
  <div class="fixed left-0 top-0 wh-full flex-center flex-col" style="${primaryColor}">
    ${logoWithClass}
    <div class="w-56px h-56px my-36px">
      <div class="relative h-full animate-spin">
        ${dot}
      </div>
    </div>
    <h2 class="text-28px font-500 text-#646464">星云管理系统</h2>
  </div>`

  const app = document.getElementById('app')

  if (app) {
    app.innerHTML = loading
  }
}
