<!--
    首页
-->
<template>
  <div class="layout-container">
    <div class="layout-header bg-header">
      <div class="layout-logo">
        <img src="~images/logo.png" />
        <p>陈皮产业安全监管系统</p>
      </div>
      <div class="layout-header-right">
        <el-menu mode="horizontal" text-color="#fff">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>切换系统</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <img class="tx-user" src="~images/logo.png" />
            <span slot="title">选项1</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="iconfont icon-out"></i>
            <span slot="title">退出</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="layout-side">
        <slide-menu :list="menulist"></slide-menu>
    </div>
    <router-view class="layout-body"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import SlideMenu from 'components/SlideMenu'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      menulist: [{
        name: '公共',
        icon: 'icon-set',
        children: [{
          name: '表格', path: '/table'
        }]
      }]
    }
  },
  components: {
    SlideMenu
  },
  methods: {
    ...mapActions(['login'])
  },
  created () {
    this.login()
  }
}
</script>
