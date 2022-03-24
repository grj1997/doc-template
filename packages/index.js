import mobile from './mobile/index'
import TV from './TV/index'
import toolData from './tool/index'
const fn = (arr, type) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i].__type__ = type
  }
}
fn(mobile, 'mobile')
fn(TV, 'TV')

export const components = [
  ...mobile,
  ...TV
]
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  components.map(components => {
    console.log('components', components)
    if (!components.install) {
      console.log('------', components.__type__ === 'TV' ? 'Tv-' + components.name : 'DM-' + components.name)
      Vue.component(components.__type__ === 'TV' ? 'Tv-' + components.name : 'M-' + components.name, components)
    } else {
      Vue.use(components)
    }
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export const tool = toolData
export const init = {
  install,
  ...components
}
