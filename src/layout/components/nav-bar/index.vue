<template>
    <div class="navbar">
        <hamburger :is-active="openSlidemenu" class="hamburger-container" @toggleClick="toggleSideBar"></hamburger>
        <breadcrumb class="breadcrumb-container"></breadcrumb>
        <div class="right-menu">
            <search id="header-search" class="right-menu-item"></search>
            <el-dropdown
                class="right-menu-item"
                trigger="click"
                @command="changeTheme">
                <div class="item-text is-link">
                    <i class="el-icon-s-open"></i>{{ themeLabel || '默认' }}
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-for="(item, index) in themeList"
                        :key="index"
                        :command="item.value">
                        <div :class="{ 'is-current-item': item.name === themeLabel }">
                            {{ item.name }}
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="right-menu-item">
                <el-badge is-dot><svg-icon iconName="bell"></svg-icon></el-badge>
            </div>
            <el-dropdown
                class="avatar-container right-menu-item hover-effect"
                trigger="click">
                <div class="avatar-wrapper">
                    <img src="~images/tx.png" class="user-avatar" />
                    <span class="user-name">{{ userInfo.name }}</span>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><router-link to="/dashboard">首页</router-link></el-dropdown-item>
                    <el-dropdown-item>
                        <a target="_blank" href="http://www.ybaob.com">
                            ybb
                        </a>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '../breadcrumb-com/index'
import Search from '../header-search/index'
import Hamburger from '../hamburger-com/index'
import { resetRouter } from '@/router'
import { clearTheme, addCssByLink } from '@/utils/index'
export default {
    components: {
        Breadcrumb,
        Hamburger,
        Search
    },
    data () {
        return {
            themeLabel: '默认',
            themeList: []
        }
    },
    created () {
        this.getThemeList()
        this.changeTheme(this.themeName)
    },
    methods: {
        getThemeList () {
            this.api.theme.getThemeList().then((res) => {
                this.themeList = [{ name: '默认', value: 'normal' }].concat(res)
                this.changeTheme(this.themeName)
            })
        },
        changeTheme (command) {
            const theme = this.themeList.find((item) => item.value === command)
            if (theme) {
                if (this.themeLabel !== theme.name) {
                    clearTheme()
                    this.initTheme(theme.value)
                    this.themeLabel = theme.name
                }
            } else {
                clearTheme()
                this.themeLabel = '默认'
            }
        },
        initTheme (themeName) {
            if (themeName && themeName !== 'normal') {
                const now = new Date().getTime()
                addCssByLink(`${window.baseUrl}/theme/${themeName}/index.css?t=${now}`, () => {
                    document.body.classList.add(`${themeName}-theme`)
                })
            }
            this.$store.commit('theme/setThemeName', themeName)
        },
        toggleSideBar () {
            this.$store.dispatch('app/toggleMenu')
        },
        async logout () {
            resetRouter()
            this.$store.dispatch('user/logout').then(() => {
                this.$router.replace({ name: 'Login' })
            })
        }
    },
    computed: {
        ...mapGetters(['openSlidemenu', 'userInfo', 'themeName'])
    }
}
</script>
<style lang="scss" scoped></style>
