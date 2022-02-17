<!--
  组件名称：增删改查首页
  -->
<template>
    <div>
        <div class="search-container">
            <el-form inline :model="query.productVo" ref="searchForm">
                <el-form-item label="产品名称"  prop="name">
                    <el-input v-model="query.productVo.name" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="search-btn-container">
                        <el-button type="primary" @click="search">搜索</el-button>
                        <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="opr-container">
            <el-button type="primary" @click="addItem">新增</el-button>
            <el-dropdown
                style="margin-left: 8px;"
                v-show="selectRows.length"
                @command="selectBatch"
                placement="bottom">
                <el-button>
                    批量操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="delete" icon="el-icon-delete">删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <table-panel
            ref="table"
            selectType="select"
            :page="tableConfig.page"
            :response="tableConfig.response"
            :url="tableUrl"
            :successCode="tableConfig.successCode"
            @selectChange="selectChange">
            <!-- 列信息  -->
            <el-table-column label="产品名称" prop="name"></el-table-column>
            <el-table-column
                label="价格"
                align="center"
                prop="price"></el-table-column>
            <el-table-column label="操作" align="center" width="200">
                <template v-slot="{ row }">
                    <el-button type="text" @click.stop="viewItem(row)">查看</el-button>
                    <el-button type="text" @click.stop="editItem(row)">编辑</el-button>
                    <el-button class="f-danger" type="text" @click.stop="deleteItem(row)">删除</el-button>
                </template>
            </el-table-column>
            <!-- 列信息 end  -->
        </table-panel>
    </div>
</template>

<script>
import TablePanel from 'components/table-panel'
import tableConfigMixin from '@/mixins/table-config-mixin'
export default {
    name: 'CrudTemplate',
    mixins: [tableConfigMixin],
    components: {
        TablePanel
    },
    data () {
        return {
            tableUrl: this.api.product.productList,
            deleteUrl: this.api.product.deleteProductById,
            deleteBatchUrl: this.api.product.deleteProductBatch,
            addOrEditModelName: 'CrudTemplateCrudPageAddOrEditModel',
            detailModelName: 'CrudTemplateCrudPageDetailModel',
            query: {
                productVo: {
                    name: ''
                }
            }
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.search()
        })
    },
    methods: {
        selectBatch (command) {
            switch (command) {
                case 'delete':
                    this.deleteBatch()
                    break
            }
        },
        handleAddOrEditSuccess (type) {
            this.$refs[this.addOrEditModelName].close()
            if (type === 'add') {
                this.search()
            } else {
                this.refresh()
            }
        }
    }
}
</script>
<style lang="scss" scoped></style>
