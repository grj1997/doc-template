<template>
  <div id="app">
    <div class="menu">
      <div v-for="(item, index) in menuList" :class="(active === index) && 'active'" :key="index + '-menu'" @click="fn(item.name, index)">{{item.__type__}}>{{item.name}}<span v-if="(active === index)" @click.prevent.stop="showDoc()">-文档</span></div>
    </div>
    <div class="content" v-if="menuList.length">
      <div :class="menuList[active].__type__ === 'TV' ? 'content-TV' : 'content-mobile'" v-show="!status">
        <router-view />
      </div>
      <div class="doc" v-if="status">
        <p>API</p>
        <table border="1" v-if="props.length">
          <tr>
            <th>属性</th>
            <th>类型</th>
            <th>默认值</th>
            <th>说明</th>
          </tr>
          <tr v-for="(propsItem, index) in props" :key="index + '-prop'">
            <td>{{propsItem.key}}</td>
            <td>{{typeof propsItem.value.type()}}</td>
            <td>{{propsItem.value.default}}</td>
            <td>{{propsItem.value.dsc}}</td>
          </tr>
        </table>
        <p>事件</p>
        <table border="1" v-if="emit.length">
          <tr>
            <th>名称</th>
            <th>参数</th>
            <th>说明</th>
          </tr>
          <tr v-for="(emitItem, index) in emit" :key="index + '-prop'">
            <td>{{emitItem.key}}</td>
            <td>{{emitItem.value.props}}</td>
            <td>{{emitItem.value.dsc}}</td>
          </tr>
        </table>
        <p>使用方式</p>
        <div class="specification">
          &lt;{{
          (menuList[active].__type__ === 'TV' ? 'Tv-' : 'M-') + menuList[active].name
          }}
          /&gt;
        </div>
        {{!props.length ? '暂无文档' : ''}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      status: false,
      emit: [],
      props: [],
      active: 0,
      menuList: []
    }
  },
  mounted(){
    this.menuList = window.$unifyQrCodeComponents
  },
  methods: {
    showDoc () {
      this.status = !this.status
      this.props = []
      this.emit = []
      if (this.menuList[this.active].props) {
        Object.keys(this.menuList[this.active].props).map(key => {
          this.props.push({
            key,
            value: this.menuList[this.active].props[key]
          })
        })
      }
      if (this.menuList[this.active].emits) {
        Object.keys(this.menuList[this.active].emits).map(key => {
          this.emit.push({
            key,
            value: this.menuList[this.active].emits[key]
          })
        })
      }
    },
    fn(name, index) {
      this.status = false
      this.active = index
      this.$router.push({
        name
      })
    }
  }
}
</script>

<style lang="scss">
  html,body{
    margin: 0;
    width: 100%;
    height: 100%;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
  overflow: hidden;
  .menu{
    padding-top: 8PX;
    height: 100%;
    overflow-y: scroll;
    width: 240PX;
    font-size: 20PX;
    div{
      padding: 6PX 16PX;
      cursor: pointer;
    }
    .active{
      color: cornflowerblue;
    }
  }
  .tv-key-focus {
    transform: scale(1.15);
    transition: 200ms;
    border-radius: 10PX;
    position: relative;
    z-index: 1;
    &:after {
      position: absolute;
      left: -6PX;
      top: -6PX;
      content: ' ';
      width: calc(100% + 4PX);
      height: calc(100% + 4PX);
      background: rgba(0, 0, 0, 0);
      border-radius: 16PX;
      border: 4PX solid white;
      z-index: 0;
    }
  }
  .content{
    flex: 1;
    &-TV{
      background: #031b24;
      width: 100%;
      height: 100%;
      > div{
        border: 1px solid red;
        position: absolute;
        left: 0;
        top: 0;
        width: 1920PX;
        height: 1080PX;
        transform: scale(0.85) translateY(-8%) translateX(8%);
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none
        }
      }
    }
    &-mobile{
      border: 1px solid red;
      border-radius: 16PX;
      margin: 40PX auto;
      width: 375PX;
      height: 667PX;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none
      }
    }
    .doc{
      width: 100%;
      height: calc(100%);
      padding: 16PX;
      background: white;
      font-size: 40PX;
      overflow-y: scroll;
      z-index: 9999;
      p{
        text-align: left;
      }
      table{
        width: 100%;
      }
      td{
        padding: 16PX;
      }
      .specification{
        background: #282c34;
        padding: 16PX;
        margin-top: 16PX;
        color: white;
      }
    }
  }
}
</style>
