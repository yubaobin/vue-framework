<!--
  卡片组件
-->

<template>
  <div class="m-card">
    <div class="img-container">
      <slot name="img"></slot>
    </div>
    <div class="detail" v-text="title"></div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
      
      }
    }
  }
</script>
<style scoped lang="less">
  .m-card {
    background-color: #fff;
    box-shadow: 0 2px 5px fade(#000, 50);
    margin-bottom: 10px/@baseFontSize;
    .img-container {
      width: 100%;
      img {
        width: 100%;
        height: auto;
      }
    }
    .detail {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      padding: 3px 0px;
      box-sizing: border-box;
      color: #777;
      text-align: center;
    }
  }
</style>
