<!--
组件名称：
-->
<template>
    <div>
        <div class="search-container">
            <div class="form-title">静态字典</div>
            <div>过滤器获取:  {{ sex | filterDict('sex') }}</div>
            <div>列表:
                <el-select v-model="sex">
                    <el-option v-for="item in sexList" :key="item.cide" :value="item.code" :label="item.text"></el-option>
                </el-select>
            </div>
        </div>
        <div class="search-container">
            <div class="form-title">远程字典</div>
            <div>过滤器获取:  {{ status | filterDict('status') }}</div>
            <div>列表:
                <el-select v-model="status">
                    <el-option v-for="item in statusList" :key="item.cide" :value="item.code" :label="item.text"></el-option>
                </el-select>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DemoDict',
    data () {
        return {
            sex: 1,
            status: 1
        }
    },
    computed: {
        sexList () {
            return this.$dictList.sex
        },
        statusList () {
            return this.$dictList.status
        }
    }
}
</script>
<style lang="scss" scoped></style>
