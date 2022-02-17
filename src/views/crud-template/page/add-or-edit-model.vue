<!--
  组件名称：增删改查新增编辑
  -->
<template>
    <div class="add-or-edit-model">
        <div class="form-v1">
            <div class="form-title">基本信息</div>
            <div class="addoredit-form">
                <!-- 添加的表单信息  -->
                <el-form
                    v-if="visible"
                    ref="form"
                    :model="form"
                    :rules="rules"
                    label-width="80px"
                    v-loading="viewloading">
                    <el-form-item label="产品名称" prop="name">
                        <el-input
                            v-model="form.name"
                            :disabled="!isAdd"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="proce">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                </el-form>
                <div class="form-footer">
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button @click="goBackWidthCloseTagView">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import crudModelMixin from '@/mixins/crud-model-mixin'
export default {
    name: 'CrudTemplateCrudPageAddOrEditModel',
    mixins: [crudModelMixin],
    data () {
        return {
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
        },
        handleSuccess (type, callback) {
            callback()
            this.closeCurrentTagView()
            this.$router.replace({ name: 'CrudTemplateCrudPageIndex' })
        }
    }
}
</script>
<style lang="scss" scoped></style>
