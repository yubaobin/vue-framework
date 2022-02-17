<!--
  组件名称：欢迎页面
  -->
<template>
    <div class="welcome-container">
        <div class="content">
            <h1 class="sh-title" :class="{ 'scale-in': show }">
                欢迎进入管理系统
            </h1>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Welcome',
    data () {
        return {
            show: false
        }
    },
    mounted () {
        window.setTimeout(() => {
            this.show = true
        }, 200)
    }
}
</script>
<style lang="scss" scoped>
.welcome-container {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    color: #379396;
    background-color: #d1eaeb;
    .sh-title {
        margin-bottom: 16px;
        font-size: 42px;
        font-weight: 500;
        padding: 64px 0 24px;
    }
    .h-title {
        margin: 0;
    }
}
.content {
    overflow: hidden;
    text-align: center;
    h1 {
        transition: transform 0.6s;
        transform: scale(1, 0) translateZ(0);
    }
    .scale-in {
        transform: scale(1, 1) translateZ(0);
    }
}
.web-img {
    display: block;
    width: 393px;
    margin: auto;
}
</style>
