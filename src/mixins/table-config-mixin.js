/**
 * 属性：
 * 1. tableConfig 分页配置
 * 2. selectRows checkbox选择的行
 * 3. tablePanelName  tablepanel的ref
 * 4. addOrEditModelName 新增编辑弹窗
 * 方法：
 * 1. search 表格查询 -> page会变为1
 * 2. refresh 表格刷新 -> page不会变为1
 * 3. addItem 调起新增弹窗
 * 4. editItem 调起编辑弹窗
 * 5. viewItem 调起详情弹窗
 * 6. deleteItem 删除一条记录
 * 7. deleteBatch 批量删除记录
 */
export default {
    data () {
        return {
            keepAlive: false,
            tableConfig: {
                page: { pageSize: 'size', pageNum: 'current', layout: 'total, sizes, prev, pager, next, jumper' },
                response: {
                    data: 'result',
                    list: 'records',
                    resultCode: 'code',
                    totalRow: 'total'
                },
                successCode: 1
            },
            selectRows: [],
            tablePanelName: 'table',
            addOrEditModelName: 'addOrEditModel',
            detailModelName: 'detailModel',
            query: {}
        }
    },
    mounted () {
        this.keepAlive = true
    },
    activated () {
        if (!this.isDialog) {
          if (this.keepAlive) {
            this.refresh()
          } else {
            this.keepAlive = true
          }
        }
    },
    methods: {
        selectChange (rows) {
            this.selectRows = rows
        },
        search () {
            this.$refs[this.tablePanelName] && this.$refs[this.tablePanelName].search(this.query)
        },
        searchWidthQuery (query) {
            this.$refs[this.tablePanelName].search(query)
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
            this.search()
        },
        refresh () {
            if (this.tablePanelName && this.$refs[this.tablePanelName]) {
                this.$refs[this.tablePanelName].refresh()
            }
        },
        addItemByModel () {
            this.$refs[this.addOrEditModelName].add()
        },
        editItemByModel (item) {
            this.$refs[this.addOrEditModelName].edit(item)
        },
        viewItemByModel (item) {
            this.$refs[this.detailModelName].open(item)
        },
        addItem () {
            if (this.addOrEditModelName) {
                this.$router.push({ name: this.addOrEditModelName, params: { id: 'add' } })
            }
        },
        editItem (record) {
            if (this.addOrEditModelName) {
                this.$router.push({ name: this.addOrEditModelName, params: { id: record.id } })
            }
        },
        viewItem (record) {
            if (this.detailModelName) {
                this.$router.push({ name: this.detailModelName, params: { id: record.id } })
            }
        },
        deleteItem (row) {
            this.$confirm('确定要删除吗？>_<', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteUrl(row.id).then((res) => {
                    if (res.result) {
                        if (this.handleSuccess && typeof this.handleSuccess === 'function') {
                            this.handleSuccess('delete', () => {
                                this.refresh()
                                this.$message.success('删除成功')
                            })
                        }
                    } else {
                        this.$message.error('删除失败, 数据id不存在')
                    }
                }).catch((err) => {
                    this.$message.error(err.message)
                })
            }).catch(() => {})
        },
        // 批量删除
        deleteBatch () {
            if (this.selectRows.length) {
                this.$confirm('确定要删除吗？>_<', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const idList = this.selectRows.map((item) => item.id)
                    this.deleteBatchUrl(idList).then((res) => {
                        if (res.result) {
                            if (this.handleSuccess && typeof this.handleSuccess === 'function') {
                                this.handleSuccess('deleteBatch', () => {
                                    this.refresh()
                                    this.$message.success('删除成功')
                                })
                            }
                        } else {
                            this.$message.error('删除失败')
                        }
                    }).catch((err) => {
                        this.$message.error(err.message)
                    })
                }).catch(() => {})
            } else {
                this.$message.warning('请选择一条记录')
            }
        },
        // 成功后方法
        handleSuccess (type, callback) {
            callback()
        }
    }
}
