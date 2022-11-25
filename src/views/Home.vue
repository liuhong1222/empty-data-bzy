<template>
  <div class="home">
    <el-container class="home-container" style="height: 100vh">
      <el-header>
        <div class="logo" v-if="logoishide">
          <img :src="logoUrl" />
        </div>
        <div class="title_logo" v-if="logoisshow">
          <span class="el-icon-menu"></span>
        </div>
        <div class="change_btn" @click="toggleCollapse">
          <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
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
            <el-menu-item index="emptynumber">产品中心</el-menu-item>
            <el-menu-item index="safety">账户中心</el-menu-item>
            <el-menu-item index="emptyrealapi">接口调试</el-menu-item>
          </el-menu>
        </div>
        <div class="user_name">
          <el-popover width="240" trigger="hover" placement="bottom">
            <el-col :span="24">
              <el-col :span="24">
                <div class="box">
                  <div>
                    <!-- 客服数据 -->
                    <p class="name">客服: {{ contract.maintainerNickname }}</p>
                    <p class="number">手机号: {{ contract.maintainerPhone }}</p>
                    <el-button
                      size="small"
                      plain
                      icon="iconfont iconqq"
                      class="button"
                      @click="goToQQ(contract.maintainerQq)"
                    >
                      QQ交谈</el-button
                    >
                  </div>
                  <div class="img_div">
                    <p>微信二维码</p>
                    <img
                      :src="downloadDomain + contract.maintainerWechatQrcode"
                      alt="微信二维码"
                    />
                  </div>
                </div>
              </el-col>
            </el-col>
            <div slot="reference">
              <span class="rit-span">
                <i class="iconfont iconkefu" style="margin-right: 0px"></i>
                联系客服
              </span>
            </div>
          </el-popover>
          <el-dropdown @command="handleMobileCube">
            <span class="rit-span">
              <i class="el-icon-download"></i>
              <span style="margin: 0 4px">号码魔方下载</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu class="el-dropdown-list el-dropdown-mobilecub" slot="dropdown">
              <el-dropdown-item command="A">国内</el-dropdown-item>
              <el-dropdown-item command="B">国际</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="name rit-span" @mouseenter="showDrop()" @mouseleave="hideDrop()">
            <span class="p1">{{ phone }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <ul
            class="drop-list"
            v-show="isDropShow"
            @mouseenter="showDrop()"
            @mouseleave="hideDrop()"
          >
            <li @click="$router.push('/data')">认证资料</li>
            <li @click="$router.push('/safety')">修改密码</li>
            <li @click="logOut">退出登录</li>
          </ul>
          <!-- <div class="name">
          <el-button type="danger" size="small" @click="logOut">退出登录</el-button>
        </div> -->
        </div>
      </el-header>
      <!-- 侧边栏 -->
      <el-container style="height: 50vh">
        <el-aside
          class="home_aside"
          :width="isCollapse ? '64px' : '200px'"
          v-if="active === 'emptynumber' || active === 'emptyrealapi'"
        >
          <el-menu
            :default-active="$route.path"
            background-color="#fff"
            text-color="#59607c"
            active-text-color="#fff"
            router
            :collapse-transition="false"
            :collapse="isCollapse"
          >
            <!-- <el-menu-item index="/index">
            <i class="iconfont iconshouye"></i>
            <span slot="title">首页</span>
          </el-menu-item> -->
            <el-menu-item index="/emptynumber">
              <i class="iconfont iconshendujiance"></i>
              <span slot="title">空号在线检测</span>
            </el-menu-item>
            <el-menu-item index="/realtime">
              <i class="iconfont iconjiance"></i>
              <span slot="title">号码实时查询</span>
            </el-menu-item>
            <el-menu-item index="/international">
              <i class="el-icon-bangzhu gj-icon"></i>
              <span slot="title">国际号码检测</span>
            </el-menu-item>
            <el-menu-item index="/direct">
              <i class="el-icon-circle-plus-outline gj-icon"></i>
              <span slot="title">国际定向检测</span>
            </el-menu-item>
            <!-- <el-menu-item index="/emptyapi">
            <i class="iconfont iconshendujiance"></i>
            <span slot="title">空号检测API</span>
          </el-menu-item>
          <el-menu-item index="/realtimeapi">
            <i class="iconfont iconjiance"></i>
            <span slot="title">号码实时查询API</span>
          </el-menu-item> -->
            <el-menu-item index="/matching">
              <i class="iconfont iconpipei"></i>
              <span slot="title">原文件匹配</span>
            </el-menu-item>
            <el-menu-item index="/product">
              <i class="iconfont iconchanpinguanli"></i>
              <span slot="title">产品介绍</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-aside
          class="home_aside"
          :width="isCollapse ? '64px' : '200px'"
          v-else
        >
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
                <el-menu-item index="/sskecord">实时查询</el-menu-item>
                <el-menu-item index="/international-record">国际号码检测</el-menu-item>
                <el-menu-item index="/direct-record">定向通用检测</el-menu-item>
                <el-menu-item index="/line-direct-record">line定向检测</el-menu-item>
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
      active: 'emptynumber',
      name: '',
      phone: '',
      logoUrl: '',
      contract: {},
      siteInfo: {},
      isDropShow: false,
      dropTimer: null
    }
  },
  methods: {
    logOut() {
      this.$confirm('此操作将退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await this.$http.post('front/logout')
        if (data.code !== 200) return this.$message.error(data.msg)
        ss.remove('token')
        ss.remove('customer')
        ss.remove('personalInfo')
        this.$router.push('/login')
      })
    },
    async getLogo() {
      const { data } = await this.$http.get('front/siteInfo')
      this.logoUrl = this.downloadDomain + data.data.agentLogo
      this.siteInfo = data.data
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      this.logoishide = !this.logoishide
      this.logoisshow = !this.logoisshow
    },
    handleSelect(key) {
      // console.log(key)
      this.active = key
    },
    // 号码魔方下拉框
    handleMobileCube(name) {
      let cubeType = 1
      switch (name) {
        case 'A':
          cubeType = 1
          break
        case 'B':
          cubeType = 2
          break
      }
      this.getMobileCubePath(cubeType)
    },
    async getMobileCubePath(cubeType) {
      // if (this.siteInfo.domain === 'buzheny.com') {
      //   window.open(`${this.downloadDomain}/resource/步正号码魔方.rar`)
      // } else if (this.siteInfo.domain === 'yfeifei.com') {
      //   window.open(`${this.downloadDomain}/resource/肥肥号码魔方.rar`)
      // } else if (this.siteInfo.domain === 'shihaoy.com') {
      //   window.open(`${this.downloadDomain}/resource/实号号码魔方.rar`)
      // } else if (this.siteInfo.domain === 'zqyjc.com') {
      //   window.open(`${this.downloadDomain}/resource/朱雀云号码魔方.rar`)
      // } else if (this.siteInfo.domain === 'dameipr.com') {
      //   window.open(`${this.downloadDomain}/resource/达美号码魔方.rar`)
      // } else {
      //   window.open(`${this.downloadDomain}/resource/号码魔方.rar`)
      // }
      const { data } = await this.$http.post('front/getMobileCubePath', { cubeType: cubeType })
      if (data) {
        window.open(`${this.downloadDomain}/${data.replace(/"/g, '')}`)
      } else {
        window.open(`${this.downloadDomain}/resource/号码魔方.rar`)
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
    },
    showDrop() {
      clearTimeout(this.dropTimer)
      this.isDropShow = true
    },
    hideDrop() {
      this.dropTimer = setTimeout(() => {
        this.isDropShow = false
      }, 200)
    }
  },
  created() {
    this.getLogo()
    this.getContractInfo()
    // this.name = JSON.parse(ss.get('customer')) ? JSON.parse(ss.get('customer')).name : ''
    this.phone = JSON.parse(ss.get('customer')) ? JSON.parse(ss.get('customer')).phone : ''
  },
  watch: {
    $route: {
      handler: function (route) {
        const arr = [
          '/product',
          '/emptynumber',
          '/realtime',
          '/emptyrealapi',
          '/international',
          '/direct',
          '/matching'
        ]
        if (arr.indexOf(route.path) > -1) {
          if (route.path === '/emptyrealapi') {
            this.active = 'emptyrealapi'
          } else {
            this.active = 'emptynumber'
          }
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
      .rit-span {
        height: 60px;
        display: inline-block;
        line-height: 60px;
        padding: 0 15px;
        cursor: pointer;
        color: #fff;
      }
      .rit-span:hover {
        color: #5290fd;
        background-color: #363b4f !important;
      }
      .name {
        font-size: 12px;
        height: 60px;
        cursor: pointer;
        .p1 {
          margin: 0 5px;
        }
      }
      .drop-list {
        margin: 0;
        padding: 0;
        list-style: none;
        position: fixed;
        right: 15px;
        top: 60px;
        z-index: 2;
        width: 120px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #f2f2f2;
        color: #848a9f;
        li {
          height: 36px;
          line-height: 36px;
          cursor: pointer;
          &:hover {
            background-color: #6e9aff;
            color: #fff;
          }
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
      .gj-icon {
        margin-left: -5px;
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
    background-color: #f1f2f7 !important;
    color: #669aff !important;
    i {
      color: #669aff !important;
    }
  }
}
</style>

<style>
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-submenu__title:hover {
  background-color: #f1f2f7 !important;
  color: #669aff !important;
}
.home_aside .is-active {
  background-color: #f1f2f7 !important;
  color: #669aff !important;
  font-weight: 700;
}
.iconqq {
  color: #689cfc;
}
.button {
  box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
  transition: all 0.3s ease-in-out;
}
.el-popover {
  text-align: center;
}
.el-popover .box {
  display: flex;
  justify-content: space-between;
}
.el-popover .box .img_div img {
  width: 70px;
  height: 70px;
}
.el-popover .box p {
  margin: 10px 0;
}
</style>
