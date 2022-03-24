# 文档组件库模板

## 相关配置
```
vue.config.js 中配置了postcss-px2rem 支持1920和375两种尺寸的组件
mobile为移动端组件
TV 为大屏1920*1080规格的组件 不需要 可以自行配置修改

```
### 开发步骤
```
1.执行yarn newModule 创建组件
2.在packages中进行组件开发即可
3.router.js中引入xxx-doc.vue配置路由
3.在views中的xxx-doc.vue下引入组件
<Tv-xxx></Tv-xxx>或 <M-xxx/>
4.测试没有问题可以执行build命令生成文档、lib命令生成闭包文件
```
