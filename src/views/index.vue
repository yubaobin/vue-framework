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
        <el-menu
          class="main-menu"
          unique-opened>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-1" style="padding-left: 44px;">标准化种植任务分布管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航二</span>
            </template>
            <el-menu-item index="2-1" style="padding-left: 44px;">选项1</el-menu-item>
          </el-submenu>
        </el-menu>
    </div>
    <router-view class="layout-body"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  data () {
    return {
    }
  },
  created () {
  }
}
</script>
