/**
 * 属性
 * 1. viewloading loading
 * 2. title 弹窗标题
 * 3. isAdd 是否新增
 * 4. formName  el-form的$refs
 * 5. form 表单对象，用于新增，编辑提交
 * 6. addUrl 新增的url -> promise
 * 7. updateUrl 编辑的url -> promise
 * 方法
 * 1. submit 提交
 * 2. handleSuccess 新增编辑后调用方法，如果重写, 需要调用参数的callback
 * 3. add 调起新增弹窗
 * 4. edit 调起编辑弹窗
 * 5. close 关闭弹窗
 */
export default {
    data () {
        return {
            isDialog: false,
            viewloading: false,
            visible: false,
            title: '新增',
            isAdd: true,
            formName: 'form',
            form: {},
            defaultForm: {},
            dataObj: {},
            addUrl: () => new Promise((resolve) => resolve()),
            updateUrl: () => new Promise((resolve) => resolve()),
            detailUrl: () => new Promise((resolve) => resolve())
        }
    },
    created () {
        if (!this.isDialog) {
            const pId = this.$route.params.id
            let id = pId
            if (!pId && pId !== 0) {
                id = this.id || ''
            }
            if (id === 'add') {
                this.add()
            } else {
                this.edit({ id })
            }
        }
    },
    methods: {
        // 提交
        submit () {
            this.$refs[this.formName].validate((valid) => {
                if (valid) {
                    let params = Object.assign({}, this.form)
                    let url = this.updateUrl
                    if (this.isAdd) {
                        url = this.addUrl
                    }
                    if (this.formatParams && typeof this.formatParams === 'function') {
                        params = this.formatParams(params)
                    }
                    this.viewloading = true
                    url(params)
                        .then((res) => {
                            this.viewloading = false
                            if (res.result) {
                                if (this.handleSuccess && typeof this.handleSuccess === 'function') {
                                    this.handleSuccess(this.isAdd ? 'add' : 'edit', () => {
                                        this.$message.success(this.isAdd ? '新增成功' : '编辑成功')
                                        this.$emit('on-success')
                                    })
                                }
                            } else {
                                this.$message.error(this.isAdd ? '新增失败' : '编辑失败, 数据id不存在')
                            }
                        })
                        .catch((err) => {
                            this.viewloading = false
                            this.$message.error(err.message)
                        })
                }
            })
        },
        // 成功后方法
        handleSuccess (type, callback) {
            callback()
        },
        add () {
            this.isAdd = true
            this.title = '新增'
            this.visible = true
            this.form = Object.assign({}, this.defaultForm)
            if (this.initedAdd && typeof this.initedAdd === 'function') {
                this.initedAdd()
            }
        },
        edit (record, otherInfo) {
            this.isAdd = false
            this.title = '编辑'
            this.visible = true
            this.loadData(record, otherInfo)
        },
        editByChild (record) {
            this.isAdd = false
            this.title = '编辑'
            this.visible = true
            this.loadData(record)
        },
        open (record, otherInfo) {
            this.visible = true
            this.loadData(record, otherInfo)
        },
        close () {
            this.visible = false
        },
        loadData (record, otherInfo) {
            this.viewloading = true
            this.detailUrl(record.id)
                .then((res) => {
                    this.viewloading = false
                    if (res.result) {
                        if (this.loadSuccess && typeof this.loadSuccess === 'function') {
                            this.loadSuccess(res, () => {}, otherInfo)
                        }
                    } else {
                        this.loadSuccess({ result: record }, () => {}, otherInfo)
                    }
                })
                .catch((err) => {
                    this.viewloading = false
                    this.$message.error(err.message)
                })
        },
        // 成功后方法
        loadSuccess (data, callback, otherInfo) {
            callback()
        }
    }
}
