<!--
    侧栏菜单
-->

<template>
    <div class="main-menu">
        <el-menu :unique-opened="true" :router="true" :default-active="$route.path">
            <template v-for="item in list">
                <el-submenu v-if="item.children && item.children.length" :index="item.id" :key="item.id"  >
                    <template slot="title"  style="padding-left:10px" >
                        <i v-if="item.icon" class="iconfont" :class="item.icon"></i>
                        <span slot="title">{{ item.name}}</span>
                    </template>
                    <slide-menu :list="item.children"></slide-menu>
                </el-submenu>
                <el-menu-item v-else :key="item.id" :index="item.path" style="padding-left: 44px;" @select="select">
                    <span>{{item.name}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
export default {
  name: 'SlideMenu',
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  methods: {
    select () {
      console.log(123)
    }
  }
}
</script>
<style scoped lang="less">
</style>
