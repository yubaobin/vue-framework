<!--
  demo页面
-->

<template>
    <div>
      <mt-header title="demo" :fixed="true">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="wrapper"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <card v-for="(item, index) in datalist" :key="index" :title="item.title">
          <img slot="img" :src="item.img"/>
        </card>
      </div>
    </div>
</template>
<script>
  import api from '@/api'
  import Card from 'components/card'
  
  import demo1 from '@/assets/demo1.jpeg'
  import demo2 from '@/assets/demo2.jpeg'
  
  export default {
    data() {
      return {
        loading: false,
        imglist: [],
        datalist: []
      }
    },
    created() {
      this.imglist = [demo1, demo2];
      this.datalist = [
        { img: demo1, title: '介绍'},
        { img: demo2, title: '介绍'},
        { img: demo1, title: '介绍'},
        { img: demo2, title: '介绍'}
      ]
    },
    components: {
      Card
    },
    methods: {
      loadMore() {
        var me = this;
        this.loading = true;
        setTimeout(() => {
          const index = me.datalist.length
          const img = me.imglist[index%2]
          me.datalist.push({ img, title: `介绍${index}` })
          me.loading = false
        }, 1500);
      }
    }
  }
</script>
<style lang="less">
  .wrapper {
    background-color: #cdcdcd;
    padding: 10px/@baseFontSize;
  }
</style>

