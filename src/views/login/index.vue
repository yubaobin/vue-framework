<template>
    <div class="login-container">
        <div class="login">
            <div class="nav-title">
                <div class="title-text">欢迎登录</div>
            </div>
            <el-form :model="form" :rules="rules" ref="form" size="large" label-width="0px">
                <el-form-item prop="username">
                    <el-input type="text" v-model="form.username" placeholder="请输入账号" autocomplete="off">
                        <svg-icon slot="prefix" icon-name="zhanghao"></svg-icon>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        v-model="form.password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        @keyup.native.capture="handleKeyUp"
                        @keypress.native.capture="handleKeyPress"
                    >
                        <el-tooltip slot="prefix" v-model="lockVisible" manual class="item" effect="dark" content="大写锁定已打开" placement="bottom-end">
                            <svg-icon icon-name="mima"></svg-icon>
                        </el-tooltip>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input type="text" v-model="form.code" placeholder="请输入短信验证码" autocomplete="off">
                        <svg-icon slot="prefix" icon-name="yanzhengma"></svg-icon>
                        <verify-code slot="suffix" ref="verifyCode" :handle="getVcode" style="right: 0;" text="获取验证码"></verify-code>
                    </el-input>
                </el-form-item>
                <el-form-item >
                    <el-button class="btn-large" type="primary" size="small" @click="submit" :loading="loading">登录</el-button>
                </el-form-item>
                <div class="login-bottom">
                    <el-form-item prop="checked">
                        <el-checkbox v-model="form.checked"></el-checkbox>
                        <a class="xy-span f-primary" @click="openProtocol">《用户协议》</a>
                        <span style="color:#333">和</span>
                        <a class="xy-span f-primary" @click="openPrivacy">《隐私协议》</a>
                        <router-link class="f-primary fr" to="/forget">忘记密码</router-link>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <footer>
            <ul>
                <li class="footer-info">
                    <h4>服务时间</h4>
                    <p>周一至周五(法定节假日除外)</p>
                    <p>上午 9:00-11:30 下午 14:30-17:30</p>
                </li>
                <li class="footer-info">
                    <h4>服务电话</h4>
                    <p>x00-x2x-xxxx</p>
                </li>
                <li class="footer-info">
                    <h4>联系我们</h4>
                    <p>公司地址：xxx省xxx市xx区xx路xx号xx中心xx层</p>
                    <p>投诉举报：x00-x2x-xxxx</p>
                </li>
            </ul>
            <p class="copy">&copy;2021 xx有限公司版权所有 xx备 xxx号-x xxx经营许可证</p>
        </footer>
        <el-dialog title="用户协议" :visible.sync="protocolVisible" append-to-body width="70%" top="10vh" showClose>
            <div class="content">
                <protocol-model></protocol-model>
            </div>
        </el-dialog>
        <el-dialog title="隐私协议" :visible.sync="privacyVisible" append-to-body width="70%" top="10vh" showClose>
            <div class="content">
                <privacy-model></privacy-model>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import VerifyCode from 'components/verify-code'
import ProtocolModel from './protocol/protocol-model'
import PrivacyModel from './protocol/privacy-model'
export default {
    components: {
        VerifyCode,
        ProtocolModel,
        PrivacyModel
    },
    data () {
        const validCheck = (rules, value, callback) => {
            if (value) {
                callback()
            } else {
                callback(new Error('请先阅读并同意协议'))
            }
        }
        function checkCode (rule, value, callback) {
            if (value) {
                callback()
            } else {
                callback(new Error('请输入验证码'))
            }
        }
        return {
            tfa: '',
            lockVisible: false,
            isCapital: false,
            protocolVisible: false,
            privacyVisible: false,
            loading: false,
            form: {
                username: '',
                password: '',
                checked: ''
            },
            rules: {
                username: [{ required: true, message: '请输入账号' }],
                password: [{ required: true, message: '请输入密码' }],
                tel: [{ required: true, message: '请输入手机号码' }],
                code: [{ validator: checkCode, trigger: ['change', 'blur'] }],
                checked: [{ validator: validCheck }]
            }
        }
    },
    created () {
        document.addEventListener('keydown', this.handleKeyDown)
    },
    beforeDestroy () {
        document.removeEventListener('keydown', this.handleKeyDown)
    },
    methods: {
        handleKeyDown (e) {
            const keyCode = e.which || e.keyCode
            if (keyCode === 13) {
                this.submit()
            }
        },
        handleKeyUp (e) {
            if (e.keyCode === 20 && this.isCapital) {
                this.lockVisible = true
            }
        },
        handleKeyPress (e) {
            const keyCode = e.keyCode
            const shiftKey = e.shiftKey || keyCode === 16
            if (
                (keyCode >= 65 && keyCode <= 90 && !shiftKey) || // CapsLock 锁定 未按 shiftKey
                (keyCode >= 97 && keyCode <= 122 && shiftKey)
            ) {
                // CapsLock 锁定 已按 shiftKey
                this.isCapital = true
                this.lockVisible = true
            } else {
                this.isCapital = false
                this.lockVisible = false
            }
        },
        openProtocol () {
            this.protocolVisible = true
        },
        openPrivacy () {
            this.privacyVisible = true
        },
        submit () {
            this.$refs.form.validate(valid => {
                if (valid) {
                }
            })
        },
        getVcode (callback) {
            this.$message.success('温馨提示：您账号绑定的手机号为：')
            callback()
        }
    }
}
</script>
