<!--
    图标iconfont
    @params: iconName 图标名字
-->
<template>
    <i v-if="isEl" :class="iconName" v-on="$listeners"></i>
    <svg v-else class="svg-icon" aria-hidden="true" v-on="$listeners">
        <use :xlink:href="svgName" />
    </svg>
</template>
<script>
export default {
    name: 'SvgIcon',
    props: {
        iconName: String
    },
    computed: {
        svgName () {
            return `#icon${this.iconName}`
        },
        isEl () {
            return this.iconName.indexOf('el-icon') > -1
        }
    }
}
</script>
<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
