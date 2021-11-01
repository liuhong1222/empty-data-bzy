<template>
  <div class="home">
    <el-container class="home-container" style="height: 100vh">
    <el-header>
      <div class="logo" v-if="logoishide">
        <img :src="logoUrl">
      </div>
      <div class="title_logo" v-if="logoisshow">
        <span class="el-icon-menu"></span>
      </div>
      <div class="change_btn" @click="toggleCollapse">
        <i :class=" isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
      <div class="menu">
        <el-menu
          :default-active="active"
          background-color="#3f4457"
          text-color="#fff"
          active-text-color="#fff"
          router
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="index">控制台</el-menu-item>
          <el-menu-item index="safety">账户中心</el-menu-item>
        </el-menu>
      </div>
      <div class="user_name">
        <el-popover width="240" trigger="hover" placement="bottom">
          <el-col :span="24">
            <el-col :span="24">
              <div class="box">
                <div>
                  <!-- 客服数据 -->
                  <p class="name">客服: {{contract.maintainerNickname}}</p>
                  <p class="number">手机号: {{contract.maintainerPhone}}</p>
                  <el-button size="small" plain icon="iconfont iconqq" class="button" @click="goToQQ(contract.maintainerQq)"> QQ交谈</el-button>
                </div>
                <div class="img_div">
                  <p>微信二维码</p>
                  <img :src="contract.maintainerWechatQrcode" alt="微信二维码">
                </div>
              </div>
            </el-col>
          </el-col>
          <div slot="reference">
            <span class="rit-span">
              <i class="iconfont iconkefu" style="margin-right: 0px;"></i>
              联系客服
            </span>
          </div>
        </el-popover>
        <span class="rit-span" @click="numberCube">
          <i class="iconfont iconshoujihaoma" style="margin-right: 0px;"></i>
          号码魔方下载
        </span>
        <div class="name">
          <p class="p1">{{phone}}</p>
          <p class="p2">{{name}}</p>
        </div>
        <div class="name">
          <el-button type="danger" size="small" @click="logOut">退出登录</el-button>
        </div>
      </div>
    </el-header>
    <!-- 侧边栏 -->
    <el-container style="height: 50vh">
      <el-aside class="home_aside" :width="isCollapse ? '64px' : '200px'" v-if="active === 'index'">
        <el-menu
          :default-active="$route.path"
          background-color="#fff"
          text-color="#59607c"
          active-text-color="#fff"
          router
          :collapse-transition="false"
          :collapse="isCollapse"
        >
          <el-menu-item index="/index">
            <i class="iconfont iconshouye"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/product">
            <i class="iconfont iconchanpinguanli"></i>
            <span slot="title">产品管理</span>
          </el-menu-item>
          <el-menu-item index="/emptynumber">
            <i class="iconfont iconshendujiance"></i>
            <span slot="title">空号在线检测</span>
          </el-menu-item>
          <el-menu-item index="/realtime">
            <i class="iconfont iconjiance"></i>
            <span slot="title">号码实时检测</span>
          </el-menu-item>
          <el-menu-item index="/matching">
            <i class="iconfont iconpipei"></i>
            <span slot="title">号码匹配</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-aside class="home_aside" :width="isCollapse ? '64px' : '200px'" v-else>
        <el-menu
          :default-active="$route.path"
          background-color="#fff"
          text-color="#59607c"
          active-text-color="#fff"
          router
          :collapse-transition="false"
          :collapse="isCollapse"
          :unique-opened="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont iconzhanghuguanli"></i>
              <span>账户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/safety">账户安全</el-menu-item>
              <el-menu-item index="/data">账户资料</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont iconchongzhijilu"></i>
              <span>充值记录</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/khrecord">空号检测</el-menu-item>
              <el-menu-item index="/sskecord">实时检测</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import { ss } from '../utils/storage.js'
export default {
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      logoishide: true,
      logoisshow: false,
      active: 'index',
      name: '',
      phone: '',
      logoUrl: '',
      contract: {},
      siteInfo: {}
    }
  },
  methods: {
    logOut() {
      this.$confirm('此操作将退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ss.remove('token')
        ss.remove('customer')
        this.$router.push('/login')
      })
    },
    async getLogo() {
      const { data } = await this.$http.get('front/siteInfo')
      this.logoUrl = data.data.agentLogo
      this.siteInfo = data.data
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      this.logoishide = !this.logoishide
      this.logoisshow = !this.logoisshow
    },
    handleSelect(key) {
      this.active = key
    },
    numberCube() {
      if (this.siteInfo.domain === 'buzheny.com') {
        window.open(`${this.$http.defaults.baseURL}/resource/步正号码魔方.rar`)
      } else if (this.siteInfo.domain === 'yfeifei.com') {
        window.open(`${this.$http.defaults.baseURL}/resource/肥肥号码魔方.rar`)
      } else if (this.siteInfo.domain === 'shihaoy.com') {
        window.open(`${this.$http.defaults.baseURL}/resource/实号号码魔方.rar`)
      } else if (this.siteInfo.domain === 'zqyjc.com') {
        window.open(`${this.$http.defaults.baseURL}/resource/朱雀云号码魔方.rar`)
      } else if (this.siteInfo.domain === 'dameipr.com') {
        window.open(`${this.$http.defaults.baseURL}/resource/达美号码魔方.rar`)
      } else {
        window.open(`${this.$http.defaults.baseURL}/resource/号码魔方.rar`)
      }
    },
    // 获取联系人
    async getContractInfo() {
      const { data } = await this.$http.post('front/personal/getContractInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.contract = data.data
    },
    goToQQ(qq) {
      window.open(`https://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`)
    }
  },
  created() {
    this.getLogo()
    this.getContractInfo()
    this.name = JSON.parse(ss.get('customer')).name
    this.phone = JSON.parse(ss.get('customer')).phone
  },
  watch: {
    $route: {
      handler: function (route) {
        const arr = ['/index', '/product', '/emptynumber', '/realtime', '/matching']
        if (arr.indexOf(route.path) > -1) {
          this.active = 'index'
        } else {
          this.active = 'safety'
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .home-container {
    height: 100%;
  }

  .el-header {
    padding-left: 0;
    height: 60px !important;
    box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.12);
    background-color: #3f4457;
    color: #fff;
    overflow: hidden;
    .logo {
      float: left;
      height: 60px;
      color: #fff;
      font-size: 20px;
      background-color: #3f4457;
      box-sizing: border-box;
      padding: 10px 48px;
      img {
        height: 40px;
      }
    }
    .title_logo {
      float: left;
      background-color: #3f4457;
      width: 64px;
      font-size: 20px;
      color: #ffffff;
      line-height: 60px;
      padding-left: 20px;
      box-sizing: border-box;
    }
    .change_btn {
      float: left;
      padding: 0 20px;
      height: 60px;
      line-height: 60px;
      font-size: 23px;
      cursor: pointer;
    }
    .menu {
      float: left;
      .el-menu {
        color: #fff;
        height: 60px;
        line-height: 60px;
        background-color: #3f4457;
      }
    }
    .user_name {
      height: 60px;
      float: right;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      margin-right: 30px;
      .rit-span {
        height: 60px;
        display: inline-block;
        line-height: 60px;
        padding: 0 15px;
        cursor: pointer;
      }
      .rit-span:hover {
        color: #5290fd;
        background-color: #363b4f !important;
      }
      .name {
        font-size: 12px;
        margin-left: 20px;
        .p1 {
          margin: 0 5px;
        }
        .p2 {
          margin: 0 5px;
          width: 90px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .home_aside {
    .el-menu {
      border-right: 0;
      height: 100%;
      .icon {
        font-size: 16px;
      }
    }
  }

  .iconfont {
    margin-right: 10px;
  }

  .el-main {
    background-color: #f0f2f5;
  }

  .menu .is-active {
    border-bottom-color: #5290fd !important;
  }

  .home_aside .el-menu-item:focus,
  .home_aside .el-menu-item:hover,
  .home_aside .el-submenu__title:hover {
    outline: 0;
    background-color: rgba(255, 255, 255) !important;
    color: rgb(0, 0, 0) !important;
    i {
      color: rgb(0, 0, 0) !important;
    }
  }
}
</style>

<style>
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-submenu__title:hover {
  background-color: rgba(255, 255, 255) !important;
  color: rgb(0, 0, 0) !important;
}
 .home_aside .is-active {
  color: rgb(0, 0, 0) !important;
  font-weight: 700;
}
.iconqq{
  color: #689cfc;
}
.button{
  box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
  transition: all .3s ease-in-out;
}
.el-popover {
  text-align: center;
}
.el-popover .box {
  display: flex;
  justify-content: space-between;
}
.el-popover .box .img_div img{
  width: 70px;
  height: 70px;
}
.el-popover .box p{
  margin: 10px 0;
}
</style>
