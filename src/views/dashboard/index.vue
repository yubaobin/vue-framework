<template>
    <div class="hello">
        <ux-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <ux-form-item label="活动名称" prop="name">
                <ux-input v-model="ruleForm.name" prefix-icon="icon-close"></ux-input>
            </ux-form-item>
            <ux-form-item label="活动区域" prop="region">
                <ux-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <ux-option label="区域一" value="shanghai"></ux-option>
                    <ux-option label="区域二" value="beijing"></ux-option>
                </ux-select>
            </ux-form-item>
            <ux-form-item label="活动时间" required>
                <ux-col :span="11">
                    <ux-form-item prop="date1">
                        <ux-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                        style="width: 100%;"></ux-date-picker>
                    </ux-form-item>
                </ux-col>
                <ux-col class="line" :span="2">-</ux-col>
                <ux-col :span="11">
                    <ux-form-item prop="date2">
                        <ux-time-picker placeholder="选择时间" v-model="ruleForm.date2"
                                        style="width: 100%;"></ux-time-picker>
                    </ux-form-item>
                </ux-col>
            </ux-form-item>
            <ux-form-item label="即时配送" prop="delivery">
                <ux-switch v-model="ruleForm.delivery" @change="change"></ux-switch>
            </ux-form-item>
            <ux-form-item label="活动性质" prop="type">
                <ux-checkbox-group v-model="ruleForm.type">
                    <ux-checkbox label="美食/餐厅线上活动" name="type"></ux-checkbox>
                    <ux-checkbox label="地推活动" name="type"></ux-checkbox>
                    <ux-checkbox label="线下主题活动" name="type"></ux-checkbox>
                    <ux-checkbox label="单纯品牌曝光" name="type"></ux-checkbox>
                </ux-checkbox-group>
            </ux-form-item>
            <ux-form-item label="特殊资源" prop="resource">
                <ux-radio-group v-model="ruleForm.resource">
                    <ux-radio label="线上品牌商赞助"></ux-radio>
                    <ux-radio label="线下场地免费"></ux-radio>
                </ux-radio-group>
            </ux-form-item>
            <ux-form-item label="活动形式" prop="desc">
                <ux-input type="textarea" v-model="ruleForm.desc"></ux-input>
            </ux-form-item>
            <ux-form-item label="内置">
                <ux-button type="primary" @click="submitForm('ruleForm')">立即创建</ux-button>
                <ux-button @click="resetForm('ruleForm')">
                    {{ t('my.clear') }}
                    <div>{{ t('my.name', { name }) }}</div>
                </ux-button>
            </ux-form-item>
            <ux-form-item label="vue-i18n">
                <div>
                </div>
            </ux-form-item>
        </ux-form>
        <ux-descriptions title="用户信息">
            <ux-descriptions-item label="用户名">kooriookami</ux-descriptions-item>
            <ux-descriptions-item label="手机号">18100000000</ux-descriptions-item>
            <ux-descriptions-item label="居住地">苏州市</ux-descriptions-item>
            <ux-descriptions-item label="备注">
                <ux-tag size="small">学校</ux-tag>
            </ux-descriptions-item>
            <ux-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</ux-descriptions-item>
        </ux-descriptions>
    </div>
</template>

<script lang="js">
import { Message } from 'ux-ui'
import localeMixins from 'ux-ui/lib/mixins/locale'
import en from 'ux-ui/lib/locale/lang/en'
import zhCn from 'ux-ui/lib/locale/lang/zh-CN'
import locale from 'ux-ui/lib/locale'

const enMerge = {
    my: {
        clear: 'my clear',
        name: 'current-user：{name}'
    },
    ...en
}

const zhMerge = {
    my: {
        clear: '我的清空',
        name: '当前用户：{name}'
    },
    ...zhCn
}

export default {
    mixins: [localeMixins],
    data () {
        return {
            name: '小明',
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }
        }
    },
    created () {
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    Message.success('submit!')
                } else {
                    Message.warning('error submit!!')
                    return false
                }
            })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        change (value) {
            if (value) {
                locale.use(enMerge)
            } else {
                locale.use(zhMerge)
            }
        }
    }
}
</script>
