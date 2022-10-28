<template>
  <div class="recharge">
    <!-- 头部面包屑 -->
    <div class="crumb-wrap">
      <div class="crumb-back">
        <span class="el-icon-back icon" @click="$router.go(-1)"></span>
      </div>
      <div class="crumbs">
        <div class="crumb" @click="gotype">{{ type }}</div>
        <div class="crumb active">充值</div>
      </div>
    </div>

    <el-tabs type="border-card">
      <!-- <el-row>
        <el-col :span="24">
          <div class="recharge-title">
            <div class="i-title">
              <img src="../assets/img/充值.png">
              <div class="title">充值页面</div>
            </div>
          </div>
        </el-col>
      </el-row> -->
      <el-tab-pane label="自动充值">
        <el-row style="margin: 10px 15px">
          <span style="font-size: 14px; font-weight: 700">选择支付方式</span>
        </el-row>
        <el-row style="margin: 10px 15px">
          <div class="payType-wrap">
            <div
              class="payType-section"
              v-for="item in payTypeList"
              :key="item.id"
              @click="selectPayType(item)"
              :class="{ active: payTypeVal === item.id }"
            >
              <img :src="item.imgUrl" alt="" />
              <span class="choose" v-if="payTypeVal === item.id"></span>
            </div>
          </div>
        </el-row>
        <el-row style="margin: 10px 15px">
          <span
            style="font-size: 14px; font-weight: 700"
            v-if="goodlist && goodlist.length > 0"
            >选择套餐扫码充值</span
          >
        </el-row>
        <el-row :span="24">
          <el-col :span="14" :offset="1">
            <el-col :span="8" v-for="(item, i) in goodlist" :key="item.id">
              <div
                class="chongzhi"
                :class="{ active: active === i }"
                @click="activeCut(item, i)"
              >
                <h3 class="q-title" :class="{ active: active === i }">
                  {{ item.name }}
                </h3>
                <p class="qian">
                  <span class="dao">￥</span>
                  <span class="number">{{ item.price }}</span>
                  <span class="tiao">
                    / {{ item.specifications / 10000 }}万条</span
                  >
                </p>
                <p v-if="type === '实时查询'" class="di">
                  {{ item.remark }}
                  <del style="display: block"
                    >￥{{ item.specifications * 0.1 }}</del
                  >
                </p>
                <p v-if="type === '国际号码检测'" class="di">
                  {{ item.remark }}
                  <del style="display: block"
                    >￥{{ item.specifications * 0.003 }}</del
                  >
                </p>
                <p v-if="type === '定向通用检测'" class="di">
                  {{ item.remark }}
                  <del style="display: block"
                    >￥{{ item.specifications * 0.005 }}</del
                  >
                </p>
                <p v-if="type === 'line定向检测'" class="di">
                  {{ item.remark }}
                  <del style="display: block"
                    >￥{{ item.specifications * 0.02 }}</del
                  >
                </p>
                <p v-else class="di">
                  {{ item.remark }}
                  <del style="display: block"
                    >￥{{ item.specifications * 0.002 }}</del
                  >
                </p>
                <span class="choose" v-show="i === active"></span>
              </div>
            </el-col>
          </el-col>
          <el-col :span="7" :offset="2" v-show="payAmount">
            <div class="dialog">
              <p>
                应付金额：<span class="number">{{ payAmount }}</span
                >元
              </p>
              <p ref="qrCodeUrl" class="qrcode"></p>
              <p class="aliPay">
                打开<span class="zfb" v-if="payTypeVal === 1">支付宝</span
                ><span class="wx" v-if="payTypeVal === 8">微信</span
                >扫一扫即可付款
              </p>
              <p class="d-footer">
                如需其他充值方式，或充值过程中遇到任何问题，请与
                <label style="color: rgb(41, 131, 248)">客服人员联系</label>
              </p>
            </div>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24" class="z-container" v-if="zdy.id">
            <el-col :span="24" class="zdy">自定义充值</el-col>
            <el-col :span="24" :offset="1">
              <el-input
                placeholder="请输入充值金额（元）"
                clearable
                v-model="zdy.price"
              ></el-input>
              <el-button type="primary" @click="zdyRecharge" class="button"
                >确认</el-button
              >
              <span class="tip" v-if="custom">{{
                `（${custom.unitPrice}元/条，最低充值${custom.minPayAmount}元，必须为整数）`
              }}</span>
            </el-col>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="人工充值">
        <el-row>
          <el-col :span="24">
            <div class="rengong">
              <p class="title">联系方式</p>
              <el-row>
                <el-col :span="7">
                  <p>
                    <span class="l_span">联系人： </span>
                    <span class="r_span"
                      >请联系您的专属对接人 - {{ contract.kefuNickname }}</span
                    >
                  </p>
                  <p>
                    <span class="l_span">企业 QQ ：</span>
                    <span class="r_span"
                      >{{ contract.qq }}
                      <el-button
                        size="small"
                        plain
                        icon="iconfont iconqq"
                        @click="goToQQ(contract.qq)"
                        class="button"
                      >
                        QQ交谈</el-button
                      ></span
                    >
                  </p>
                  <p>
                    <span class="l_span">联系号码：</span>
                    <span class="r_span">{{ contract.hotline }}</span>
                  </p>
                </el-col>
                <el-col :span="2">
                  <p>微信二维码</p>
                  <img
                    :src="downloadDomain + contract.wechatQrcode"
                    alt="微信二维码"
                  />
                </el-col>
              </el-row>
            </div>
            <div class="rengong">
              <p class="title">打款方式</p>
              <el-row>
                <div class="radio">
                  <span class="l_span" style="margin-right: 20px"
                    >选择方式：</span
                  >
                  <span class="r_span">
                    <el-radio v-model="radio" label="1">对公银行收款</el-radio>
                    <el-radio v-model="radio" label="2">对私银行收款</el-radio>
                    <el-radio v-model="radio" label="3">微信收款</el-radio>
                    <el-radio v-model="radio" label="4">支付宝收款</el-radio>
                  </span>
                </div>
                <div v-show="radio === '1'">
                  <p>
                    <span class="l_span">收款银行：</span>
                    <span class="r_span">
                      <span>{{ paymentWay.payBankPublic }}</span>
                      <el-button
                        size="small"
                        plain
                        :data-clipboard-text="paymentWay.payBankPublic"
                        @click="copy('#dg-copy1')"
                        id="dg-copy1"
                        class="button"
                        >复制</el-button
                      >
                    </span>
                  </p>
                  <p>
                    <span class="l_span">收款人： </span>
                    <span class="r_span">
                      <span>{{ paymentWay.payeePublic }}</span>
                      <el-button
                        size="small"
                        plain
                        :data-clipboard-text="paymentWay.payeePublic"
                        @click="copy('#dg-copy2')"
                        id="dg-copy2"
                        class="button"
                        >复制</el-button
                      >
                      <el-button
                        size="small"
                        class="button"
                        plain
                        :data-clipboard-text="`${paymentWay.payBankPublic} ${paymentWay.payeePublic} ${paymentWay.payAccountPublic}`"
                        id="dg-copyAll"
                        @click="copy('#dg-copyAll')"
                      >
                        复制全部
                      </el-button>
                    </span>
                  </p>
                  <p>
                    <span class="l_span">收款账号：</span>
                    <span class="r_span">
                      <span>{{ paymentWay.payAccountPublic }}</span>
                      <el-button
                        size="small"
                        plain
                        :data-clipboard-text="paymentWay.payAccountPublic"
                        @click="copy('#dg-copy3')"
                        id="dg-copy3"
                        class="button"
                        >复制</el-button
                      >
                    </span>
                  </p>
                </div>
                <div v-show="radio === '2'">
                  <p>
                    <span class="l_span">收款银行：</span>
                    <span class="r_span">
                      <span>{{ paymentWay.payBankPrivate }}</span>
                      <el-button
                        size="small"
                        plain
                        :data-clipboard-text="paymentWay.payBankPrivate"
                        @click="copy('#ds-copy1')"
                        id="ds-copy1"
                        class="button"
                        >复制</el-button
                      >
                    </span>
                  </p>
                  <p>
                    <span class="l_span">收款人： </span>
                    <span class="r_span">
                      <span>{{ paymentWay.payeePrivate }}</span>
                      <el-button
                        size="small"
                        plain
                        :data-clipboard-text="paymentWay.payeePrivate"
                        @click="copy('#ds-copy2')"
                        id="ds-copy2"
                        class="button"
                        >复制</el-button
                      >
                      <el-button
                        size="small"
                        class="button"
                        plain
                        :data-clipboard-text="`${paymentWay.payBankPrivate} ${paymentWay.payeePrivate} ${paymentWay.payAccountPrivate}`"
                        id="ds-copyAll"
                        @click="copy('#ds-copyAll')"
                      >
                        复制全部
                      </el-button>
                    </span>
                  </p>
                  <p>
                    <span class="l_span">收款账号：</span>
                    <span class="r_span">
                      <span>{{ paymentWay.payAccountPrivate }}</span>
                      <el-button
                        size="small"
                        plain
                        :data-clipboard-text="paymentWay.payAccountPrivate"
                        @click="copy('#ds-copy3')"
                        id="ds-copy3"
                        class="button"
                        >复制</el-button
                      >
                    </span>
                  </p>
                </div>
                <div v-show="radio === '3'">
                  <p>
                    <span class="l_span">收款人： </span>
                    <span class="r_span">
                      <span>{{ paymentWay.payeeWechat }}</span>
                      <el-button
                        size="small"
                        plain
                        :data-clipboard-text="paymentWay.payeeWechat"
                        @click="copy('#wx-copy1')"
                        id="wx-copy1"
                        class="button"
                        >复制</el-button
                      >
                    </span>
                  </p>
                  <p style="margin-bottom: 30px">
                    <span class="l_span">收款账户：</span>
                    <span class="r_span">
                      <span>{{ paymentWay.payAccountWechat }}</span>
                      <el-button
                        size="small"
                        plain
                        :data-clipboard-text="paymentWay.payAccountWechat"
                        @click="copy('#wx-copy2')"
                        id="wx-copy2"
                        class="button"
                        >复制</el-button
                      >
                    </span>
                  </p>
                  <p class="ewm">
                    <span class="l_span">收款码：</span>
                    <span class="r_span">
                      <!-- <span ref="wxEwm"></span> -->
                      <img
                        :src="downloadDomain + paymentWay.payQrcodeWechat"
                        alt="微信二维码"
                      />
                    </span>
                  </p>
                </div>
                <div v-show="radio === '4'">
                  <p>
                    <span class="l_span">收款人： </span>
                    <span class="r_span">
                      <span>{{ paymentWay.payeeAlipay }}</span>
                      <el-button
                        size="small"
                        plain
                        :data-clipboard-text="paymentWay.payeeAlipay"
                        @click="copy('#zfb-copy1')"
                        id="zfb-copy1"
                        class="button"
                        >复制</el-button
                      >
                    </span>
                  </p>
                  <p style="margin-bottom: 30px">
                    <span class="l_span">收款账户：</span>
                    <span class="r_span">
                      <span>{{ paymentWay.payAccountAlipay }}</span>
                      <el-button
                        size="small"
                        plain
                        :data-clipboard-text="paymentWay.payAccountAlipay"
                        @click="copy('#zfb-copy2')"
                        id="zfb-copy2"
                        class="button"
                        >复制</el-button
                      >
                    </span>
                  </p>
                  <p class="ewm">
                    <span class="l_span">收款码：</span>
                    <span class="r_span">
                      <!-- <span ref="zfbEwm"></span> -->
                      <img
                        :src="downloadDomain + paymentWay.payQrcodeAlipay"
                        alt="支付宝二维码"
                      />
                    </span>
                  </p>
                </div>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <!-- 支付框 -->
    <!-- <el-dialog
      :visible.sync="dialogVisible"
      width="320px"
      title="支付宝扫一扫付款"
      :close-on-click-modal="false"
    >
      <div class="dialog">
        <p>应付金额：<span class="number">1000</span>元</p>
        <p><img :src="require('../assets/img/ma.jpg')" alt="二维码"></p>
        <p class="aliPay">支付宝支付</p>
        <p class="d-footer">
          如需其他充值方式，或充值过程中遇到任何问题，请与
          <label style="color: rgb(41, 131, 248);">客服人员联系</label>
        </p>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import Clipboard from 'clipboard'
import { ls } from '../utils/storage'
export default {
  data() {
    return {
      active: '', // 当前第几个套餐-默认不选中
      dialogVisible: false,
      goodlist: [], // 套餐数据
      radio: '1',
      zdy: {
        // 自定义支付
        id: '',
        price: ''
      },
      contract: {}, // 联系人信息
      paymentWay: {}, // 打款方式
      payAmount: 0,
      orderNo: '',
      type: '',
      custom: undefined,
      payTypeList: [
        { imgUrl: require('@/assets/img/recharge_zfb.png'), id: 1 },
        { imgUrl: require('@/assets/img/recharge_wx.png'), id: 8 }
      ],
      payTypeVal: 1
    }
  },
  methods: {
    async getGoodList() {
      // category(空号套餐：0,实时套餐：1 )
      // type = 0是标准套餐，1是自定义套餐
      const { data } = await this.$http.post('front/personal/goodsList')
      data.data.map((item) => {
        if (item.type === 0) {
          if (this.type === '空号检测') {
            if (item.category === 0) this.goodlist.push(item)
          } else if (this.type === '实时查询') {
            if (item.category === 1) this.goodlist.push(item)
          } else if (this.type === '国际号码检测') {
            if (item.category === 2) this.goodlist.push(item)
          } else if (this.type === '定向通用检测') {
            if (item.category === 4) this.goodlist.push(item)
          } else if (this.type === 'line定向检测') {
            if (item.category === 5) this.goodlist.push(item)
          }
        } else if (item.type === 1) {
          if (this.type === '空号检测') {
            if (item.category === 0) {
              this.zdy.id = item.id
              this.custom = item
            }
          } else if (this.type === '实时查询') {
            if (item.category === 1) {
              this.zdy.id = item.id
              this.custom = item
            }
          } else if (this.type === '国际号码检测') {
            if (item.category === 2) {
              this.zdy.id = item.id
              this.custom = item
            }
          } else if (this.type === '定向通用检测') {
            if (item.category === 4) {
              this.zdy.id = item.id
              this.custom = item
            }
          } else if (this.type === 'line定向检测') {
            if (item.category === 5) {
              this.zdy.id = item.id
              this.custom = item
            }
          }
        }
      })
      // 初始化显示第一个套餐
      // this.activeCut(this.goodlist[0], 0)
    },
    // 点击套餐
    async activeCut(obj, i) {
      this.zdy.price = ''
      this.payAmount = ''
      this.isShowOpen()
      this.active = i
      const { data } = await this.$http.get(
        `front/personal/qrCodeString/${obj.id}/${obj.price}?payType=${this.payTypeVal}`
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      this.payAmount = obj.price
      this.creatQrCode(this.$refs.qrCodeUrl, data.data.qrCodeString, 175, 175)
      this.orderNo = data.data.orderNo
      clearInterval(this.timer)
      this.getQrCodePayState(data.data.orderNo)
    },
    // 自定义充值
    async zdyRecharge() {
      this.active = ''
      this.payAmount = ''
      this.isShowOpen()
      if (!(this.zdy.id && this.zdy.price)) return
      const { data } = await this.$http.get(
        `front/personal/qrCodeString/${this.zdy.id}/${this.zdy.price}?payType=${this.payTypeVal}`
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      this.payAmount = this.zdy.price
      this.creatQrCode(this.$refs.qrCodeUrl, data.data.qrCodeString, 175, 175)
      this.orderNo = data.data.orderNo
      clearInterval(this.timer)
      this.getQrCodePayState(data.data.orderNo)
    },
    // 生成二维码
    creatQrCode(dom, url, width, height) {
      this.isShowOpen()
      // eslint-disable-next-line no-new
      new QRCode(dom, {
        text: url, // 需要转换为二维码的内容
        width: width,
        height: height,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    // 清除生成的二维码
    isShowOpen() {
      this.$refs.qrCodeUrl.innerHTML = ''
    },
    gotype() {
      switch (this.type) {
        case '空号检测':
          this.$router.push('/emptynumber')
          break
        case '实时查询':
          this.$router.push('/realtime')
          break
        case '国际号码检测':
          this.$router.push('/international')
          break
        case '定向通用检测':
          this.$router.push('/direct')
          break
        case 'line定向检测':
          this.$router.push('/direct')
          break
        default:
          break
      }
    },
    // 获取订单状态
    async getQrCodePayState(orderNo) {
      const { data } = await this.$http.get(
        `front/personal/getQrCodePayState/${orderNo}`
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      clearInterval(this.timer)
      switch (data.data) {
        case 0: // 待支付
          this.timer = setInterval(() => {
            setTimeout(() => {
              this.getQrCodePayState(this.orderNo)
            }, 0)
          }, 5000)
          break
        case 1: // 订单超时
          clearInterval(this.timer)
          this.$message.error('订单已超时，请重新选择套餐支付')
          break
        case 2 || 3: // 成功
          this.$message.success(
            `充值成功，即将跳转${
              this.type === '0'
                ? '空号检测'
                : this.type === '1'
                ? '实时查询'
                : this.type === '2'
                ? '国际号码检测'
                : this.type === '4' || this.type === '5'
                ? '国际定向检测'
                : ''
            }页面`
          )
          clearInterval(this.timer)
          setTimeout(() => {
            this.gotype()
          }, 2000)
          break
      }
    },
    // 获取联系人
    async getContractInfo() {
      const { data } = await this.$http.post('front/personal/getContractInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.contract = data.data
      // this.creatQrCode(this.$refs.xsrEwm, this.contract.wechatQrcode, 100, 100)
    },
    goToQQ(qq) {
      window.open(`https://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`)
    },
    // 打款方式
    async getPaymentWay() {
      const { data } = await this.$http.post('front/personal/getPaymentWay')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.paymentWay = data.data
      // this.creatQrCode(this.$refs.wxEwm, this.paymentWay.payQrcodeWechat, 100, 100)
      // this.creatQrCode(this.$refs.zfbEwm, this.paymentWay.payQrcodeAlipay, 100, 100)
    },
    // 点击复制
    copy(dom) {
      let clipboard = new Clipboard(dom)
      clipboard.on('success', (e) => {
        this.$message.success('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        this.$message.error('该浏览器不支持自动复制')
        clipboard.destroy()
      })
    },
    selectPayType(item) {
      this.payTypeVal = item.id
      if (this.active !== '') {
        this.activeCut(this.goodlist[this.active], this.active)
      } else if (this.zdy.price) {
        this.zdyRecharge()
      }
    }
  },
  mounted() {
    this.type = ls.get('type')
    this.getGoodList()
    this.getContractInfo()
    this.getPaymentWay()
  },
  destroyed() {
    clearInterval(this.timer)
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.crumb-wrap {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  height: 38px;
  border: 1px solid #eee;
  background-color: #fff;
  .crumb-back {
    width: 60px;
    text-align: center;
    border-right: 1px solid #efefef;
    cursor: pointer;
    .icon {
      font-size: 24px;
      color: #7f859f;
      &:hover {
        color: #689cfc;
      }
    }
  }
  .crumbs {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    .crumb {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 24px;
      width: 115px;
      background: url('../assets/img/dadayv.png') no-repeat 100%;
      cursor: pointer;
      font-weight: 700;
      &.active {
        color: #689cfc;
      }
    }
  }
}

.el-tabs {
  min-height: 80vh;
  .recharge-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .i-title {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 23px;
      height: 28px;
      line-height: 28px;
      img {
        margin-right: 10px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
      .title {
        font-size: 16px;
        color: #7f859f;
      }
    }
  }
  .payType-wrap {
    display: flex;
    flex-direction: row;
    padding-left: 3.5%;
    .payType-section {
      width: 240px;
      height: 60px;
      border-radius: 2px;
      border: 1px solid #dcdfe6;
      text-align: center;
      line-height: 55px;
      cursor: pointer;
      img {
        margin-top: 10px;
      }
      &:first-child {
        margin-right: 24px;
      }
      &.active {
        border: 1px solid #409eff;
        position: relative;
      }
      .choose {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 39px;
        height: 39px;
        background: url('../assets/img/对号.png');
      }
    }
  }
  .chongzhi {
    color: #666;
    height: 160px;
    width: 88%;
    margin: 5px 0;
    background: transparent;
    border-radius: 4px;
    border: 1px solid #e7e7e7;
    text-align: center;
    padding: 5px;
    cursor: pointer;
    position: relative;
    &.active {
      border: 1px solid #409eff;
    }
    .choose {
      // 右下角对号
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 39px;
      height: 39px;
      background: url('../assets/img/对号.png');
    }
    .q-title {
      font-size: 16px;
      color: #666;
      font-weight: 400;
      height: 25px;
      width: 72px;
      line-height: 25px;
      margin: 5px auto;
      border-bottom: 3px solid #fff;
      &.active {
        border-bottom: 3px solid #409eff;
      }
    }
    .qian {
      margin: 12px 0;
      .dao {
        color: #f3bb02;
      }
      .number {
        color: #f3bb02;
        font-size: 36px;
      }
      .tiao {
        font-size: 14px;
      }
    }
    .di {
      font-size: 10px;
      color: rgb(244, 67, 54);
      del {
        color: #666;
      }
    }
  }
  .z-container {
    .zdy {
      font-weight: 700;
      font-size: 14px;
      margin: 10px 15px;
    }
    .el-input {
      width: 500px;
    }
    .el-button {
      margin: 0 10px;
    }
    .tip {
      color: #666;
      font-size: 14px;
    }
  }

  .rengong {
    padding: 20px 0 15px 15px;
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
    p {
      font-size: 13px;
      margin-bottom: 20px;
      margin-top: 5px;
      .l_span {
        display: inline-block;
        width: 70px;
      }
      .r_span {
        color: #59607c;
        margin: 0 10px;
        span {
          display: inline-block;
          width: 240px;
        }
        .el-button {
          margin-left: 15px;
        }
        .button {
          margin-left: 75px;
        }
        img {
          margin: 5px 0 0 2px;
          vertical-align: top;
        }
      }
    }
    .ewm {
      display: flex;
      justify-content: flex-start;
    }
    .radio {
      margin: 10px 0 25px 0;
    }
    .el-col-2 {
      text-align: center;
      p {
        display: flex;
        justify-content: center;
      }
    }
    img {
      width: 100px;
    }
  }
}
.dialog {
  width: 300px;
  text-align: center;
  .number {
    color: #f34653;
    font-size: 24px;
  }
  .qrcode {
    display: inline-block;
    margin: 10px 0 5px 0;
    img {
      width: 175px;
      height: 175px;
      background-color: #fff; //设置白色背景色
      padding: 6px; // 利用padding的特性，挤出白边
      box-sizing: border-box;
    }
  }
  .aliPay {
    width: 175px;
    height: 34px;
    // background-color: #2983f8;
    border-radius: 2px;
    line-height: 34px;
    text-align: center;
    margin: 0 auto;
    color: #666;
    font-size: 12px;
    span {
      font-size: 15px;
      font-weight: bold;
    }
    .zfb {
      color: #2983f8;
    }
    .wx {
      color: #4baf4e;
    }
  }
  .d-footer {
    margin-top: 20px;
    padding-top: 10px;
    color: #999;
    text-align: center;
    border-top: 1px solid #e5e5e5;
  }
}
</style>

<style>
.recharge .el-dialog__header {
  border-bottom: 0;
  font-size: 15px;
  font-weight: 700;
  color: #666;
  text-align: center;
}
.recharge .el-dialog__body {
  padding: 0 20px;
  padding-bottom: 20px;
  color: #666;
  font-size: 14px;
  word-break: break-all;
}
</style>
