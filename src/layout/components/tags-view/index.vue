<template>
    <div id="tags-view-container" class="tags-view-container">
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
            <router-link
                v-for="tag in visitedViews"
                ref="tag"
                :key="tag.path"
                :class="isActive(tag) ? 'active' : ''"
                :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                tag="span"
                class="tags-view-item"
                @click.middle.native="closeSelectedTag(tag)"
                @contextmenu.prevent.native="openMenu(tag, $event)">
                <span class="tag-text">{{ tag.meta.title }}</span>
                <span
                    v-if="!tag.meta.affix"
                    class="el-icon-close"
                    @click.prevent.stop="closeSelectedTag(tag)"></span>
            </router-link>
        </scroll-pane>
        <ul
            v-show="visible"
            :style="{ left: left + 'px', top: top + 'px' }"
            class="contextmenu">
            <li @click="refreshSelectedTag(selectedTag)">刷新</li>
            <li
                v-if="!(selectedTag.meta && selectedTag.meta.affix)"
                @click="closeSelectedTag(selectedTag)">
                关闭
            </li>
            <li @click="closeOthersTags">
                关闭其它
            </li>
            <li @click="closeAllTags(selectedTag)">
                关闭所有
            </li>
        </ul>
    </div>
</template>

<script>
import ScrollPane from './scroll-pane'
import path from 'path'
export default {
    components: { ScrollPane },
    data () {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {},
            affixTags: []
        }
    },
    computed: {
        visitedViews () {
            return this.$store.state.tagsView.visitedViews
        },
        routes () {
            return this.$store.state.permission.routes
        }
    },
    watch: {
        $route () {
            this.addTags()
            this.moveToCurrentTag()
        },
        visible (value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
        }
    },
    mounted () {
        this.initTags()
        this.addTags()
    },
    methods: {
        isActive (route) {
            return route.path === this.$route.path
        },
        filterAffixTags (routes, basePath = '/') {
            let tags = []
            routes.forEach((route) => {
                if (route.meta && route.meta.affix) {
                    const tagPath = path.resolve(basePath, route.path)
                    tags.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: route.name,
                        meta: { ...route.meta }
                    })
                }
                if (route.children) {
                    const tempTags = this.filterAffixTags(
                        route.children,
                        route.path
                    )
                    if (tempTags.length >= 1) {
                        tags = [...tags, ...tempTags]
                    }
                }
            })
            return tags
        },
        initTags () {
            const affixTags = (this.affixTags = this.filterAffixTags(
                this.routes
            ))
            for (const tag of affixTags) {
                if (tag.name) {
                    this.$store.dispatch('tagsView/addVisitedView', tag)
                }
            }
        },
        addTags () {
            const { name } = this.$route
            if (name) {
                this.$store.dispatch('tagsView/addView', this.$route)
            }
            return false
        },
        moveToCurrentTag () {
            const tags = this.$refs.tag
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to.path === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag)
                        if (tag.to.fullPath !== this.$route.fullPath) {
                            this.$store.dispatch(
                                'tagsView/updateVisitedView',
                                this.$route
                            )
                        }
                        break
                    }
                }
            })
        },
        refreshSelectedTag (view) {
            this.$store.dispatch('tagsView/delCachedView', view).then(() => {
                const { fullPath } = view
                this.$nextTick(() => {
                    this.$router.replace({
                        path: fullPath
                    })
                })
            })
        },
        closeSelectedTag (view) {
            this.$store
                .dispatch('tagsView/delView', view)
                .then(({ visitedViews }) => {
                    if (this.isActive(view)) {
                        this.toLastView(visitedViews, view)
                    }
                })
        },
        closeOthersTags () {
            this.$router.push(this.selectedTag)
            this.$store
                .dispatch('tagsView/delOthersViews', this.selectedTag)
                .then(() => {
                    this.moveToCurrentTag()
                })
        },
        closeAllTags (view) {
            this.$store
                .dispatch('tagsView/delAllViews')
                .then(({ visitedViews }) => {
                    if (this.affixTags.some((tag) => tag.path === view.path)) {
                        return
                    }
                    this.toLastView(visitedViews, view)
                })
        },
        toLastView (visitedViews, view) {
            const latestView = visitedViews.slice(-1)[0]
            if (latestView) {
                this.$router.push(latestView)
            } else {
                if (view.name === 'Dashboard') {
                    this.$router.replace({ path: '/redirect' + view.fullPath })
                } else {
                    this.$router.push('/')
                }
            }
        },
        openMenu (tag, e) {
            const menuMinWidth = 105
            const offsetLeft = this.$el.getBoundingClientRect().left
            const offsetWidth = this.$el.offsetWidth
            const maxLeft = offsetWidth - menuMinWidth
            const left = e.clientX - offsetLeft + 15

            if (left > maxLeft) {
                this.left = maxLeft
            } else {
                this.left = left
            }

            this.top = e.clientY
            this.visible = true
            this.selectedTag = tag
        },
        closeMenu () {
            this.visible = false
        }
    }
}
</script>

<style lang="scss" scoped></style>
