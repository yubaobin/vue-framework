<!--
    菜单展开收缩按钮
    @params: isActive  true: 展开, false: 收缩
    @method toggleClick 点击事件
-->
<template>
    <div style="padding: 0 15px;" @click="toggleClick">
        <svg-icon
            class="hamburger"
            :class="{ 'is-active': isActive }"
            iconName="indent"></svg-icon>
    </div>
</template>

<script>
export default {
    name: 'Hamburger',
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggleClick () {
            this.$emit('toggleClick')
        }
    }
}
</script>

<style scoped lang="scss">
.hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    font-size: 20px;
    &.svg-icon {
        vertical-align: middle;
    }
}
.hamburger.is-active {
    transform: rotate(180deg);
}
</style>
