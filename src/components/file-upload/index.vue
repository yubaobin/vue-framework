<!--
  组件名称：文件上传
  -->
<template>
    <div class="file-upload">
        <template v-if="editable">
            <el-upload
                :action="action"
                :data="formData"
                :multiple="multiple"
                :class="{ 'over-limit': !(this.uploadFileList.length < this.limit) }"
                :limit="limit"
                :accept="accept"
                :show-file-list="false"
                :file-list="uploadFileList"
                :headers="ajaxHeaders"
                v-bind="$attrs"
                :on-success="uploadSuccess"
                :before-upload="beforeUpload"
                :on-progress="handleProgress"
                :on-exceed="handleExceed">
                <el-button slot="trigger" icon="el-icon-upload">{{ text }}</el-button>
                <div class="el-upload__tip"><slot name="tip"></slot></div>
                <el-progress v-if="showProcess" :percentage="percentage"></el-progress>
                <ul class="el-upload-list el-upload-list--text">
                    <transition-group name="el-list">
                        <li v-for="(item, index) in uploadFileList" :key="`upload_${index}`">
                            <div class="el-upload-list__item-inner">
                                <a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{ item.name || getFileName(item.url) }}</a>
                                <div class="file-right">
                                    <i class="el-icon-delete f-danger" @click.stop="handleRemove(item, index)"></i>
                                </div>
                            </div>
                        </li>
                    </transition-group>
                </ul>
            </el-upload>
        </template>
        <div v-else>
            <ul class="upload-file-list">
                <li class="upload-file-list__item" v-for="(item, index) in value" :key="index" >
                    <div class="content">
                        <div class="name">{{ item.name }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FileUpload',
    props: {
        value: {
            type: Array,
            default: () => []
        },
        limit: {
            type: Number,
            default: 3
        },
        editable: {
            type: Boolean,
            default: true
        },
        multiple: {
            type: Boolean,
            default: true
        },
        accept: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: '点击上传'
        },
        fileType: {
            type: String,
            default: 'all'
        },
        maxSize: {
            type: Number,
            default: 0
        },
        action: {
            type: String,
            default: ''
        },
        headers: {
            type: Object,
            default: () => {}
        },
        data: {
            type: Object,
            default: () => {}
        },
        remoteKey: {
            type: String,
            default: 'data'
        }
    },
    data () {
        return {
            visible: false,
            formData: {
                fileName: ''
            },
            ajaxHeaders: {},
            uploadFileList: [],
            percentage: 0,
            showProcess: ''
        }
    },
    created () {
    },
    methods: {
        uploadSuccess (res, file, fileList) {
            this.showProcess = false
            if (res) {
                const url = this.remoteKey ? res[this.remoteKey] : res
                this.status = file.status
                if (url.indexOf('http://') > -1) {
                    file.url = url
                } else {
                    file.url = `http://${url}`
                }
                this.uploadFileList = fileList.map((item) =>
                    Object.assign({}, item)
                )
                this.$emit('input', this.uploadFileList)
                this.$emit('change', this.uploadFileList)
            } else {
                const { uid } = file
                const index = fileList.findIndex((item) => item.uid === uid)
                if (index > -1) {
                    fileList.splice(index, 1)
                }
                this.$message.error('上传失败')
            }
        },
        beforeUpload (file) {
            const result = this.verify(file.name)
            if (result) {
                this.$message.error(result)
                return false
            } else {
                if (this.maxSize) {
                    if (file.size > this.maxSize * 1024 * 1024) {
                        this.$message.error(
                            '上传文件不能大于' + this.maxSize + 'M'
                        )
                        return false
                    } else {
                        this.formData.fileName = file.name
                    }
                } else {
                    this.formData.fileName = file.name
                }
            }
        },
        handleProgress (event, file) {
            this.showProcess = true
            this.percentage = event.percent
            this.status = file.status
        },
        handleRemove (file, index) {
            this.uploadFileList.splice(index, 1)
            this.$message.success('删除成功')
            this.$emit('input', this.uploadFileList)
            this.$emit('change', this.uploadFileList)
        },
        handleExceed () {
            this.$message.warning(`只能上传${this.limit}个文件`)
        },
        checkSpChar (name) {
            /* eslint-disable no-useless-escape */
            const reg = /[`~!@#$^&*()=|{}':;',\[\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/
            if (reg.test(name)) {
                return '上传文件名包括特殊字符'
            } else {
                return ''
            }
        },
         getFileName (url) {
            if (url) {
                const firstIndex = url.lastIndexOf('/')
                return url.substr(firstIndex + 1)
            } else {
                return ''
            }
        },
        // 检验文件
        verify (value) {
            let msg = ''
            const files = value.match(/[^\\]+\..+/g) || [] || ''
            if (files.length === 0) msg = '请选择文件'
            switch (this.fileType) {
                case 'all': // 所有文件
                    break
                case 'file': // 文本
                    if (
                        !RegExp(
                            '\\w\\.(' + 'docx|doc|xlsx|xls|ppt|pptx|pdf' + ')$',
                            'i'
                        ).test(escape(value))
                    ) {
                        msg = '上传文件格式不符合'
                    }
                    break
                case 'video': // 视频文件
                    if (
                        !RegExp(
                            '\\w\\.(' +
                                'avi|mp4|wma|rmvb|rm|flash|3gp|flv' +
                                ')$',
                            'i'
                        ).test(escape(value))
                    ) {
                        msg = '上传文件格式不符合'
                    }
                    break
                case 'audio': // 音频文件
                    if (
                        !RegExp('\\w\\.(' + 'mp3|wav|vcm|pcm' + ')$', 'i').test(
                            escape(value)
                        )
                    ) {
                        msg = '上传文件格式不符合'
                    }
                    break
                case 'img': // 图片文件
                    let check = false
                    files.forEach((item) => {
                        if (
                            !RegExp(
                                '\\w\\.(' + 'jpg|png|bmp|jpeg$' + ')',
                                'i'
                            ).test(escape(item))
                        ) {
                            check = true
                        }
                    })
                    if (check) {
                        msg = '上传文件格式不符合'
                    }
                    break
            }
            const resultChar = this.checkSpChar(value)
            return msg || resultChar
        }
    },
    watch: {
        value: {
            immediate: true,
            handler (newVal) {
                this.uploadFileList = newVal.map((item) =>
                    Object.assign({}, item, { audioPlay: false })
                )
            }
        },
        data: {
            immediate: true,
            deep: true,
            handler (newVal) {
                this.formData = Object.assign({}, this.formData, newVal)
            }
        },
        headers: {
            immediate: true,
            deep: true,
            handler (newVal) {
                this.ajaxHeaders = Object.assign({}, this.ajaxHeaders, newVal)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.file-upload {
    ::v-deep {
        .el-upload--text {
            text-align: left;
        }
    }
}
.upload-file-list {
    list-style: none;
    padding: 0;
    margin: 0;
    .upload-file-list__item {
        display: inline-block;
        vertical-align: top;
        margin-right: 24px;
        .icon {
            height: 48px;
            vertical-align: middle;
            margin-right: 12px;
        }
        .content {
            display: inline-block;
            vertical-align: middle;
            min-width: 120px;
            line-height: 1;
            .name {
                color: $--color-black;
            }
            .other-info {
                color: $--color-text-primary;
                .text {
                    margin-right: 16px;
                }
                .el-button--text {
                    color: $--color-text-primary;
                    ::v-deep {
                        span {
                            margin-left: 2px;
                        }
                    }
                }
            }
        }
        &:after {
            content: '';
            display: table;
            clear: both;
        }
    }
}
.el-upload-list {
    max-height: 100px;
    overflow-y: auto;
    li {
        &:after {
            content: '';
            display: table;
            clear: both;
        }
    }
    .el-upload-list__item-inner {
        float: left;
        width: 80%;
        margin-bottom: 4px;
        position: relative;
        background-color: #f5f5f5;
    }
    .btn-right {
        float: left;
        width: 20%;
        padding-left: 8px;
        box-sizing: border-box;
        .el-button {
            color: rgba(#000, 0.85);
        }
        [class^='el-icon-'],
        [class*=' el-icon-'] {
            margin-right: 4px;
        }
    }
}
.file-right {
    position: absolute;
    top: 0;
    right: 18px;
    cursor: pointer;
    opacity: 0.75;
    color: #606666;
}
</style>
