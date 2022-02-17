<!--
    布局
-->
<template>
    <div :class="classObj" class="app-wrapper">
        <slide-menu class="sidebar-container"></slide-menu>
        <div :class="{ hasTagsView: needTagsView }" class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <navbar></navbar>
                <tags-view v-if="needTagsView"></tags-view>
            </div>
            <app-main></app-main>
        </div>
    </div>
</template>
<script>
import { AppMain, Navbar, SlideMenu, TagsView } from './components'
import { mapGetters } from 'vuex'
import config from '@/config'
export default {
    name: 'Layout',
    components: {
        AppMain,
        Navbar,
        SlideMenu,
        TagsView
    },
    data () {
        return {
            fixedHeader: config.setting.fixedHeader,
            needTagsView: config.setting.needTagsView
        }
    },
    computed: {
        ...mapGetters(['openSlidemenu']),
        classObj () {
            return {
                hideSidebar: !this.openSlidemenu,
                openSidebar: this.openSlidemenu
            }
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped></style>
