import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible';
// $unifyQrCodeComponents 用于文档使用
import {init, components, tool} from '../packages/index'
import focusable from 'vue-tv-focusable';
import router from './router.js'
const vm = new Vue();
Vue.config.productionTip = false
Vue.use(focusable);
Vue.prototype.$tool = tool
vm.$tv.init({
  KEYS: {
    KEY_LEFT: [37], // ←
    KEY_UP: [38], // ↑
    KEY_RIGHT: [39], // →
    KEY_DOWN: [40], // ↓
    KEY_ENTER: [83, 13], // 83: s键  13：enter键
  },
  focusClassName: 'tv-key-focus',
  offsetDistance: 50,
  longPressTime: 500,
});
Vue.use(init)
window.$unifyQrCodeComponents = components.filter(component => !component.install)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
