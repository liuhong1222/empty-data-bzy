<template>
  <div class="empty">
    <el-row :span="24">
      <div class="product-title">
        <div class="i-title"><img src="../assets/img/实时监测.png">
          <div class="title">号码实时检测</div>
          <div class="price">
            <span class="triangle"></span>
            <span class="text">0.07元/条</span>
          </div>
        </div>
      </div>
    </el-row>

    <el-row :span="24" class="el-box">
      <el-col :span="5">
        <el-card class="_el-card">
          <div class="container">
            <p>手机号：{{personalInfo.phone}}</p>
            <p class="company">{{personalInfo.customerType == 0 ? personalInfo.name : personalInfo.customerType == 1 ? personalInfo.companyName : ''}}</p>
            <p class="base-status" @click="$router.push('/data')" v-if="personalInfo.state == 9">
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
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="_el-card">
          <div class="onecard">
            <div class="left-block">
              <div class="count">{{personalInfo.realtimeBalance}}</div>
              <div class="des">账户总余额<span class="unit">（ 条 ）</span></div>
            </div>
            <div>
              <el-button type="danger" size="small" icon="iconfont iconchongzhi" class="button" @click="goRecharge('实时检测')"> 充值</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="_el-card">
          <div class="onecard">
            <div class="left-block">
              <div class="count">{{statisticalData.todayConsumeTotal}}</div>
              <div class="des">今日总消耗数<span class="unit">（ 条 ）</span></div>
            </div>
            <div class="right-block">
              <div :class="parseInt(statisticalData.yesterdayConsumeTotalPercentage) >= 0 ? 'rate' : 'red'">
                <i class="el-icon-top" v-if="parseInt(statisticalData.yesterdayConsumeTotalPercentage) >= 0"></i>
                <i class="el-icon-bottom" v-else></i>
                {{ statisticalData.yesterdayConsumeTotalPercentage }}
              </div>
              <div class="contrast">同比昨日</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card class="zhxx lxfs">
          <!-- <div class="title">联系方式</div> -->
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

    <!-- 号码检测 -->
    <el-row :span="24" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card class="towcard">
          <div class="title">号码检测</div>
          <div class="_flex">
            <el-form class="phone" :model="phoneInfo" :rules="rules">
              <el-form-item prop="mobile">
                <el-input placeholder="请输入单个要检测的手机号码" v-model="phoneInfo.mobile" prefix-icon="el-icon-phone" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="small" @click="searchPhone" class="button">立即查询</el-button>
              </el-form-item>
            </el-form>
            <div class="result" v-show="realtimeCheckOne.status">
              <span style="font-weight:bold;">检测结果：{{realtimeCheckOne.status == 1 ? '正常' : realtimeCheckOne.status == 2 ? '空号' : realtimeCheckOne.status == 3 ? '通话中' :
                realtimeCheckOne.status == 4 ? '不在网(空号)' : realtimeCheckOne.status == 5 ? '关机' : realtimeCheckOne.status == 6 ? '呼叫转移' :
                realtimeCheckOne.status == 7 ? '疑似关机' : realtimeCheckOne.status == 10 ? '未知' : realtimeCheckOne.status == 11 ? '正常(携号转网)' :
                realtimeCheckOne.status == 12 ? '号码错误' : realtimeCheckOne.status == 13 ? '停机' : ''}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 导入号码 -->
    <el-row :span="24" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card class="towcard">
          <div class="title">导入号码</div>
          <div class="server-box">
            <el-radio v-model="options.target" :label="`${$http.defaults.baseURL}front/chunk/chunkUpload`" @change="changeRadio"> 默认服务器</el-radio>
            <!-- <el-radio v-model="options.target" :label="`${$http.defaults.baseURL}front/customer/upload`" @change="changeRadio"> 中转服务器</el-radio> -->
          </div>
          <el-row>
            <el-popover placement="right" width="160" trigger="hover">
              <div>
                <p>txt: 至少1-150w条</p>
              </div>
              <div class="upload" slot="reference">
                <div class="upload_div">请上传文件进行检测</div>
                <uploader
                  ref="uploader"
                  class="upload-demo"
                  :options="options"
                  :fileStatusText="fileStatusText"
                  autoStart
                  @file-added="filesAdded"
                  @files-submitted="submitTed"
                  @file-success="success_txt"
                  @file-removed="beforeRemove"
                >
                  <uploader-btn ref="inner" :attrs="attrs" class="upload_button el-button el-button--primary" type="primary">浏览</uploader-btn>
                  <uploader-list></uploader-list>
                  <el-button
                    class="upload_button el-button el-button--primary uploader-btn _button"
                    type="primary"
                    v-if="!isCertification"
                    @click="filesTip"
                  >浏览
                  </el-button>
                </uploader>
              </div>
            </el-popover>
          </el-row>
          <div class="btn-box">
            <el-button size="medium" type="primary" @click="emptyCheck" :loading="text === '检测中...'" class="button">{{text}}</el-button>
            <div v-for="item in result" :key="item.id" class="result">
              <span style="width:70%;text-align:left;">{{item.文件名}}</span>
              <span :class="item.status < 0 ? 'success' : 'error'">
                {{item.status == -1 ? '检测失败：最低上传3001条' : item.status == -2 ? '检测失败：当前余额不足，请充值后重新检测' :
                item.status == -3 ? '检测失败：代理商余额不足' : item.status == -4 ? '检测失败：最大检测150万条' : item.status == 9 ? '检测成功' : ''}}
              </span>
            </div>
          </div>
          <p class="gray">注:文件格式支持txt（每行一个手机号）文件小于20MB/最多上传30个文件</p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 检测结果 -->
    <el-row :span="24" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card class="towcard">
          <div class="title">检测结果</div>
          <el-row :span="24">
            <el-col :span="4" style="width:20%">
              <div class="result-box">
                <p class="result-title">
                  正常
                  <el-popover placement="right" width="160" trigger="hover" content="正常用户">
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">{{newRealtime.正常号}}</p>
                <el-button size="medium" :disabled="!newRealtime" @click="downloadPro(newRealtime.正常号url)" class="button">下载</el-button>
              </div>
            </el-col>
            <el-col :span="4" style="width:20%">
              <div class="result-box">
                <p class="result-title">
                  正常(携号转网)
                  <el-popover placement="right" width="160" trigger="hover" content="正常(携号转网)">
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">{{newRealtime.携号转网}}</p>
                <el-button size="medium" :disabled="!newRealtime" @click="downloadPro(newRealtime.携号转网url)" class="button">下载</el-button>
              </div>
            </el-col>
            <el-col :span="4" style="width:20%">
              <div class="result-box">
                <p class="result-title">
                  空号
                  <el-popover placement="right" width="160" trigger="hover" content="空号">
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">{{newRealtime.空号}}</p>
                <el-button size="medium" :disabled="!newRealtime" @click="downloadPro(newRealtime.空号url)" class="button">下载</el-button>
              </div>
            </el-col>
            <el-col :span="4" style="width:20%">
              <div class="result-box">
                <p class="result-title">
                  通话中
                  <el-popover placement="right" width="160" trigger="hover" content="通话中">
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">{{newRealtime.通话中}}</p>
                <el-button size="medium" :disabled="!newRealtime" @click="downloadPro(newRealtime.通话中url)" class="button">下载</el-button>
              </div>
            </el-col>
            <el-col :span="4" style="width:20%">
              <div class="result-box">
                <p class="result-title">
                  不在网(空号)
                  <el-popover placement="right" width="160" trigger="hover" content="不在网(空号)">
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">{{newRealtime.不在网}}</p>
                <el-button size="medium" :disabled="!newRealtime" @click="downloadPro(newRealtime.不在网url)" class="button">下载</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4" style="width:20%">
              <div class="result-box">
                <p class="result-title">
                  关机
                  <el-popover placement="right" width="160" trigger="hover" content="关机号码">
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">{{newRealtime.关机}}</p>
                <el-button size="medium" :disabled="!newRealtime" @click="downloadPro(newRealtime.关机url)" class="button">下载</el-button>
              </div>
            </el-col>
            <el-col :span="4" style="width:20%">
              <div class="result-box">
                <p class="result-title">
                  疑似关机
                  <el-popover placement="right" width="160" trigger="hover" content="长时间关机的用户">
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">{{newRealtime.疑似关机}}</p>
                <el-button size="medium" :disabled="!newRealtime" @click="downloadPro(newRealtime.疑似关机url)" class="button">下载</el-button>
              </div>
            </el-col>
            <el-col :span="4" style="width:20%">
              <div class="result-box">
                <p class="result-title">
                  停机
                  <el-popover placement="right" width="160" trigger="hover" content="停机">
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">{{newRealtime.停机}}</p>
                <el-button size="medium" :disabled="!newRealtime" @click="downloadPro(newRealtime.停机url)" class="button">下载</el-button>
              </div>
            </el-col>
            <el-col :span="4" style="width:20%">
              <div class="result-box">
                <p class="result-title">
                  号码错误
                  <el-popover placement="right" width="160" trigger="hover" content="号码错误">
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">{{newRealtime.号码错误}}</p>
                <el-button size="medium" :disabled="!newRealtime" @click="downloadPro(newRealtime.号码错误url)" class="button">下载</el-button>
              </div>
            </el-col>
            <el-col :span="4" style="width:20%">
              <div class="result-box">
                <p class="result-title">
                  未知
                  <el-popover placement="right" width="160" trigger="hover" content="号码状态未知(不计费), 可下载重新检测">
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">{{newRealtime.未知}}</p>
                <el-button size="medium" :disabled="!newRealtime" @click="downloadPro(newRealtime.未知url)" class="button">下载</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="4" :offset="6" style="width:20%;margin-left:40%;margin-top: 35px;" class="downloadAll">
              <p class="solid"></p>
              <el-button size="medium" :disabled="!newRealtime" @click="downloadTxt({}, newRealtime.zip_url)" class="button">下载全部</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 历史检测 -->
    <el-row :span="24" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card class="towcard threecard">
          <div class="title">检测记录</div>
          <el-col class="addBtnBox">
            <el-col :span="21">
            <span>日期</span>
              <el-date-picker
                v-model="timer"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                class="picker"
              >
              </el-date-picker>
              <el-button type="primary" size="small" @click="search" class="button">查询</el-button>
            </el-col>
            <el-col :span="3" style="text-align: right;">
              <el-dropdown placement="bottom">
                <el-button type="primary" size="small" icon="iconfont iconwenjianjia piliang" style="margin:0;" class="button"> 批量操作</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="downloadTab('select')">批量下载</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteTab(selectData)">批量删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-col>
          <el-table :data="tableData" style="width: 100%;margin-bottom:12px;" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="大小">
              <template slot-scope="scope">
                <span>{{scope.row.size | formatNumber(scope.row.size)}}k</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="日期" width="160"></el-table-column>
            <el-table-column prop="totalNumber" label="总条数"></el-table-column>
            <el-table-column prop="normal" label="正常"></el-table-column>
            <el-table-column prop="numberPortability" label="正常(携号转网)"></el-table-column>
            <el-table-column prop="empty" label="空号"></el-table-column>
            <el-table-column prop="onCall" label="通话中"></el-table-column>
            <el-table-column prop="onlineButNotAvailable" label="不在网(空号)" width="100"></el-table-column>
            <el-table-column prop="shutdown" label="关机"></el-table-column>
            <el-table-column prop="suspectedShutdown" label="疑似关机"></el-table-column>
            <el-table-column prop="serviceSuspended" label="停机"></el-table-column>
            <el-table-column prop="unknown" label="号码错误"></el-table-column>
            <el-table-column prop="exceptionFailCount" label="未知"></el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="downloadTab(scope.row)">下载</el-button>
                <el-button type="text" style="color: #EB371B;" size="mini" @click="deleteTab([scope.row])">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.current"
            :page-sizes="[10, 15, 20, 25, 30]"
            :page-size="queryInfo.size"
            layout="total, prev, pager, next, sizes, jumper"
            :total="total"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="二维码" width="25%" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
  </div>
</template>

<script>
import { ls, ss } from '../utils/storage'
import QRCode from 'qrcodejs2'
import axios from 'axios'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import SparkMD5 from 'spark-md5'
const getFile = url => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'blob'
    })
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error.toString())
      })
  })
}
var checkMobile = (rule, value, cb) => {
  // 验证手机号的正则表达式
  const regMobile = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
  if (regMobile.test(value)) return cb()
  cb(new Error('请输入合法的手机号'))
}

export default {
  filters: {
    formatNumber(num) {
      let _num = Number(num) / 1000
      return _num.toFixed(2)
    }
  },
  data() {
    return {
      personalInfo: {},
      statisticalData: {}, // 使用统计数据
      contract: {}, // 联系人
      queryInfo: {
        current: 1,
        size: 10,
        customerId: '',
        createTimeFrom: '',
        createTimeEnd: ''
      },
      realtimeCheckOne: {}, // 单条检测结果
      timer: [], // 时间选择框
      options: {
        target: `${this.$http.defaults.baseURL}front/chunk/chunkUpload`,
        testChunks: false, // 是否开启服务器分片校验
        chunkSize: 2048000, // 512kb
        simultaneousUploads: 30, // 并发上传数
        maxChunkRetries: 10, // 最大自动失败重试上传次数
        headers: {
          token: ss.get('token')
        },
        query: {
          customerId: '',
          taskId: ''
        }
      },
      isUploadOk: true, // 是否还有未上传完成的文件
      attrs: {
        accept: '.txt'
      },
      fileStatusText: {
        success: '成功',
        error: '错误',
        uploading: '上传',
        paused: '暂停',
        waiting: '等待',
        cmd5: 'cmd5'
      },
      newRealtime: {
        正常号: 0,
        空号: 0,
        通话中: 0,
        在网不可用: 0,
        关机: 0,
        呼叫转移: 0,
        疑似关机: 0,
        停机: 0,
        携号转网: 0,
        查询失败: 0
      }, // 最新一条检测记录
      fileList: [], // 上传文件数组
      result: [],
      flieAlllist: [],
      emptyState: 0, // 检测按钮显示内容(0: 开始检测，1：检测中，2： 检测完成)
      tableData: [],
      phoneInfo: {
        mobile: '' // 单条检测手机号
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      },
      total: 0,
      selectData: [],
      dialogImageUrl: '',
      dialogVisible: false,
      isCertification: false,
      loading: false,
      text: ls.get('text')
    }
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get('front/personal/personalInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.personalInfo = data.data
      this.queryInfo.customerId = JSON.parse(ss.get('customer')).id
    },
    async getRealtimeStatisticalData() {
      const { data } = await this.$http.get('front/empty/getRealtimeStatisticalData')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.statisticalData = data.data
    },
    goRecharge(txt) {
      ls.set('type', txt)
      this.$router.push('/recharge')
    },
    // 获取联系人
    async getContractInfo() {
      const { data } = await this.$http.post('front/personal/getContractInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.contract = data.data
      // this.creatQrCode(this.$refs.xsrEwm, this.contract.wechatQrcode)
      // this.creatQrCode(this.$refs.kfErm, this.contract.maintainerWechatQrcode)
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
    goToQQ(qq) {
      window.open(`https://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`)
    },
    async searchPhone() {
      let obj = this.$qs.stringify(this.phoneInfo)
      const { data } = await this.$http.post('front/empty/realtimeCheckOne', obj)
      if (data.code !== 200) return this.$message.error(data.msg)
      this.realtimeCheckOne = data.data
      // console.log(this.realtimeCheckOne)
      this.getData()
      this.getRealtimeStatisticalData()
    },
    async getCertified() {
      const { data } = await this.$http.get('/front/personal/isCertified')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.isCertification = data.data
    },
    async filesTip() {
      this.$confirm('根据相关规定，您需通过资料认证后方可使用本平台产品。', '温馨提示', {
        confirmButtonText: '立即认证',
        cancelButtonText: '暂不认证',
        type: 'warning',
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false
      }).then(() => {
        this.$router.push('/attestation')
      }).catch(() => {
        this.getCertified()
      })
    },
    // 上传文件之前
    filesAdded(file) {
      this.isUploadOk = true
      ls.set('text', '开始检测')
      this.text = '开始检测'
      this.result = []
      this.fileList = []
      this.flieAlllist = []
      document.getElementsByClassName('uploader-list')[0].children[0].innerHTML = ''

      this.options.query.customerId = JSON.parse(ss.get('customer')).id
      this.options.query.taskId = file.id
      this.computeMD5(file)
    },
    submitTed(filelist) {
      this.flieAlllist = filelist
    },
    // md5计算
    computeMD5(file) {
      let fileReader = new FileReader()
      let md5 = ''
      file.pause()
      fileReader.readAsArrayBuffer(file.file)
      fileReader.onload = e => {
        if (file.size !== e.target.result.byteLength) {
          this.error('Browser reported success but could not read the file until the end.')
          return
        }
        md5 = SparkMD5.ArrayBuffer.hash(e.target.result)
        file.uniqueIdentifier = md5
        file.resume()
      }
      fileReader.onerror = function () {
        this.error('FileReader onerror was triggered, maybe the browser aborted due to high memory usage.')
      }
    },
    // 删除上传文件
    beforeRemove(file) {
      this.fileList.map((item, i) => {
        if (item === file) this.fileList.splice(i, 1)
      })
      this.flieAlllist.map((item, i) => {
        if (item === file) this.flieAlllist.splice(i, 1)
      })
      if (this.fileList.length === this.flieAlllist.length) this.isUploadOk = true
      if (this.fileList.length === 0) {
        ls.set('text', '开始检测')
        this.text = '开始检测'
      }
    },
    // 上传成功触发
    success_txt(rootFile, file, response, chunk) {
      let _response = JSON.parse(response)
      if (_response.code === 200) {
        this.fileList.push(file)
        this.fileList.length === this.flieAlllist.length ? this.isUploadOk = true : this.isUploadOk = false
      } else {
        this.$message.error(_response.msg)
        return false
      }
    },
    // 开始检测
    emptyCheck() {
      if (this.fileList.length === 0) return this.$message.error('请先选择上传的txt文件')
      if (!this.isUploadOk) return this.$message.error('请等待文件上传完毕在进行检测！')
      if (!this.loading) {
        ls.set('text', '检测中...')
        this.text = '检测中...'
      }
      this.fileList.map(async item => {
        const { data } = await this.$http.post('front/empty/realtimeCheckByFile', {
          customerId: JSON.parse(ss.get('customer')).id,
          md5: item.uniqueIdentifier,
          name: item.name
        })
        if (data.code !== 200) return this.$message.error(data.msg)
        this.result.push(data.data)
        if (this.fileList.length === this.result.length) {
          // this.$store.commit('setRealtimeResult', this.result)
          this.getLatestEmpty()
          this.getRealtimePageList()
          ls.set('text', '继续检测')
          this.text = '继续检测'
          this.loading = true
        } else {
          ls.set('text', '开始检测')
          this.text = '开始检测'
        }
      })
    },
    // 下载单个小包
    downloadPro(url) {
      let _url = `${this.$http.defaults.baseURL}${url}`
      window.open(_url)
    },
    // 获取最新一条检测结果
    async getLatestEmpty() {
      const { data } = await this.$http.get('front/empty/getLatestRealtime')
      if (data.code !== 200) return this.$message.error(data.msg)
      if (data.data == null) return
      this.newRealtime = data.data
    },
    // 获取检测记录
    async getRealtimePageList() {
      const { data } = await this.$http.post('front/empty/getRealtimePageList', this.queryInfo)
      if (data.code !== 200) return this.$message.error(data.msg)
      this.tableData = data.data.records
      this.total = parseInt(data.data.total)
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    search() {
      if (this.timer != null) {
        this.queryInfo.createTimeFrom = this.timer[0]
        this.queryInfo.createTimeEnd = this.timer[1]
      } else {
        this.queryInfo.createTimeFrom = this.queryInfo.createTimeEnd = ''
      }
      this.getRealtimePageList()
    },
    // 表格选项变化触发
    handleSelectionChange(arr) {
      this.selectData = arr
    },
    // 下载
    downloadTab(rows) {
      if (rows === 'select') {
        if (this.selectData.length === 0) return this.$message.warning('至少选择一条记录')
        const zip = new JSZip()
        const cache = {}
        const promises = []
        // 批量
        this.selectData.forEach(item => {
          var url = `${this.$http.defaults.baseURL}front/customer/realtime/${item.customerId}/${item.id}/${item.name + '.zip'}`
          // console.log(url)
          const promise = getFile(encodeURI(url)).then(data => {
            let fileName = item.name + '.zip'
            if (cache[item.name] !== undefined) {
              fileName = item.name + Date.now() + '.zip'
            }
            // 下载文件, 并存成ArrayBuffer对象
            zip.file(fileName, data, { binary: true }) // 逐个添加文件
            cache[item.name] = data
          })
          promises.push(promise)
        })
        Promise.all(promises).then(() => {
          zip.generateAsync({ type: 'blob' }).then(content => {
            // 生成二进制流
            FileSaver.saveAs(content, '批量下载.zip') // 利用file-saver保存文件  自定义文件名
          })
        })
      } else {
        // 单条
        this.downloadTxt(rows)
      }
    },
    downloadTxt({ id, name, customerId }, _url = ' ') {
      let url
      if (_url !== ' ') {
        url = `${this.$http.defaults.baseURL}${_url}`
      } else {
        url = `${this.$http.defaults.baseURL}front/customer/realtime/${customerId}/${id}/${name + '.zip'}`
      }
      // console.log(url)
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none' // 防止影响页面
      iframe.style.height = 0 // 防止影响页面
      iframe.src = encodeURI(url)
      document.body.appendChild(iframe) // 这一行必须，iframe挂在到dom树上才会发请求
      // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
      setTimeout(() => {
        iframe.remove()
      }, 5 * 60 * 1000)
    },
    // 删除
    async deleteTab(arr) {
      if (arr.length === 0) {
        this.$message.warning('至少选择一条记录')
      } else {
        const confirmResult = await this.$confirm('此操作将删除选中记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
        arr.map(async item => {
          const { data } = await this.$http.post(`front/empty/realtime/delete/${item.id}`)
          if (data.code !== 200) return this.$message.error('删除失败')
          this.getRealtimePageList()
          this.getLatestEmpty()
        })
        this.$message.success('删除成功')
      }
    },
    handleSizeChange(newSize) {
      this.queryInfo.size = newSize
      this.getRealtimePageList()
    },
    handleCurrentChange(newCurrent) {
      this.queryInfo.current = newCurrent
      this.getRealtimePageList()
    },
    changeRadio() {
      this.isUploadOk = true
      ls.set('text', '开始检测')
      this.text = '开始检测'
      this.result = []
      this.fileList = []
      this.flieAlllist = []
      document.getElementsByClassName('uploader-list')[0].children[0].innerHTML = ''
    },
    // 查看大图片
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    }
  },
  mounted() {
    this.getData()
    this.getRealtimeStatisticalData()
    this.getContractInfo()
    this.getLatestEmpty()
    this.getRealtimePageList()
    ls.set('text', '开始检测')
    this.getCertified()
    // this.result = this.$store.state.realtimeResult
  }
}
</script>

<style scoped lang="scss">
.product-title {
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
    img {
      margin-right: 10px;
      width: 28px;
      height: 28px;
      border-radius: 50%
    }
    .title {
      font-size: 16px;
      color: #7f859f
    }
    .price {
      margin-left: 12px;
      height: 26px;
      width: 93px;
      .triangle {
        float: left;
        width: 0;
        height: 0;
        box-sizing: border-box;
        border-top: 13px solid transparent;
        border-bottom: 13px solid transparent;
        border-right: 11px solid #1db174;
        opacity: .1
      }
      .text {
        float: left;
        width: 82px;
        height: 26px;
        color: #1db174;
        text-align: center;
        line-height: 26px;
        background-color: rgba(29, 177, 116, .1)
      }
    }
  }
}
.el-box {
  display: flex;
  justify-content: space-around;
  ._el-card {
    width: 95%;
    height: 164px;
    .onecard {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-block {
        margin: 15px 0;
        font-size: 12px;
        color: #595e7b;
        .count {
          margin: 0;
          font-size: 24px;
          color: #595e7b;
          margin-bottom: 10px;
        }
        .des {
          color: #878998;
          .unit {
            color: #649eff;
          }
        }
      }
      .right-block {
        .rate {
          color: #47d0d8;
        }
        .red {
          color: #F56C6C;
        }
        .contrast {
          color: #b6b7c9;
          margin-top: 10px;
        }
      }
    }
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 15px 7px;
      .company {
        font-size: 14px;
        max-width: 150px;
        margin: 15px 0;
        color: #59607c;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
      .base-status {
        cursor: pointer;
        position: relative;
        color: #28b88c;
        height: 20px;
        line-height: 20px;
        display: flex;
        align-items: center;
        font-weight: 700;
      }
      .red {
        margin-top: 10px;
        color: #F56C6C;
        span {
          margin-right: 20px;
        }
      }
      .warning {
        margin-top: 10px;
        color: #E6A23C;
        span {
          margin-right: 20px;
        }
      }
    }
  }
}

.zhxx {
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
  ._box {
    // width: 200px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .name {
      margin: 5% 0;
      font-size: 14px;
      color: #59607c;
    }
    .number {
      margin: 11.5% 0;
      color: #59607c;
    }
    .img_div {
      margin: 0 10.5%;
      p {
        margin-bottom: 10px;
      }
      img {
        width: 65px;
        height: 65px;
      }
    }
  }
}

.lxfs {
  padding-bottom: 4.1%;
}

.towcard {
  .title {
    margin-bottom: 15px;
    padding-left: 13px;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    border-left: 4px solid #01bfcb;
    color: #878a9d;
    font-weight: 700;
  }
  .server-box {
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    .el-radio {
      font-weight: 700;
    }
  }
  .upload {
    display: flex;
    padding: 1px;
    width: 650px;
    position: relative;
    .upload_div {
      height: 50px;
      line-height: 50px;
      padding-left: 15px;
      color: #848a9f;
      width: 500px;
      border: 1px solid #e4e8eb;
    }
    .upload_button {
      width: 150px;
      height: 52px;
      line-height: 45px;
      border: 0;
      border-radius: 0;
      color: #fff;
      background-color: #6799ee;
      &:hover {
        background-color: #85adf1;
      }
    }
  }
  .gray {
    color: #b5b8c9;
    margin-bottom: 0;
    margin-top: 15px;
  }
  .btn-box {
    width: 570px;
    margin-top: 12px;
    text-align: center;
    .result {
      width: 680px;
      display: flex;
      // justify-content: space-between;
      padding: 5px 20px;
      box-sizing: border-box;
      // background-color: #ccc;
      margin: 5px 0;
      .success {
        color: #F56C6C;
      }
      .error {
        color: #67C23A;
      }
    }
  }

  .result-box {
    width: 100%;
    height: 130px;
    // margin-bottom: 20px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
    cursor: pointer;
    .result-title {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      height: 12px;
      line-height: 12px;
      font-size: 13px;
      color: #393c41;
      .icon {
        margin-left: 4px;
      }
    }
    .result-size {
      margin-bottom: 12px;
      height: 24px;
      line-height: 24px;
      font-weight: 700;
      font-size: 24px;
      color: #838a9d;
    }
    .result-mb {
      margin-bottom: 20px;
      height: 12px;
      line-height: 12px;
      font-size: 12px;
      color: #c0c2d1;
    }
  }

  .downloadAll {
    text-align: center;
    position: relative;
    margin-top: 15px;
    .solid {
      height: 35px;
      width: 1px;
      position: absolute;
      top: -35px;
      left: 49.6%;
      border-right: 1px solid #e7e7e7;
    }
  }
}
._flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  .phone {
    height: 36px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    .el-input {
      width: 360px;
      .el-input__inner {
        height: 36px;
      }
    }
    .el-button {
      height: 38px;
      margin-left: 20px;
      padding: 0 22px;
    }
  }
  .result {
    height: 70px;
    line-height: 50px;
    margin-left: 50px;
    font-size: 14px;
    color: #393c41;
  }
}

.threecard {
  .addBtnBox {
    float: right;
    margin-bottom: 12px;
    margin-top: 8px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-button {
      margin: 0 15px;
      height: 32px;
      line-height: 0px;
    }
    .picker {
      margin: 0 15px;
      width: 300px;
      height: 34px;
      line-height: 32px;
    }
  }
}
</style>

<style>
.el-date-editor .el-range__icon,
.el-date-editor .el-range-separator {
  /* 可以通过设置行高改变图标在竖直方向上位置 */
  line-height: 28px;
}
.empty .el-upload-list__item {
  width: 500%;
  margin-left: -754px;
}
.empty .uploader-file {
  height: 30px;
  line-height: 30px;
  margin-top: 4px;
  width: 433%;
  margin-left: -500px;
}
.empty .uploader-file-icon {
  margin-top: 4px;
}
.empty .uploader-file-actions > span {
  margin-top: 6px;
}
.uploader-file-remove {
  display: block !important;
}
</style>
