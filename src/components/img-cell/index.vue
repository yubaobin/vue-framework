<!--
  组件名称：
  -->
<template>
    <div class="img-cell">
        <div class="t-img-list">
            <template v-for="(item, index) in list">
                <div class="img-item" :style="styleObj" :key="`${item.formatUrl}_${index}`">
                    <template v-if="useDefault">
                        <img class="default-img" @click.stop="openImg()" :src="item.formatUrl" alt="" oncontextmenu="return false;" />
                        <div class="tips" v-if="errtext && useDefault">
                            {{ errtext }}
                        </div>
                    </template>
                    <template v-else>
                        <img :src="item.formatUrl" @click.stop="openImg(item.url)" @error="handleImgError" alt="" oncontextmenu="return false;"/>
                    </template>
                </div>
            </template>
        </div>
        <el-dialog :visible.sync="visible" :title="title" width="60%" :modal="false" append-to-body>
            <div class="view-img">
                <img class="" :src="imgUrl" alt="" @error="handleImgError" oncontextmenu="return false;"/>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import defaultPeoplePic from 'images/default-pic.jpg'
import defaultCarPic from 'images/default-car.jpg'
export default {
    name: 'ImgCell',
    props: {
        value: {
            type: [Array, String],
            default: ''
        },
        size: {
            type: [String, Array],
            default: () => ['60px', '60px']
        },
        type: {
            type: String,
            default: 'people'
        },
        errtext: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            visible: false,
            imgUrl: '',
            list: [],
            title: '图片预览',
            useDefault: true
        }
    },
    created () {
    },
    methods: {
        openImg (url) {
            if (this.$listeners.click) {
                this.$emit('click')
            } else if (url) {
                this.visible = true
                this.imgUrl = url
            }
        },
        handleImgError (e) {
            this.useDefault = true
            let defaultPic = defaultPeoplePic
            if (this.type === 'car') {
                defaultPic = defaultCarPic
            }
            e.target.src = defaultPic
        }
    },
    computed: {
        styleObj () {
            let width = 'auto'
            let height = 'auto'
            if (typeof this.size === 'string') {
                width = this.size
            } else if (Array.isArray(this.size)) {
                if (this.size.length) {
                    if (this.size.length === 1) width = this.size[0]
                    if (this.size.length > 1) {
                        width = this.size[0]
                        height = this.size[1]
                    }
                }
            }
            return { width, height }
        }
    },
    watch: {
        value: {
            immediate: true,
            handler (newVal) {
                if (newVal) {
                    this.useDefault = false
                    if (typeof newVal === 'object') {
                        this.list = newVal.map((item) =>
                            Object.assign({}, item, { formatUrl: item.url })
                        )
                    } else if (typeof newVal === 'string') {
                        if (/^data:/.test(newVal)) {
                            this.list = [{ url: newVal, formatUrl: newVal }]
                        } else {
                            this.list = newVal.split(';').map((item) => {
                                return {
                                    url: item,
                                    formatUrl: item
                                }
                            })
                        }
                    }
                } else {
                    this.useDefault = true
                    let defaultPic = defaultPeoplePic
                    if (this.type === 'car') {
                        defaultPic = defaultCarPic
                    }
                    this.list = [{ url: defaultPic, formatUrl: defaultPic }]
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.img-cell {
    display: inline-block;
    vertical-align: middle;
    .tips {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #333;
    }
}
.view-img {
    position: relative;
    display: block;
    max-width: 100%;
    margin: auto;
    img {
        display: block;
        width: 100%;
    }
}
.t-img-list {
    text-align: center;
    .img-item {
        position: relative;
        border-radius: 8px;
        & + .img-item {
            margin-left: 8px;
        }
        img {
            display: block;
            height: 100%;
            width: 100%;
        }
        .default-img {
            width: 100%;
            height: auto;
        }
    }
}
.view-img-list {
    text-align: center;
    .img-item {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin: 0 8px;
        img {
            display: block;
            max-width: 500px;
            max-height: 500px;
        }
    }
}
</style>
