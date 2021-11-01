<template>
  <div class="container">
    <el-row>
      <el-col :span="14">
        <el-card class="personalInfo">
          <div class="title">账户信息</div>
          <div class="cmp-wrap">
            <div class="info-wrap">
              <el-col :span="10">
                <div class="avatar-wrap">
                  <div class="avatar-avatarinfo">
                    <div class="avatar">
                      <img src="../assets/img/avatar.png" alt>
                    </div>
                    <div class="base-info">
                      <p class="hi">Hi</p>
                      <p class="company">{{personalInfo.customerType === 0 ? personalInfo.name : personalInfo.customerType === 1 ? personalInfo.companyName : ''}}</p>
                      <p class="adm">{{personalInfo.phone}}</p>
                    </div>
                  </div>
                  <div class="base-status">
                    <p @click="$router.push('/data')" v-if="personalInfo.state == 9">
                      <i class="iconfont iconrenzheng"></i>
                      <span class="span">已认证</span>
                      <el-button size="small" plain icon="el-icon-s-check" @click="$router.push('/data')">重新认证</el-button>
                    </p>
                    <p v-if="personalInfo.state == 0" class="base-status red">
                      <i class="iconfont iconweirenzheng"></i>
                      <span>未认证</span>
                      <el-button size="small" plain icon="el-icon-s-check" @click="$router.push('/data')">立即认证</el-button>
                    </p>
                  </div>
                </div>
              </el-col>
              <el-col :span="14" >
                <el-col :span="7">
                  <div class="box">
                    <p class="khjc">空号检测</p>
                    <p class="dqye">
                      当前余额<span style="color:#649eff;">（ 条 ）</span>
                    </p>
                    <p class="yvan">{{personalInfo.remainNumberTotal}}</p>
                    <el-button type="danger" size="small" icon="iconfont iconchongzhi" class="button" @click="goRecharge('空号检测')"> 充值</el-button>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="box">
                    <p class="khjc">实时检测</p>
                    <p class="dqye">
                      当前余额<span style="color:#649eff;">（ 条 ）</span>
                    </p>
                    <p class="yvan">{{personalInfo.realtimeBalance}}</p>
                    <el-button type="danger" size="small" icon="iconfont iconchongzhi" class="button" @click="goRecharge('实时检测')"> 充值</el-button>
                  </div>
                </el-col>
              </el-col>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col style="margin-left: 1.3%; width: 40.3%;">
        <el-card class="personalInfo lxfs">
          <div class="title">联系方式</div>
          <el-col :span="24">
            <el-col :span="12" style="border-right: 1px solid #efefef;">
              <div class="_box">
                <div>
                  <!-- 客服数据 -->
                  <p style="color: #84899f;">销售人</p>
                  <p class="name">{{contract.kefuNickname}}</p>
                  <p class="number">手机号: {{contract.hotline}}</p>
                  <el-button size="small" plain icon="iconfont iconqq" class="button" @click="goToQQ(contract.qq)"> QQ交谈</el-button>
                </div>
                <div class="img_div">
                  <p>微信二维码</p>
                  <p style=" cursor: zoom-in;" @click="handlePictureCardPreview(contract.wechatQrcode)">点击放大</p>
                  <img style=" cursor: zoom-in;" :src="contract.wechatQrcode" @click="handlePictureCardPreview(contract.wechatQrcode)" alt="微信二维码">
                  <!-- <p ref="xsrEwm"></p> -->
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="_box">
                <div style="margin-left: 10.5%;">
                  <!-- 运维人数据 -->
                  <p style="color: #84899f;">客服</p>
                  <p class="name">{{contract.maintainerNickname}}</p>
                  <p class="number">手机号: {{contract.maintainerPhone}}</p>
                  <el-button size="small" plain icon="iconfont iconqq" class="button" @click="goToQQ(contract.maintainerQq)"> QQ交谈</el-button>
                </div>
                <div class="img_div" style="margin-right:0;">
                  <p>微信二维码</p>
                  <p style=" cursor: zoom-in;" @click="handlePictureCardPreview(contract.maintainerWechatQrcode)">点击放大</p>
                  <img style=" cursor: zoom-in;" :src="contract.maintainerWechatQrcode" @click="handlePictureCardPreview(contract.maintainerWechatQrcode)" alt="微信二维码">
                  <!-- <p ref="kfErm"></p> -->
                </div>
              </div>
            </el-col>
          </el-col>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-card class="four_card personalInfo">
        <div class="title">已激活产品</div>
        <el-col :span="12">
          <div class="product">
            <div class="left-block" @click="$router.push('/emptynumber')">
              <img src="../assets/img/空号检测.png" alt="空号检测">
              <div class="left-block-p">
                <div class="p-title">空号检测</div>
                <div class="des">根据客户提供的手机号，分类筛选出其中的空号、实号、风险号和沉默号。多用于一般营销。（仅支持批量检测）</div>
              </div>
            </div>
            <div class="right-block">
              <div class="right-block-p">
                <span class="money">
                0.001元/条~0.002 元/条
<!--                <span class="product-listunit">元/条</span>-->
                </span>
              </div>
              <div class="btn-wrap button">
                <el-button icon="el-icon-right" size="small" plain @click="$router.push('/emptynumber')">立即检测</el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="product" style="margin-right:0">
            <div class="left-block">
              <img src="../assets/img/实时显示.png" alt="号码实时查询">
              <div class="left-block-p" @click="$router.push('/realtime')">
                <div class="p-title">号码实时检测</div>
                <div class="des">实时检测手机号码状态，包括空号、正常、忙、关机、停机，是否有语音功能、短信功能，用于检测上网卡、非正常卡。（可单条查询）</div>
              </div>
            </div>
            <div class="right-block">
              <div class="right-block-p">
                <span class="money">
                0.05元/条~0.07元/条
<!--                <span class="product-listunit">元/条</span>-->
                </span>
              </div>
              <div class="btn-wrap button">
                <el-button icon="el-icon-right" size="small" plain @click="$router.push('/realtime')">立即检测</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-card>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-card class="three_card personalInfo">
        <div class="title">使用统计</div>
        <el-col :span="24" style="margin:15px 0;">
          <el-col :span="6">
            <div class="box page-wrap-box">
              <div class="left-block">
                <div class="des d">本月活跃号码总条数<span class="unit">（ 条 ）</span></div>
                <span class="count t">{{statisticalData.monthActiveTotal}}</span>
              </div>
              <div class="right-block">
                <div class="contrast d">同比昨日</div>
                <div :class="parseInt(statisticalData.lastMonthActiveTotalPercentage) >= 0 ? 'rate' : 'red'">
                  <i class="el-icon-top" v-if="parseInt(statisticalData.lastMonthActiveTotalPercentage) >= 0"></i>
                  <i class="el-icon-bottom" v-else></i>
                  {{ statisticalData.lastMonthActiveTotalPercentage }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="box page-wrap-box">
              <div class="left-block">
                <div class="des d">本月消费总条数<span class="unit">（ 条 ）</span></div>
                <span class="count t">{{statisticalData.monthConsumeTotal}}</span>
              </div>
              <div class="right-block">
                <div class="contrast d">同比昨日</div>
                <div :class="parseInt(statisticalData.lastMonthConsumeTotalPercentage) >= 0 ? 'rate' : 'red'">
                  <i class="el-icon-top" v-if="parseInt(statisticalData.lastMonthConsumeTotalPercentage) >= 0"></i>
                  <i class="el-icon-bottom" v-else></i>
                  {{ statisticalData.lastMonthConsumeTotalPercentage }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="box page-wrap-box">
              <div class="left-block">
                <div class="des d">今日活跃号码总条数<span class="unit">（ 条 ）</span></div>
                <span class="count t">{{statisticalData.todayActiveTotal}}</span>
              </div>
              <div class="right-block">
                <div class="contrast d">同比昨日</div>
                <div :class="parseInt(statisticalData.yesterdayActiveTotalPercentage) >= 0 ? 'rate' : 'red'">
                  <i class="el-icon-top" v-if="parseInt(statisticalData.yesterdayActiveTotalPercentage) >= 0"></i>
                  <i class="el-icon-bottom" v-else></i>
                  {{ statisticalData.yesterdayActiveTotalPercentage }}
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="box page-wrap-box">
              <div class="left-block">
                <div class="des d">今日消费总条数<span class="unit">（ 条 ）</span></div>
                <span class="count t">{{statisticalData.todayConsumeTotal}}</span>
              </div>
              <div class="right-block">
                <div class="contrast d">同比昨日</div>
                <div :class="parseInt(statisticalData.yesterdayConsumeTotalPercentage) >= 0 ? 'rate' : 'red'">
                  <i class="el-icon-top" v-if="parseInt(statisticalData.yesterdayConsumeTotalPercentage) >= 0"></i>
                  <i class="el-icon-bottom" v-else></i>
                  {{ statisticalData.yesterdayConsumeTotalPercentage }}
                </div>
              </div>
            </div>
          </el-col>
        </el-col>
      </el-card>
    </el-row>

    <el-dialog title="二维码" width="25%" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
  </div>
</template>

<script>
import { ls, ss } from '../utils/storage'
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      personalInfo: {}, // 账户信息数据
      statisticalData: {}, // 使用统计数据
      contract: {}, // 联系人
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get('front/personal/personalInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.personalInfo = data.data
      ss.set('personalInfo', JSON.stringify(data.data))
    },
    // 统计信息
    async getStatisticalData() {
      const { data } = await this.$http.get('front/empty/getStatisticalData')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.statisticalData = data.data
    },
    // 获取联系人
    async getContractInfo() {
      const { data } = await this.$http.post('front/personal/getContractInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.contract = data.data
      // this.creatQrCode(this.$refs.xsrEwm, this.contract.wechatQrcode)
      // this.creatQrCode(this.$refs.kfErm, this.contract.maintainerWechatQrcode)
    },
    goToQQ(qq) {
      window.open(`https://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`)
    },
    // 生成二维码
    creatQrCode(dom, url) {
      // eslint-disable-next-line no-new
      new QRCode(dom, {
        text: url, // 需要转换为二维码的内容
        width: 70,
        height: 70,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    goRecharge(txt) {
      ls.set('type', txt)
      this.$router.push('/recharge')
    },
    // 查看大图片
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    }
    // ...mapMutations(['setZhxx'])
  },
  mounted() {
    this.getData()
    this.getStatisticalData()
    this.getContractInfo()
  }
}
</script>

<style scoped lang="scss">
.personalInfo {
  .title {
    margin-bottom: 20px;
    padding-left: 13px;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    border-left: 4px solid #01bfcb;
    color: #878a9d;
    font-weight: 700;
  }
  .cmp-wrap {
    // padding: 0 18px;
    .info-wrap {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: nowrap;
      .el-col-10 {
        border-right: 1px solid #efefef;
        .avatar-wrap {
          display: flex;
          flex-direction: column;
          width: 264px;
          .avatar-avatarinfo {
            flex-direction: row;
            display: flex;
            padding-bottom: 14px;
            margin: 12px 0;
            .avatar {
              margin-right: 5%;
              width: 82px;
              height: 82px;
              border: 1px solid #efefef;
              border-radius: 50%;
              img {
                width: 82px;
                height: 82px;
              }
            }
            .base-info {
              display: flex;
              flex-direction: column;
              justify-content: center;
              .hi {
                margin: 0;
              }
              .company {
                font-size: 14px;
                max-width: 150px;
                margin: 8px 0;
                color: #59607c;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
              }
              .adm {
                margin: 3px 0;
              }
            }
          }
          .base-status {
            cursor: pointer;
            position: relative;
            color: #28b88c;
            height: 20px;
            line-height: 20px;
            font-weight: 700;
            display: flex;
            align-items: center;
            span {
              margin: 0 5px;
            }
          }
          .red {
            color: #F56C6C;
            font-weight: 700;
            span {
              margin-right: 35px;
            }
          }
          .warning {
            color: #E6A23C;
            font-weight: 700;
            span {
              margin-right: 35px;
            }
          }
        }
      }
      .el-col-14 {
        padding: 0px;
        .el-col-7 {
          margin: 0 7.5%;
          .box {
            width: 200px;
            margin: 0 auto;
            text-align: center;
            .khjc {
              font-size: 16px;
              margin-top: 0px;
            }
            .dqye {
              margin: 20px 0;
            }
            .yvan {
              font-size: 24px;
              font-weight: 400;
              width: 105px;
              margin: 18px auto;
            }
          }
        }
      }
    }
  }
  ._box {
    // width: 200px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .name {
      margin: 19.5% 0;
      font-size: 14px;
      color: #59607c;
    }
    .number {
      margin: 20px 0;
      color: #59607c;
    }
    .img_div {
      margin: 0 10%;
      p {
        margin-bottom: 10px;
      }
      img {
        width: 70px;
        height: 70px;
      }
    }
  }
}
.lxfs {
  padding-bottom: 4.1%;
}

.three_card {
  .box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    min-width: 178px;
    .left-block {
      .d {
        display: flex;
        align-items: flex-end;
      }
      .count {
        margin: 15px 0;
        font-size: 30px;
        color: #595e7b;
        text-align: center;
        display: inherit;
      }
      .des {
        color: #878998;
        .unit {
          color: #649eff
        }
      }
    }
    .right-block {
      display: flex;
      flex-direction: row;
      background-color: #f8f8f9;
      border-radius: 2px;
      padding: 0 14px;
      height: 30px;
      line-height: 30px;
      margin-top: 3px;
      .contrast {
        color: #b6b7c9;
        padding-right: 4px;
      }
      .rate {
        color: #47d0d8;
      }
      .red {
        color: #F56C6C;
      }
    }
    .t {
      line-height: 1;
      display: flex;
      align-items: center
    }
  }
  .page-wrap-box {
    margin-bottom: 16px;
    background-color: #fff;
  }
}

.four_card {
  .product {
    padding: 16px 20px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 28px;
    // width: 81.5%;
    margin-right: 16px;
    &:hover {
      border-color: #6799ee;
      .p-title {
        font-weight: 700;
        color: #6799ee !important;
      }
    }
    .left-block {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding-bottom: 16px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
        max-width: 62px;
        max-height: 62px;
        margin-right: 15px;
      }
      .left-block-p {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        cursor: pointer;
        .p-title {
          height: 25px;
          line-height: 25px;
          font-size: 16px;
          color: #59607c;
        }
      }
    }
    .right-block {
      padding-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .right-block-p {
        height: 32px;
        line-height: 32px;
        .money {
          // color: #84899f;
          color: #ff5054;
        }
        .times {
          padding-left: 20px;
          color: #84899f;
        }
      }
      .btn-wrap {
        margin-bottom: 2px;
      }
    }
  }
}
</style>
