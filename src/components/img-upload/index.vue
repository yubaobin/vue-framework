<!--
  组件名称：文件上传
  -->
<template>
    <div class="img-upload">
        <template v-if="editable">
            <el-upload
                :action="action"
                list-type="picture-card"
                :data="formData"
                :class="{ 'over-limit': !(this.uploadFileList.length < this.limit) }"
                accept="image/*"
                :limit="limit"
                :file-list="uploadFileList"
                :on-success="uploadSuccess"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeUpload"
                :on-exceed="handleExceed"
                :before-remove="beforeRemove"
                :headers="ajaxHeaders"
                v-bind="$attrs"
                :on-remove="handleRemove">
                <img class="tips-img" v-if="idcardz" src="~images/idcard-z.png"/>
                <img class="tips-img" v-else-if="idcardf" src="~images/idcard-f.png"/>
                <i v-else class="el-icon-plus"></i>
            </el-upload>
        </template>
        <div :class="classObj" v-else>
            <ul class="el-upload-list--picture-card img-disabled">
                <li class="el-upload-list__item el-upload--picture-card" v-for="(item, index) in uploadFileList" :key="index" :style="{ width: imgWidth, height: imgHeight }">
                    <img class="el-upload-list__item-thumbnail" :src="item.url" @click="handlePictureCardPreview(item)"/>
                </li>
            </ul>
        </div>
        <div v-if="editable" class="el-upload__tip">
            <slot name="tip"></slot>
        </div>
        <el-dialog :visible.sync="visible" title="图片预览" width="40%" >
            <div style="position: relative;">
                <img width="100%" :src="imgUrl" alt="" />
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'ImgUpload',
    props: {
        value: {
            type: [Array, String],
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
        imgWidth: {
            type: String,
            default: '212px'
        },
        imgHeight: {
            type: String,
            default: '148px'
        },
        idcardz: {
            type: Boolean,
            default: false
        },
        idcardf: {
            type: Boolean,
            default: false
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
            imgUrl: ''
        }
    },
    created () {
    },
    methods: {
        uploadSuccess (res, file, fileList) {
            if (res) {
                const url = this.remoteKey ? res[this.remoteKey] : res
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
            if (file != null && file.type.indexOf('image/') === -1) {
                this.$message.error('上传文件只能是图片')
                return false
            }
            if (this.maxSize) {
                if (file.size > this.maxSize * 1024 * 1024) {
                    this.$message.error('上传文件不能大于' + this.maxSize + 'M')
                    return false
                }
            } else {
                this.formData.fileName = file.name
            }
        },
        beforeRemove () {
            return Promise.resolve()
        },
        handleRemove (file, fileList) {
            this.uploadFileList = fileList.map((item) =>
                Object.assign({}, item)
            )
            this.$emit('input', this.uploadFileList)
            this.$emit('change', this.uploadFileList)
        },
        handlePictureCardPreview (file) {
            this.imgUrl = file.url
            this.visible = true
        },
        handleExceed () {
            this.$message.warning(`只能上传${this.limit}张图片`)
        }
    },
    computed: {
        classObj () {
            return {
                idcardz: this.idcardz,
                idcardf: this.idcardf
            }
        }
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler (newVal) {
                if (newVal) {
                    if (typeof newVal === 'object') {
                        this.uploadFileList = newVal.map((item) =>
                            Object.assign({}, item)
                        )
                    } else if (typeof newVal === 'string') {
                        this.uploadFileList = newVal.split(';').map((item) => {
                            return { url: item }
                        })
                    }
                }
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
.img-disabled {
    padding-left: 0;
}
.over-limit {
    ::v-deep .el-upload--picture-card {
        display: none;
    }
}
.tips-img {
    width: 100%;
    height: 100%;
}
.idcardz,
.idcardf {
    ::v-deep .el-upload--picture-card {
        border: none;
        width: 212px;
        height: 148px;
        padding: 8px;
        img {
            width: auto;
            height: 100%;
            max-width: 100%;
        }
    }
}
</style>
