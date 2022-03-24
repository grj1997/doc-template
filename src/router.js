import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
let routers = [
  {
    path: '/',
    redirect: '/test-doc',
  },
  {
    path: '/test-doc',
    name: 'test',
    component: () => import(/* webpackChunkName: 'home' */ '@/views/test-doc.vue'),
  },
]
export default new Router({
  mode: 'hash',
  routes: routers,
});
