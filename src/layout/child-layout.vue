<!--
    布局
-->
<template>
    <div class="child-layout">
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
                <router-view class="child-layout-inner" :key="key" />
            </keep-alive>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'ChildLayout',
    created () {},
    computed: {
        cachedViews () {
            return this.$store.state.tagsView.cachedViews
        },
        key () {
            return this.$route.fullPath
        }
    }
}
</script>
<style lang="scss" scoped></style>
