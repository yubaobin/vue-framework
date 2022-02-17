<!--
  组件名称：字表列表
  -->
<template>
    <div class="cascaade-index">
        <table-panel
            ref="table"
            :url="tableUrl"
            :auto-load="false"
            :page-size="5"
            :page="tableConfig.page"
            :response="tableConfig.response"
            :successCode="tableConfig.successCode"
            style="padding: 0;">
            <el-table-column label="产品名称" prop="name"></el-table-column>
            <el-table-column label="价格" prop="price"></el-table-column>
        </table-panel>
    </div>
</template>
<script>
import TablePanel from 'components/table-panel'
import tableConfigMixin from '@/mixins/table-config-mixin'
export default {
    name: 'CascaadeIndex',
    mixins: [tableConfigMixin],
    props: {
        categoryId: {
            type: [String, Number],
            default: ''
        }
    },
    components: {
        TablePanel
    },
    data () {
        return {
            query: {
                productVo: {
                    categoryId: this.categoryId,
                    name: ''
                }
            },
            tableUrl: this.api.product.productCascadeList
        }
    },
    watch: {
        categoryId: {
            immediate: true,
            handler (newVal) {
                this.query.productVo.categoryId = newVal
                this.$nextTick(() => {
                    this.search()
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped></style>
