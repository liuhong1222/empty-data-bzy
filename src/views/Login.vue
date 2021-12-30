<template>
  <div class="login">
    <div class="login-log">
      <img
        :src="downloadDomain + siteInfo.agentLogo"
        :alt="siteInfo.companyShortName"
      />
    </div>
    <div class="login-content">
      <div class="login-img">
        <div class="login-img-wrap">
          <h2>{{ siteInfo.companyShortName }}</h2>
        </div>
        <img src="@/assets/img/login_bg.png" alt="步正云检测" />
      </div>
      <div class="login-form">
        <div v-if="isLogin" class="login-tab" @click="switchLogin">
          <img
            v-if="isCodeLogin"
            src="@/assets/img/login_pwd.svg"
            alt="密码登录"
          />
          <img v-else src="@/assets/img/login_phone.svg" alt="手机登录" />
        </div>
        <div class="login-form-wrap" v-if="isLogin">
          <el-form
            v-if="isCodeLogin"
            ref="codeForm"
            :model="form"
            :rules="codeRules"
            class="login-form-model"
            @keyup.enter.native="onLogin()"
          >
            <el-form-item>
              <div class="login-text">
                <span class="title">欢迎登录</span>
                <span class="note">无需注册，可直接使用手机登录</span>
              </div>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input
                size="large"
                v-model="form.phone"
                placeholder="请输入手机号"
              />
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                size="large"
                style="width: 248px"
                v-model="form.code"
                placeholder="请输入验证码"
              />
              <el-button
                size="large"
                style="width: 104px"
                v-if="isCountDown"
                :disabled="true"
                type="default"
                >{{ count }} s</el-button
              >
              <el-button size="large" v-else type="default" @click="getCode"
                >获取验证码</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                size="large"
                style="width: 100%"
                type="primary"
                @click="onLogin"
              >
                <span class="login-btn">登录</span>
                <img src="@/assets/img/arrow.svg" alt="right" />
              </el-button>
            </el-form-item>
            <!-- <el-form-item>
              <div class="forget-pass-wrap">
                <span @click="toFindPass">忘记密码?</span>
              </div>
            </el-form-item> -->
          </el-form>
          <el-form
            v-else
            ref="pwdForm"
            :model="form"
            :rules="pwdRules"
            class="login-form-model"
            @keyup.enter.native="onLogin()"
          >
            <el-form-item>
              <div class="login-text">
                <span class="title">欢迎登录</span>
                <span class="note">无需注册，可直接使用手机登录</span>
              </div>
            </el-form-item>
            <el-form-item prop="username">
              <el-input
                size="large"
                v-model="form.username"
                placeholder="请输入手机号/邮箱"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                size="large"
                v-model="form.password"
                placeholder="密码"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                size="large"
                style="width: 100%"
                type="primary"
                @click="onLogin"
              >
                <span class="login-btn">登录</span>
                <img src="@/assets/img/arrow.svg" alt="logo" />
              </el-button>
            </el-form-item>
            <!-- <el-form-item>
              <div class="forget-pass-wrap">
                <span @click="toFindPass">忘记密码?</span>
              </div>
            </el-form-item> -->
          </el-form>
        </div>
        <find-password v-if="isFind" />
      </div>
    </div>
    <div class="login-footer">
      <!-- <p>
        上海步正网络科技有限公司 版权所有CopyRight © 2012-<span>{{
          thisYear
        }}</span>
        ALL RIGHTS RESERVED
      </p> -->
      <section class="footer-regin">
        <span>{{ siteInfo.domainCopyright }} &nbsp;&nbsp; 版权所有</span>
        <span
          >公司地址：{{
            siteInfo.domainCompanyAddress
          }}&nbsp;&nbsp;&nbsp;&nbsp;<label
            >联系方式：{{ siteInfo.domainContactWay }}</label
          ></span
        >
        <span
          ><label
            >增值电信业务经营许可证：{{
              siteInfo.telecomCertification
            }}
            &nbsp;</label
          ><a
            href="http://beian.miit.gov.cn"
            target="_blank"
            style="color: #939599"
            >{{ siteInfo.icp }}</a
          ><label style="margin: 0 12px">{{
            siteInfo.publicSecurityFiling
          }}</label>
          <a
            v-if="siteInfo.onlineBlUrl"
            :href="siteInfo.onlineBlUrl"
            target="_blank"
            class="license-link"
          >
            <img src="../assets/img/license.png" alt="电子营业执照" /> </a
        ></span>
      </section>
    </div>
    <div class="login-verify" v-show="isShowSlide" @mouseleave="hideSlide">
      <slide-verify ref="slideblock" @success="sendVerifyCode"></slide-verify>
    </div>
  </div>
</template>

<script>
import { ss } from '../utils/storage.js'
import SlideVerify from '../components/slide_verify.vue'
import FindPassword from '../components/find_password.vue'

export default {
  name: 'Login',
  components: { SlideVerify, FindPassword },
  data() {
    return {
      isLogin: true, // 登录页面
      isFind: false, // 忘记密码页面
      loading: false,
      form: {
        phone: '',
        code: undefined,
        username: '',
        password: '',
        verifySmsToken: undefined
      },
      codeRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '请输入正确的验证码', trigger: 'blur' }
        ]
      },
      pwdRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 位字符', trigger: 'blur' }
        ]
      },
      isCountDown: false,
      count: 60,
      timer: null,
      hideCodeItem: true,
      thisYear: new Date().getFullYear(),
      isCodeLogin: true,
      isShowSlide: false,
      siteInfo: {}
    }
  },
  watch: {
    'form.phone': function (val) {
      this.hideCodeItem = true
      this.form.code = undefined
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.isCountDown = false
    }
  },
  computed: {},
  created() {
    this.getLogo()
  },
  methods: {
    async getLogo() {
      const { data } = await this.$http.get('front/siteInfo')
      this.siteInfo = data.data
    },
    // 隐藏滑块验证码
    hideSlide() {
      setTimeout(() => {
        this.isShowSlide = false
        this.$refs.slideblock.onReset() // 重置滑块
      }, 500)
    },
    // 滑块验证通过，发送验证码请求
    async sendVerifyCode() {
      this.isShowSlide = false // 隐藏滑块
      this.$refs.slideblock.onReset() // 重置滑块
      const { data: res } = await this.$http.post('front/sendCode', {
        phone: this.form.phone
      })
      if (res.code === 200) {
        this.countDownFunc()
        this.form.verifySmsToken = res.data
        this.$message.success('获取验证码成功')
        // console.log(this.form)
        // console.log(this.form.verifySmsToken)
      } else {
        this.$message.error(res.msg)
      }
    },
    isPhone(value) {
      const re = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
      if (re.test(value)) {
        return true
      }
      return false
    },
    // 获取验证码
    getCode() {
      if (!this.form.phone || !this.isPhone(this.form.phone)) {
        return this.$message.error('请输入正确的手机号码')
      }
      this.isShowSlide = true
    },
    // 获取验证码倒计时
    countDownFunc() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.isCountDown = true
      this.count = 60
      this.timer = setInterval(() => {
        this.count = this.count - 1
        if (this.count === 0) {
          clearInterval(this.timer)
          this.timer = null
          this.isCountDown = false
        }
      }, 1000)
    },
    // 切换登录
    switchLogin() {
      this.resetForm()
      this.isCodeLogin = !this.isCodeLogin
    },
    // 点击登录
    onLogin() {
      // console.log(this.isCodeLogin)
      if (this.isCodeLogin) {
        // 验证码登录
        this.$refs.codeForm.validate(async (valid) => {
          if (valid) {
            // console.log(this.form)
            // console.log(this.form.verifySmsToken)
            if (!this.form.verifySmsToken) {
              this.$message.error('请点击获取验证码')
              return
            }
            this.loading = true
            const { data } = await this.$http.post('front/login', this.form)
            this.loading = false
            if (data.code === 200) {
              let token = data.data.token
              ss.set('token', token)
              ss.set('customer', JSON.stringify(data.data.customer))
              ss.set('userInfo', JSON.stringify(data.data.customer))
              this.$router.push('/emptynumber')
            } else if (data.code === 5106) {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: (action) => {
                  window.location.href = data.data
                  // window.open(data.data)
                }
              })
            } else {
              return this.$message.error(data.msg)
            }
          }
        })
      } else {
        // 密码登录
        this.$refs.pwdForm.validate(async (valid) => {
          if (valid) {
            // console.log(this.form)
            const { data } = await this.$http.post('front/userlogin', this.form)
            if (data.code === 200) {
              let token = data.data.token
              ss.set('token', token)
              ss.set('customer', JSON.stringify(data.data.customer))
              ss.set('userInfo', JSON.stringify(data.data.customer))
              // ls.remove('isCertification')
              this.$router.push('/emptynumber')
            } else if (data.code === 5106) {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: (action) => {
                  window.location.href = data.data
                  // window.open(data.data)
                }
              })
            } else {
              return this.$message.error(data.msg)
            }
          }
        })
      }
    },
    // 忘记密码
    toFindPass() {
      this.isLogin = false
      this.isFind = true
    },
    // 返回登录
    toLogin() {
      this.isLogin = true
      this.isFind = false
      this.resetForm()
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.isCountDown = false
    },
    // 重置表单数据
    resetForm() {
      if (this.$refs.codeForm) {
        this.$refs.codeForm.resetFields()
      }
      if (this.$refs.pwdForm) {
        this.$refs.pwdForm.resetFields()
      }
      // this.form = {
      //   phone: '',
      //   code: undefined,
      //   username: '',
      //   password: '',
      //   verifySmsToken: undefined
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(180deg, #fff, #f4f6f8);
  .login-log {
    position: absolute;
    left: 38px;
    top: 30px;
    img {
      width: 180px;
      height: 53px;
    }
  }
  .login-content {
    background-color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -300px;
    margin-left: -500px;
    display: flex;
    flex-direction: row;
    box-shadow: 0 18px 30px 0 rgb(192 195 204 / 40%);
  }
  .login-img {
    position: relative;
    &-wrap {
      width: 100%;
      position: absolute;
      top: 80px;
      text-align: center;
    }
    h2 {
      color: #fff;
      font-size: 32px;
      margin: 0;
    }
  }
  .login-form {
    min-width: 600px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .login-tab {
      cursor: pointer;
      font-size: 50px;
      line-height: 50px;
      position: absolute;
      right: 30px;
      top: 30px;
    }
    &-model {
      min-width: 360px;
    }
    .forget-pass-wrap {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      span {
        cursor: pointer;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #3a72ff;
        line-height: 20px;
      }
    }
    .find-pass-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 14px;
      span {
        cursor: pointer;
        &.grey {
          color: #666a77;
        }
        &.blue {
          color: #3a72ff;
        }
      }
    }
  }
  .find-password,
  .change-pwd {
    min-width: 352px;
  }
  .login-text {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .title {
      font-size: 28px;
      color: #252a3d;
    }
    .note {
      font-size: 14px;
      color: #666a77;
    }
  }
  .login-footer {
    position: absolute;
    bottom: 20px;
    text-align: center;
    width: 100%;
    // p {
    //   font-size: 12px;
    //   color: #c0c3cc;
    // }
    .footer-regin {
      width: 100%;
      height: 100%;
    }

    .footer-regin span {
      color: #939292;
      margin: 10px 15px;
      display: block;
    }

    .footer-regin a {
      color: #939292;
      margin: 0 0 0 10px;
      display: inline-block;
      text-decoration: none;
      cursor: pointer;
    }

    .footer-regin .license-link {
      margin: 0;
      img {
        width: 90px;
        height: 20px;
        vertical-align: middle;
      }
    }
  }
  .login-verify {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000000000;
  }
  .el-button--primary {
    background-color: #3a72ff;
    border-color: #3a72ff;
    .login-btn {
      float: left;
    }
    img {
      float: right;
    }
  }
}
</style>
