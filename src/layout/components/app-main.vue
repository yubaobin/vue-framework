<template>
    <div class="app-main">
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
                <router-view class="layout-wrapper" :key="key" />
            </keep-alive>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'AppMain',
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
