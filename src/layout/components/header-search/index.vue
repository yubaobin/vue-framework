<template>
    <div :class="{ show: show }" class="header-search">
        <svg-icon
            class="search-icon"
            iconName="search"
            @click.stop="click"></svg-icon>
        <el-select
            ref="headerSearchSelect"
            v-model="search"
            :remote-method="querySearch"
            filterable
            default-first-option
            remote
            placeholder="Search"
            class="header-search-select"
            @change="change">
            <el-option
                v-for="item in options"
                :key="item.path"
                :value="item"
                :label="item.title.join(' > ')"></el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    name: 'HeaderSearch',
    data () {
        return {
            search: '',
            options: [],
            show: false
        }
    },
    computed: {
        routes () {
            return this.$store.getters.permission_routes
        },
        lang () {
            return this.$store.getters.language
        }
    },
    watch: {
        show (value) {
            if (value) {
                document.body.addEventListener('click', this.close)
            } else {
                document.body.removeEventListener('click', this.close)
            }
        }
    },
    methods: {
        click () {
            this.show = !this.show
            if (this.show) {
                this.$refs.headerSearchSelect &&
                    this.$refs.headerSearchSelect.focus()
            }
        },
        close () {
            this.$refs.headerSearchSelect &&
                this.$refs.headerSearchSelect.blur()
            this.options = []
            this.show = false
        },
        change (val) {
            this.search = ''
            this.options = []
            this.$nextTick(() => {
                this.show = false
            })
        },
        querySearch (query) {}
    }
}
</script>
<style lang="scss" scoped></style>
