<!--
  关于页面
-->

<template>
    <div>
      <mt-header title="关于" :fixed="true">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="about-view">
        <mt-cell title="版本" value="v1.0"></mt-cell>
      </div>
    </div>
</template>
<script>
import api from '@/api'
  export default {
    data() {
      return {}
    },
    created() {
      api.about().then((res)=>{
        console.log(res);
      }).catch(() => {

      });
    }
  }
</script>
<style scoped lang="less">
  .about-view {
    position: absolute;
    top: 60px;
    width: 100%;
    bottom: 0px;
  }
</style>
