<!--
  组件名称：详情
  -->
<template>
    <div class="detail-view">
        <div class="form-v1" v-loading="viewloading">
            <div class="form-title">基础信息详情</div>
            <div class="table-info">
                <table>
                    <colgroup>
                        <col width="15%" />
                        <col width="35%" />
                        <col width="15%" />
                        <col width="35%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>产品名称</th>
                            <td colspan="3">{{ dataObj.name }}</td>
                        </tr>
                        <tr>
                            <th>关联服务</th>
                            <td colspan="3">{{ dataObj.category.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="form-title">关联数据</div>
            <cascade-view :categoryId="dataObj.category.id"></cascade-view>
            <!-- 详情信息  -->
            <div class="form-footer">
                <el-button @click="goBackWidthCloseTagView">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import crudModelMixin from '@/mixins/crud-model-mixin'
import CascadeView from './cascade/index'
export default {
    name: 'CrudTemplateCrudPageDetailModel',
    mixins: [crudModelMixin],
    components: {
        CascadeView
    },
    data () {
        return {
            detailUrl: this.api.product.getProductCascade,
            dataObj: {
                category: {},
                name: ''
            }
        }
    },
    methods: {
        loadSuccess (res, callback) {
            const { result } = res
            this.dataObj = result
            callback()
        }
    }
}
</script>
<style lang="scss" scoped></style>
