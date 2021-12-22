<template>
  <div class="find-password">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item>
        <div class="login-text">
          <span class="title">找回密码</span>
        </div>
      </el-form-item>
      <div class="mobile-code-wrap" v-if="isFind">
        <el-form-item prop="mobile">
          <el-input size="large" v-model="form.mobile" placeholder="手机号" />
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            size="large"
            style="width: 240px"
            v-model="form.code"
            placeholder="验证码"
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
            size="large"
            style="width: 100%"
            type="primary"
            @click="onNext"
          >
            <span class="login-btn">下一步</span>
            <img src="@/assets/img/arrow.svg" alt="right" />
          </el-button>
        </el-form-item>
        <el-form-item>
          <div class="find-pass-wrap">
            <div>
              <span class="grey">无法接受验证码？</span>
              <span class="blue">联系客服</span>
            </div>
            <span class="blue" @click="toLogin">返回登录</span>
          </div>
        </el-form-item>
      </div>
      <div class="new-pass-wrap" v-if="!isFind">
        <el-form-item prop="password">
          <el-input-password
            size="large"
            v-model="form.password"
            placeholder="输入密码"
          />
        </el-form-item>
        <el-form-item prop="passwordRepeat">
          <el-input-password
            size="large"
            v-model="form.passwordRepeat"
            placeholder="确认新密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            size="large"
            style="width: 100%"
            type="primary"
            @click="changePass"
          >
            <span class="login-btn">确认修改</span>
            <img src="@/assets/img/arrow.svg" alt="right" />
          </el-button>
        </el-form-item>
        <el-form-item>
          <div class="forget-pass-wrap">
            <span class="blue" @click="toLogin">返回登录</span>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
const Base64 = require('js-base64').Base64

export default {
  name: 'FindPassword',
  components: {},
  data() {
    // 验证码校验
    var validateCode = (rule, value, callback) => {
      this.$api
        .validateCode({
          userName: this.form.userName,
          mobile: this.form.mobile,
          code: this.form.code
        })
        .then((res) => {
          const { code, message } = res
          if (code === '000000') {
            // 验证码校验通过
            callback()
            this.validateStatus = true
            this.onNext()
          } else {
            callback(new Error(message))
          }
        })
    }
    // 新密码校验
    var validateNewPass = (rule, value, callback) => {
      if (value === '123456') {
        callback(new Error('新密码不能设置为 123456'))
      } else if (this.$md5(value) === this.$cookie.get('ticket')) {
        callback(new Error('新密码不能和原始密码相同'))
      } else {
        callback()
      }
    }
    // 密码强度校验
    // var validateStrength = (rule, value, callback) => {
    //   let reg = /((?=.*\d)(?=.*\D)|(?=.*[el-zel-Z])(?=.*[^el-zel-Z]))(?!^.*[\u4E00-\u9FA5].*$)/
    //   if (!reg.test(value)) {
    //     callback(new Error('密码需包含字母，符号或数字中至少两项'))
    //   } else {
    //     callback()
    //   }
    // }
    // 确认密码校验
    var validatePass = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      isFind: true,
      validateStatus: false,
      form: {
        mobile: '',
        code: '',
        password: '',
        passwordRepeat: '',
        userName: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 位字符',
            trigger: 'blur'
          },
          { validator: validateNewPass, trigger: 'blur' }
          // { validator: validateStrength, trigger: 'blur' }
        ],
        passwordRepeat: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '长度在 6 到 16 位字符',
            trigger: 'blur'
          },
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      isCountDown: false,
      count: 120,
      timer: null
    }
  },
  computed: {},
  created() {},
  methods: {
    // 获取验证码
    async getCode() {
      if (this.form.mobile) {
        // this.$api
        //   .forgetPwd({
        //     mobile: this.form.mobile
        //   })
        //   .then((res) => {
        //     const { code, data = '', message } = res
        //     this.countDownFunc()
        //     if (code === '000000') {
        //       this.countDownFunc()
        //       this.form.userName = data
        //       this.$message.success(message)
        //     } else {
        //       this.$message.error(message)
        //     }
        //   })
        const { data } = await this.$http.post('front/customer/sendSms', {
          phone: this.form.mobile
        })
        if (data.code !== 200) return this.$message.error(data.msg)
        console.log(data)
      } else {
        this.$message.error('请先输入手机号')
      }
    },
    countDownFunc() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.isCountDown = true
      this.count = 120
      this.timer = setInterval(() => {
        this.count = this.count - 1
        if (this.count === 0) {
          clearInterval(this.timer)
          this.timer = null
          this.isCountDown = false
        }
      }, 1000)
    },
    // 返回登录
    toLogin() {
      this.$parent.toLogin()
    },
    // 下一步
    onNext() {
      if (this.validateStatus) {
        if (this.form.mobile && this.form.code) {
          this.isFind = false
        } else {
          this.$message.error('请先输入手机号和验证码')
        }
      }
    },
    // 确认修改
    changePass() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$api
            .modifyPwd({
              mobile: this.form.mobile,
              pwd: Base64.encode(this.form.password)
            })
            .then((res) => {
              const { code, message } = res
              if (code === '000000') {
                this.$message.success('密码修改成功')
                this.$parent.toLogin()
              } else {
                this.$message.error(message)
              }
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
