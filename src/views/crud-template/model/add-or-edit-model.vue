<!--
  组件名称：增删改查新增编辑
  -->
<template>
    <el-dialog
        :title="title"
        :visible.sync="visible"
        append-to-body
        width="40%">
        <!-- 添加的表单信息  -->
        <el-form
            v-if="visible"
            ref="form"
            :model="form"
            :rules="rules"
            label-width="80px"
            v-loading="viewloading">
            <el-form-item label="产品名称" prop="name">
                <el-input v-model="form.name" :disabled="!isAdd"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="proce">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
        </el-form>
        <!-- 添加的表单信息  -->
        <div slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button @click="close">关闭</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import crudModelMixin from '@/mixins/crud-model-mixin'
export default {
    name: 'CrudAddOrEditModel',
    mixins: [crudModelMixin],
    data () {
        return {
            isDialog: true,
            addUrl: this.api.product.addProduct,
            updateUrl: this.api.product.updateProduct,
            detailUrl: this.api.product.getProductById,
            defaultForm: {
                name: '',
                price: ''
            },
            rules: {
                name: [{ required: true, message: '请输入产品名称' }],
                price: [{ required: true, message: '请输入价格' }]
            }
        }
    },
    methods: {
        formatParams (params) {
            return {
                id: params.id,
                name: params.name,
                price: params.price
            }
        },
        loadSuccess (res, callback) {
            const { result = {} } = res
            this.form = Object.assign({}, this.form, result)
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
