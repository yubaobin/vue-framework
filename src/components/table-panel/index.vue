<!--
    表格
    @params: url  数据请求路径， 返回promise的方法
    @params: tree Boolean 是否是表格树结构
             lazy 异步加载 表格树数据
             @load 方法 lazy 一起使用
    @params: response 配置返回参数字段
              {                             res: {
                data: 获取数据字段              data: {
                list: 获取列表字段                   list: [],
                pageObj: 返回的分页信息是否是对象      pageObj: {
                resultCode: 返回的结果码                pageSize: 10,
                pageSize: 每页字段                     pageNum: 1,
                pageNum: 当前页字段                    totalRow: 100
                                                    }
                totalRow: 数据总数字段            },

              }                                 resultCode: 0
                                              }
    @params: page 分页配置
            pageSize: 查询请求的pageSize字段                  query: {            query: {
            pageNum: 查询请求的pageNum字段                      pageSize: 10,        pageObj: {
            pageObj: 查询请求的page是否是对象                    pageNum: 1             pageSize: 10,
            layout: 分页的布局, 参考element-ui的page的layout   }                        pageNum: 1
                                                                                   }
                                                                                }
    @params: successCode 成功码 0
    @params: pageSize 页数量
    @params: selectType  select／多选  radio／多选  false
    @slot="head-right" 头部右边
    @slot="search-tool"  搜索
    @slot="opr-tool"   表头的操作栏
    @slot="table-col"   表格的列
-->

<template>
    <div class="table-panel">
        <div v-if="title" class="t-title">
            <span v-html="title"></span>
            <div class="tips-right"><slot name="head-right"></slot></div>
        </div>
        <div class="search-tool" v-if="$slots['search-tool']">
            <slot name="search-tool"></slot>
        </div>
        <div class="opr-tool" v-if="$slots['opr-tool']">
            <slot name="opr-tool"></slot>
        </div>
        <div class="select-container" v-if="selectText">当前选<span class="f-success">{{ recordRows.length }}</span>条</div>
        <el-table
            ref="table"
            :data="tableData"
            v-loading="tableloading"
            @selection-change="handleSelectionChange"
            @select-all="selectAll"
            @select="handleRowSelect"
            @row-click="handleRowClick"
            v-bind="$attrs">
            <el-table-column
                v-if="selectType"
                type="selection"
                width="55"
                align="center"
                :selectable="handleCheckSelectable"></el-table-column>
            <el-table-column
                v-if="showIndex"
                width="55"
                label="序号"
                align="center">
                <template v-slot="{ $index }">{{ $index + 1 }}</template>
              </el-table-column>
            <slot></slot>
            <div class="empty-img" slot="empty">
                <img src="~images/empty.png" />
            </div>
        </el-table>
        <el-pagination
            v-if="page"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-size="pageSize"
            :current-page="currentPage"
            :layout="page.layout"
            :pager-count="pagerCount"
            :page-sizes="pageSizes"
            :total="rowTotal"></el-pagination>
        <slot name="bottom"></slot>
    </div>
</template>
<script>
import { deepClone } from '@/utils'
const INIT_RESPONSE = {
    data: 'data',
    list: 'items',
    resultCode: 'code',
    pageObj: false,
    totalRow: 'totalRow'
}
const INIT_PAGE = {
    pageSize: 'pageSize',
    pageNum: 'pageNum',
    pageObj: '',
    layout: 'total, prev, pager, next, jumper'
}
export default {
    props: {
        title: String,
        tree: Boolean,
        url: {
            type: [Function, Boolean],
            default: false
        },
        dataValue: {
            type: Array,
            default: () => []
        },
        response: {
            type: Object,
            default: () => {
                return INIT_RESPONSE
            }
        },
        page: {
            type: [Object, Boolean],
            default: () => {
                return INIT_PAGE
            }
        },
        successCode: {
            type: [Number, String],
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pagerCount: {
            type: Number,
            default: 7
        },
        pageSizes: {
            type: Array,
            default: () => [5, 10, 50, 100, 200, 500]
        },
        selectType: {
            type: [Boolean, String],
            default: 'select'
        },
        autoLoad: {
            type: Boolean,
            default: false
        },
        selectedIds: {
            type: Array,
            default: () => []
        },
        checkSelectable: {
            type: Function,
            default: () => {
                return true
            }
        },
        formatter: {
            type: [Boolean, Function],
            default: false
        },
        showIndex: {
            type: Boolean,
            default: true
        },
        selectText: {
            type: Boolean,
            default: false
        },
        keyName: {
            type: String,
            default: 'name'
        },
        total: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            valResponse: {},
            valPage: {},
            tableloading: false,
            rowTotal: 0,
            tableData: [],
            query: {},
            selectRow: [],
            recordRows: []
        }
    },
    created () {
        this.initPageObj()
        if (this.url && typeof this.url === 'function') {
            this.autoLoad && this.loadData(this.query)
        } else {
            this.initStaticData(this.dataValue, 1)
        }
    },
    methods: {
        loadData (params) {
            const { data, resultCode, list, pageObj, totalRow } = this.valResponse
            this.tableloading = true
            this.url(params)
                .then((res) => {
                    const resultData = data ? res[data] : res
                    this.tableloading = false
                    if (+res[resultCode] === +this.successCode) {
                        let total = 0
                        this.$emit('on-success', res)
                        if (typeof this.formatter === 'function') {
                            this.tableData = this.formatter(res)
                        } else {
                            this.tableData = resultData[list]
                        }
                        this.$nextTick(() => {
                            this.setSelection()
                        })
                        if (pageObj) {
                            total = resultData[pageObj][totalRow]
                        } else {
                            total = resultData[totalRow]
                        }
                        if (total || total === 0) {
                            this.$emit('update:total', total)
                            this.rowTotal = total
                        }
                    } else {
                        this.$emit('onError', res)
                    }
                })
                .catch((err) => {
                    this.$emit('onError', err)
                    this.tableloading = false
                })
        },
        refresh () {
            this.loadData(this.query)
        },
        // 加载静态数据
        initStaticData (dataList, pageNum) {
            const list = deepClone(dataList)
            this.$emit('update:total', list.length)
            this.rowTotal = list.length
            this.tableData = list.slice(
                this.pageSize * (pageNum - 1),
                this.pageSize * pageNum
            )
        },
        search (params) {
            this.setQueryPage(1)
            const p = Object.assign({}, this.query, params)
            this.query = deepClone(p)
            if (this.url && typeof this.url === 'function') {
                this.loadData(this.query)
            } else {
                this.initStaticData(this.dataValue, 1)
            }
        },
        // 分页改变
        handleCurrentChange (curpage) {
            this.$emit('changePage', curpage)
            this.setQueryPage(curpage)
            if (this.url && typeof this.url === 'function') {
                this.loadData(this.query)
            } else {
                this.initStaticData(this.dataValue, curpage)
            }
        },
        handleSizeChange (size) {
            this.$emit('size-change', size)
            this.$emit('update:pageSize', size)
            this.setPageObj(size)
            this.setQueryPage(1)
            if (this.url && typeof this.url === 'function') {
                this.loadData(this.query)
            } else {
                this.initStaticData(this.dataValue, 1)
            }
        },
        // 点击一行
        handleRowClick (row) {
            this.$emit('row-click', row)
            this.triggerRecords(row)
            if (this.selectType === 'radio') {
                this.$emit('select-change', [row])
                if (this.selectRow.length > 0) {
                    this.$refs.table.clearSelection()
                }
            }
            this.$refs.table.toggleRowSelection(row)
        },
        handleSelectionChange (val) {
            this.selectRow = val
            if (this.selectType === 'select') {
                this.$emit('select-change', val)
            }
        },
        setQueryPage (curpage) {
            const { pageNum, pageObj } = this.valPage
            if (pageObj) {
                this.query[pageObj][pageNum] = curpage
            } else {
                this.query[pageNum] = curpage
            }
        },
        // 设置pageSize
        setPageObj (pSize) {
            const { pageSize, pageNum, pageObj } = this.valPage
            if (pageObj) {
                this.query[pageObj] = {}
                this.query[pageObj][pageSize] = pSize || this.pageSize
                this.query[pageObj][pageNum] = 1
            } else {
                this.query[pageSize] = pSize || this.pageSize
                this.query[pageNum] = 1
            }
        },
        initPageObj () {
            const { pageSize, pageNum, pageObj } = this.valPage
            const obj = {}
            if (pageObj) {
                obj[pageObj] = {}
                obj[pageObj][pageSize] = this.pageSize
                obj[pageObj][pageNum] = 1
            } else {
                obj[pageSize] = this.pageSize
                obj[pageNum] = 1
            }
            this.query = deepClone(obj)
        },
        // 点击checkbox选择
        handleRowSelect (val, row) {
            this.$emit('select', val, row)
            this.triggerRecords(row)
            this.$nextTick(() => {
                if (this.selectType === 'radio') {
                    this.handleRowClick(row)
                }
            })
        },
        // 点击全选
        selectAll (rows) {
            this.$emit('select-all', rows)
            this.triggerRecordsAll(rows)
            if (this.selectType === 'radio') {
                this.$refs.table.clearSelection()
            }
        },
        // 设置选中
        setSelection () {
            this.$refs.table && this.$refs.table.clearSelection()
            this.recordRows.forEach((row) => {
                const itemObj = this.tableData.find(
                    (item) => item.id === row.id
                )
                if (itemObj) {
                    this.$refs.table.toggleRowSelection(itemObj)
                }
            })
        },
        // 设置能否选中
        handleCheckSelectable (row) {
            return this.checkSelectable(row)
        },
        // 触发选中保存列 （用于分页回选）
        triggerRecords (row) {
            const recordIndex = this.recordRows.findIndex(
                (item) => item.id === row.id
            )
            if (recordIndex > -1) {
                if (this.selectType === 'select') {
                    this.recordRows.splice(recordIndex, 1)
                }
            } else {
                if (this.selectType === 'radio') {
                    this.recordRows = [row]
                } else if (this.selectType === 'select') {
                    this.recordRows.push(row)
                }
            }
        },
        // 触发全选保存列 （用于分页回选）
        triggerRecordsAll (rows) {
            if (rows.length) {
                rows.forEach((item) => {
                    const inRecord = this.recordRows.find(
                        (record) => record.id === item.id
                    )
                    if (!inRecord) {
                        this.triggerRecords(item)
                    }
                })
            } else {
                this.clearRecordSingleList()
            }
        },
        // 触发全选清除列 （用于分页回选）
        clearRecordSingleList () {
            if (this.tableData && this.tableData.length) {
                const ids = this.tableData.map((item) => item.id)
                this.recordRows = this.recordRows.filter(
                    (item) => !ids.includes(item.id)
                )
                this.$emit('select-change', this.recordRows)
            }
        },
        clearRecord () {
            this.recordRows = []
            this.setSelection()
        }
    },
    computed: {
        currentPage () {
            const { pageNum, pageObj } = this.valPage
            if (pageObj) {
                return this.query[pageObj][pageNum]
            } else {
                return this.query[pageNum]
            }
        },
        currentSelectNames () {
            return this.recordRows.reduce((prev, cur) => {
                return `${prev}${cur[this.keyName]}, `
            }, '')
        }
    },
    watch: {
        dataValue: {
            deep: true,
            handler (newVal) {
                this.initStaticData(newVal, 1)
            }
        },
        selectedIds: {
            deep: true,
            immediate: true,
            handler (newVal) {
                this.$nextTick(() => {
                    this.recordRows = newVal.map((item) =>
                        Object.assign({}, item)
                    )
                    this.setSelection()
                })
            }
        },
        response: {
            deep: true,
            immediate: true,
            handler (newVal) {
                this.valResponse = Object.assign({}, INIT_RESPONSE, newVal)
            }
        },
        page: {
            deep: true,
            immediate: true,
            handler (newVal) {
                if (typeof newVal === 'boolean') {
                    this.valPage = newVal
                } else {
                    this.valPage = Object.assign({}, INIT_PAGE, newVal)
                }
            }
        },
        total (newVal) {
            this.rowTotal = newVal
        }
    }
}
</script>
<style scoped lang="scss"></style>
