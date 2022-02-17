<template>
    <div class="sidebar-logo-container" :class="{ collapse: collapse }">
        <transition name="sidebarLogoFade">
            <router-link
                v-if="collapse"
                key="collapse"
                class="sidebar-logo-link"
                to="/">
                <img v-if="logo" :src="logo" class="sidebar-logo" />
                <h1 v-else class="sidebar-title">{{ title }}</h1>
            </router-link>
            <router-link v-else key="expand" class="sidebar-logo-link" to="/">
                <img v-if="logo" :src="logo" class="sidebar-logo" />
                <h1 class="sidebar-title">{{ title }}</h1>
            </router-link>
        </transition>
    </div>
</template>
<script>
import logo from 'images/logo.png'
import logoSmall from 'images/logo-small.png'
import config from '@/config'
export default {
    name: 'SidebarLogo',
    props: {
        collapse: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            title: config.sysName
        }
    },
    computed: {
        logo () {
            return this.collapse ? logoSmall : logo
        }
    }
}
</script>

<style lang="scss" scoped></style>
