<template>
    <div :class="{ 'has-logo': showLogo }">
        <logo v-if="showLogo" :collapse="isCollapse"></logo>
        <el-scrollbar class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :unique-opened="true"
                mode="vertical">
                <menu-item
                    v-for="route in menuList"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"></menu-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import MenuItem from './menu-item'
import config from '@/config'
export default {
    components: { MenuItem, Logo },
    computed: {
        ...mapGetters(['routes', 'permissionRoutes', 'openSlidemenu']),
        menuList () {
            return this.routes.concat(this.permissionRoutes)
        },
        activeMenu () {
            const route = this.$route
            const { meta, path } = route
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        showLogo () {
            return config.setting.showLogo
        },
        isCollapse () {
            return !this.openSlidemenu
        }
    }
}
</script>
