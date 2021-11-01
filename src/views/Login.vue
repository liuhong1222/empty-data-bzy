<template>
  <div class="main-wrap">
    <vue-particles
      class="login-bg"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="login-wrap">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="快捷登录" name="phone">
          <el-form :model="form1" :rules="rules1" ref="form1" class="login-form">
            <el-form-item prop="phone">
              <el-input clearable type="text" v-model="form1.phone" placeholder="请输入手机号" prefix-icon="iconfont iconusername" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="imgcode" class="verify" v-if="showImgverify">
              <el-input clearable v-model="form1.imgcode" class="code" placeholder="请输入图片验证码" prefix-icon="iconfont iconweirenzheng" autocomplete="off"></el-input>
              <img class="button" :src="imgVerif" @click="getYzm">
            </el-form-item>
            <el-form-item prop="code">
              <el-input clearable class="code" v-model="form1.code" placeholder="请输入验证码" prefix-icon="iconfont iconpassword" autocomplete="off" @keyup.native.enter="login1"></el-input>
              <el-button type="text" class="button" @click="getYzm" v-show="show">获取验证码</el-button>
              <el-button type="text" class="button" v-cloak v-show="!show" v-bind:class="{'huise':!show}" >重新获取({{counter}}s)</el-button>
            </el-form-item>
            <el-form-item style="margin-top:20px;">
              <el-button type="primary" @click="login1">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="密码登录" name="user">
          <el-form :model="form2" :rules="rules2" ref="form2" class="login-form">
            <el-form-item prop="username">
              <el-input clearable type="text" v-model="form2.username" placeholder="请输入手机号或邮箱" prefix-icon="iconfont iconusername" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input clearable type="password" v-model="form2.password" placeholder="请输入密码" prefix-icon="iconfont iconpassword" autocomplete="off" @keyup.native.enter="login2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login2">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-row style="text-align:center; color: #ff070e">无需注册，可直接使用手机验证码登陆</el-row>
      </el-tabs>
    </div>
    <!-- <el-dialog :visible.sync="dialogVisible" title="提示" :close-on-click-modal="false" width="35%">
      <div>
        {{loginObj.message}}
      </div>
      <div slot="footer" style="width: 100%;">
        <el-button type="primary" @click="goNewTab">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { ss } from '../utils/storage.js'
export default {
  data() {
    return {
      activeName: 'phone',
      showImgverify: false, // 图片验证码
      imgVerif: '', // 图片验证码
      form1: {
        phone: '',
        code: '',
        verifySmsToken: '',
        imgcode: ''
      },
      form2: {
        username: '',
        password: ''
      },
      rememberCheck: true,
      rules1: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        imgcode: [{ required: true, message: '请输入图片验证密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证密码', trigger: 'blur' }]
      },
      rules2: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      show: true,
      timer: null,
      counter: 60,
      dialogVisible: true
    }
  },
  methods: {
    login1() {
      this.$refs.form1.validate(async valid => {
        if (!valid) return
        let obj = this.form1
        delete obj.imgcode
        delete obj.verifyToken
        const { data } = await this.$http.post('front/login', obj)
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
            callback: action => {
              window.location.href = data.data
              // window.open(data.data)
            }
          })
        } else {
          return this.$message.error(data.msg)
        }
      })
    },
    login2() {
      this.$refs.form2.validate(async valid => {
        if (!valid) return
        const { data } = await this.$http.post('front/userlogin', this.form2)
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
            callback: action => {
              window.location.href = data.data
              // window.open(data.data)
            }
          })
        } else {
          return this.$message.error(data.msg)
        }
      })
    },
    // 获取验证码
    async getYzm() {
      if (this.form1.phone === '') return this.$message.error('请输入手机号码')
      this.showImgverify = true
      if (this.form1.imgcode) {
        const { data: res } = await this.$http.post('front/sendCode', {
          phone: this.form1.phone,
          code: this.form1.imgcode,
          verifyToken: this.form1.verifySmsToken
        })
        if (res.code !== 200) return this.$message.error(res.msg)
        this.form1.verifySmsToken = res.data
        if (!this.timer) {
          this.counter = 60
          this.show = false
          this.timer = setInterval(() => {
            if (this.counter > 0 && this.counter <= 60) {
              this.counter--
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      } else {
        const { data } = await this.$http.get('verificationCode/getBase64Image')
        if (data.code !== 200) return this.$message.error(data.msg)
        this.imgVerif = data.data.image
        this.form1.verifySmsToken = data.data.verifyToken
      }
    },
    handleClick(e) {
      this.activeName = e.name
    }
  },
  computed: {
    verifyToken() {
      return this.form1.verifySmsToken
    }
  },
  watch: {
    activeName(newVal, oldVal) {
      newVal === 'phone' ? this.$refs.form2.resetFields() : newVal === 'user' ? this.$refs.form1.resetFields() : console.log('err')
    },
    timer(val) {
      if (val == null) {
        this.show = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../assets/img/bg.jpg") no-repeat center center;
  background-size: cover;
  .login-bg{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    /* background: #3E3E3E; */
    overflow: hidden;
  }
  .login-wrap {
    box-sizing: border-box;
    width: 25%;
    min-width: 450px;
    background-color: #fff;
    padding: 20px;
    border-radius: 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 1;
  }
  .login-form {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    .el-form-item {
      margin: 20px 0;
      width: 100%;
      .el-input {
        width: 100%;
        font-size: 15px;
      }
      .code {
        width: 68%;
      }
      img {
        vertical-align: bottom;
      }
      .button {
        width: 27%;
        margin-left: 5%;
        font-weight: 700;
        font-size: 15px;
        height: 48px;
        line-height: 10px;
        border-color: #dddee1;
      }
      .huise{
        color: #bbbec4;
        background-color: #f7f7f7;
        border-color: #dddee1;
        font-size: 15px;
      }
    }
    .el-button {
      width: 100%;
      height: 48px;
      line-height: 10px;
    }
  }
}
</style>

<style lang="scss">
.login-form .el-input--prefix .el-input__inner {
  padding-left: 40px;
  height: 48px;
}
.login-form .el-input__icon {
  line-height: 48px !important;
  margin-left: 8px;
}
.main-wrap .el-tabs{
  width: 100%;
}
.main-wrap .el-tabs__item {
  width: 100%;
  text-align: center;
  font-size: 16px;
}
.main-wrap .el-tabs__nav {
  width: 50%;
}
</style>
