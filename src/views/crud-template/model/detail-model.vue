<!--
  组件名称：详情
  -->
<template>
    <el-dialog
        :title="title"
        :visible.sync="visible"
        append-to-body
        width="40%">
        <!-- 详情信息  -->
        <el-form label-width="80px" v-loading="viewloading">
            <el-form-item label="产品名称:">{{ dataObj.name }}</el-form-item>
            <el-form-item label="关联服务:">{{ dataObj.category.name }}</el-form-item>
        </el-form>
        <!-- 关联的数据 -->
        <cascade-view :categoryId="dataObj.category.id"></cascade-view>
        <!-- 详情信息  -->
        <div slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button @click="close">关闭</el-button>
        </div>
    </el-dialog>
</template>
<script>
import crudModelMixin from '@/mixins/crud-model-mixin'
import CascadeView from './cascade/index'
export default {
    name: 'CrudAddOrEditModel',
    mixins: [crudModelMixin],
    components: {
        CascadeView
    },
    data () {
        return {
            isDialog: true,
            detailUrl: this.api.product.getProductCascade,
            dataObj: {
                category: {},
                name: ''
            }
        }
    },
    methods: {
        loadSuccess (res, callback) {
            this.dataObj = res.result
            callback()
        }
    }
}
</script>
<style lang="scss" scoped>
.el-form {
    width: 90%;
}
</style>
