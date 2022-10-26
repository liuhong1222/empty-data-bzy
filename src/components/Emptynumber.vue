<template>
  <div class="empty">
    <el-row :span="24">
      <div class="product-title">
        <div class="i-title">
          <img src="../assets/img/emptynum.png" />
          <div class="title">空号在线检测</div>
          <!-- <div class="price">
            <span class="triangle"></span>
            <span class="text">0.002元/次</span>
          </div> -->
        </div>
      </div>
    </el-row>

    <el-row :span="24" class="el-box">
      <!-- <el-col :span="5">
        <el-card class="_el-card">
          <div class="container">
            <p>手机号：{{personalInfo.phone}}</p>
            <p class="company">{{personalInfo.customerType == 0 ? personalInfo.name : personalInfo.customerType == 1 ? personalInfo.companyName : ''}}</p>
            <p class="base-status" v-if="personalInfo.state == 9" @click="$router.push('/data')">
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
      </el-col> -->
      <el-col :span="8">
        <el-card class="_el-card">
          <div class="onecard">
            <div class="left-block">
              <div class="count">{{ personalInfo.remainNumberTotal }}</div>
              <div class="des">
                账户总余额<span class="unit">（ 条 ）</span>
              </div>
            </div>
            <div>
              <el-button
                type="danger"
                size="small"
                icon="iconfont iconchongzhi"
                class="button recharge-btn"
                @click="goRecharge('空号检测')"
              >
                充值</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="5">
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
      </el-col> -->
      <el-col :span="16">
        <el-card class="personalInfo lxfs">
          <!-- <div class="title">联系方式</div> -->
          <el-col :span="24">
            <el-col :span="12" style="border-right: 1px solid #efefef">
              <div class="_box">
                <div>
                  <!-- 客服数据 -->
                  <p style="color: #59607c">
                    销售人：
                    <span style="font-size: 16px">{{
                      contract.kefuNickname
                    }}</span>
                  </p>
                  <p class="number">手机号: {{ contract.hotline }}</p>
                  <el-button
                    size="small"
                    plain
                    icon="iconfont iconqq"
                    class="button qq-btn"
                    @click="goToQQ(contract.qq)"
                  >
                    QQ交谈</el-button
                  >
                </div>
                <div class="img_div">
                  <img
                    :src="downloadDomain + contract.wechatQrcode"
                    @click="handlePictureCardPreview(contract.wechatQrcode)"
                    alt="微信二维码"
                  />
                  <!-- <p
                    style="cursor: zoom-in"
                    @click="handlePictureCardPreview(contract.wechatQrcode)"
                  >
                    微信二维码(点击放大)
                  </p> -->
                  <!-- <p ref="xsrEwm"></p> -->
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="_box">
                <div style="margin-left: 10.5%">
                  <!-- 运维人数据 -->
                  <p style="color: #59607c">
                    客服：
                    <span style="font-size: 16px">{{
                      contract.maintainerNickname
                    }}</span>
                  </p>
                  <p class="number">手机号: {{ contract.maintainerPhone }}</p>
                  <el-button
                    size="small"
                    plain
                    icon="iconfont iconqq"
                    class="button qq-btn"
                    @click="goToQQ(contract.maintainerQq)"
                  >
                    QQ交谈</el-button
                  >
                </div>
                <div class="img_div" style="margin-right: 0">
                  <img
                    :src="downloadDomain + contract.maintainerWechatQrcode"
                    @click="
                      handlePictureCardPreview(contract.maintainerWechatQrcode)
                    "
                    alt="微信二维码"
                  />
                  <!-- <p
                    style="cursor: zoom-in"
                    @click="
                      handlePictureCardPreview(contract.maintainerWechatQrcode)
                    "
                  >
                    微信二维码(点击放大)
                  </p> -->
                  <!-- <p ref="kfErm"></p> -->
                </div>
              </div>
            </el-col>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <!-- 导入号码 -->
    <el-row :span="24" style="margin-top: 20px">
      <el-col :span="24">
        <el-card class="towcard">
          <div class="title">导入号码</div>
          <!-- <div class="server-box"> -->
          <!-- <p>请选择目标服务器</p> -->
          <!-- <el-radio
              v-model="options.target"
              :label="`${$http.defaults.baseURL}front/chunk/chunkUpload`"
              @change="changeRadio"
            >
              默认服务器</el-radio
            > -->
          <!-- <el-radio v-model="options.target" :label="`${$http.defaults.baseURL}front/customer/upload`" @change="changeRadio"> 中转服务器</el-radio> -->
          <!-- </div> -->
          <!-- <el-row> -->
          <empty-test
            :personal-info="personalInfo"
            :is-certified="isCertified"
            @testSuccess="testSuccess"
          />
          <!-- </el-row> -->
          <!-- <div class="btn-box">
            <el-button size="medium" type="primary" class="button" @click="emptyCheck" :icon="emptyState == 1 ? 'el-icon-loading' : ''" :disabled="emptyState != 0">{{emptyState == 0 ? '开始检测' : emptyState == 1 ? '检测中...' : '检测完成'}}</el-button>
            <p class="runing" v-if="runningList.length>0">
              <span>当前有检测任务正在执行.....</span>
              <el-button type="text" @click="getRunningList('show')">查看</el-button>
            </p>
            <div v-for="item in result" :key="item.id" class="result">
              <span style="width:70%;text-align:left;">{{item.name}}.txt</span>
              <span :class="item.status < 0 ? 'error' : 'success'">{{item.emptyResult}}</span>
            </div>
          </div> -->
          <p class="gray">
            注:文件格式支持txt（每行一个手机号）、xls（手机号须在第一张工作表的第一列）/支持最低3001—300W条号码(40M)上传/最多上传30个文件/检测记录仅保存一年
          </p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 检测结果 -->
    <el-row :span="24" style="margin-top: 20px">
      <el-col :span="24">
        <el-card class="towcard">
          <div class="title">检测结果</div>
          <el-row :span="24">
            <el-col :span="6">
              <div class="result-box">
                <p class="result-title">
                  实号包
                  <el-popover
                    placement="right"
                    width="160"
                    trigger="hover"
                    content="活跃用户"
                  >
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">
                  {{ latestEmpty.realCount || latestEmpty.realNumber || 0 }}
                </p>
                <!-- <p class="result-mb">大小: 0</p> -->
                <el-button
                  size="medium"
                  :disabled="!latestEmpty.realUrl && !latestEmpty.realFilePath"
                  @click="
                    downloadPro(latestEmpty.realUrl || latestEmpty.realFilePath)
                  "
                  >下载</el-button
                >
              </div>
            </el-col>
            <el-col :span="6">
              <div class="result-box">
                <p class="result-title">
                  沉默包
                  <el-popover
                    placement="right"
                    width="160"
                    trigger="hover"
                    content="超过六个月未激活的空号，近三个月平均流量低于30M的用建议当成无效处理。"
                  >
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">
                  {{ latestEmpty.silentCount || latestEmpty.silentNumber || 0 }}
                </p>
                <!-- <p class="result-mb">大小: 0</p> -->
                <el-button
                  size="medium"
                  :disabled="
                    !latestEmpty.silentUrl && !latestEmpty.silentFilePath
                  "
                  @click="
                    downloadPro(
                      latestEmpty.silentUrl || latestEmpty.silentFilePath
                    )
                  "
                  >下载</el-button
                >
              </div>
            </el-col>
            <el-col :span="6">
              <div class="result-box">
                <p class="result-title">
                  空号包
                  <el-popover
                    placement="right"
                    width="160"
                    trigger="hover"
                    content="近一个月内出现过空号、停机状态的号码"
                  >
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">
                  {{ latestEmpty.emptyCount || latestEmpty.emptyNumber || 0 }}
                </p>
                <!-- <p class="result-mb">大小: 0</p> -->
                <el-button
                  size="medium"
                  :disabled="
                    !latestEmpty.emptyUrl && !latestEmpty.emptyFilePath
                  "
                  @click="
                    downloadPro(
                      latestEmpty.emptyUrl || latestEmpty.emptyFilePath
                    )
                  "
                  >下载</el-button
                >
              </div>
            </el-col>
            <el-col :span="6">
              <div class="result-box" style="border-right: 0">
                <p class="result-title">
                  风险包
                  <el-popover
                    placement="right"
                    width="160"
                    trigger="hover"
                    content="长时间关机或未开通语音服务以及易投诉的用户"
                  >
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">
                  {{ latestEmpty.riskCount || latestEmpty.riskNumber || 0 }}
                </p>
                <!-- <p class="result-mb">大小: 0</p> -->
                <el-button
                  size="medium"
                  :disabled="!latestEmpty.riskUrl && !latestEmpty.riskFilePath"
                  @click="
                    downloadPro(latestEmpty.riskUrl || latestEmpty.riskFilePath)
                  "
                  >下载</el-button
                >
              </div>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="6" :offset="9" class="downloadAll">
              <p class="solid"></p>
              <el-button
                size="medium"
                :disabled="!isDownloadAll"
                @click="downloadTab(latestEmpty)"
                >下载全部</el-button
              >
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 历史检测 -->
    <el-row :span="24" style="margin-top: 20px">
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
                :clearable="false"
              >
              </el-date-picker>
              <el-button type="primary" size="small" @click="search"
                >查询</el-button
              >
            </el-col>
            <el-col :span="3" style="text-align: right">
              <el-dropdown placement="bottom">
                <el-button
                  type="primary"
                  size="small"
                  icon="iconfont iconwenjianjia piliang"
                  style="margin: 0"
                  >批量操作</el-button
                >
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="downloadTab('select')"
                    >批量下载</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="deleteTab(selectData)"
                    >批量删除</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-col>
          <el-table
            :data="tableData"
            style="width: 100%; margin-bottom: 12px"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="name" label="名称" width="160">
              <template slot-scope="scope">
                <span>{{
                  scope.row.isOldData ? scope.row.name : scope.row.zipName
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="size" label="大小" width="100px">
              <template slot-scope="scope">
                {{
                  scope.row.isOldData
                    ? computeFileSize(scope.row.size)
                    : computeFileSize(scope.row.zipSize)
                }}
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="日期"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="totalNumber"
              label="总条数"
            ></el-table-column>
            <el-table-column prop="realNumber" label="正常">
              <template slot-scope="scope">
                <a
                  :style="{
                    'pointer-events':
                      !scope.row.realNumber || scope.row.realNumber == '0'
                        ? 'none'
                        : 'auto'
                  }"
                  style="cursor: pointer; color: #6799ee"
                  @click="
                    downloadTxt(scope.row, '活跃号(实号).txt', 'realFilePath')
                  "
                  >{{ scope.row.realNumber || 0 }}</a
                >
              </template>
            </el-table-column>
            <el-table-column prop="silentNumber" label="沉默号">
              <template slot-scope="scope">
                <a
                  :style="{
                    'pointer-events':
                      !scope.row.silentNumber || scope.row.silentNumber == '0'
                        ? 'none'
                        : 'auto'
                  }"
                  style="cursor: pointer; color: #6799ee"
                  @click="
                    downloadTxt(scope.row, '沉默号.txt', 'silentFilePath')
                  "
                  >{{ scope.row.silentNumber || 0 }}</a
                >
              </template>
            </el-table-column>
            <el-table-column prop="emptyNumber" label="空号">
              <template slot-scope="scope">
                <a
                  :style="{
                    'pointer-events':
                      !scope.row.emptyNumber || scope.row.emptyNumber == '0'
                        ? 'none'
                        : 'auto'
                  }"
                  style="cursor: pointer; color: #6799ee"
                  @click="downloadTxt(scope.row, '空号.txt', 'emptyFilePath')"
                  >{{ scope.row.emptyNumber || 0 }}</a
                >
              </template>
            </el-table-column>
            <el-table-column prop="riskNumber" label="风险号">
              <template slot-scope="scope">
                <a
                  :style="{
                    'pointer-events':
                      !scope.row.riskNumber || scope.row.riskNumber == '0'
                        ? 'none'
                        : 'auto'
                  }"
                  style="cursor: pointer; color: #6799ee"
                  @click="downloadTxt(scope.row, '风险号.txt', 'riskFilePath')"
                  >{{ scope.row.riskNumber || 0 }}</a
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="downloadTab(scope.row)"
                  >下载</el-button
                >
                <el-button
                  type="text"
                  style="color: #eb371b"
                  size="mini"
                  @click="deleteTab([scope.row])"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.page"
            :page-sizes="[10, 15, 20, 25, 30]"
            :page-size="queryInfo.size"
            layout="total, prev, pager, next, sizes, jumper"
            :total="total"
          ></el-pagination>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="正在检测的任务" :visible.sync="dialogVisible" width="30%">
      <div v-for="item in runningList" :key="item.id" class="dialog">
        <span style="width: 70%; text-align: left">{{ item.name }}.txt</span>
        <span :class="item.status < 0 ? 'error' : 'success'">{{
          item.emptyResult
        }}</span>
      </div>
    </el-dialog>

    <el-dialog title="二维码" width="25%" :visible.sync="dialogVisible1">
      <img width="100%" :src="dialogImageUrl" />
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
import EmptyTest from './empty_test'

const getFile = (url) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'blob'
    })
      .then((data) => {
        resolve(data.data)
      })
      .catch((error) => {
        reject(error.toString())
      })
  })
}

export default {
  components: { EmptyTest },
  filters: {
    formatNumber(num) {
      let _num = Number(num) / 1000
      return _num.toFixed(1)
    }
  },
  data() {
    return {
      personalInfo: {},
      statisticalData: {}, // 使用统计数据
      contract: {}, // 联系人
      timer: [
        this.$moment().format('YYYY-MM-DD'),
        this.$moment().format('YYYY-MM-DD')
      ], // 时间选择框
      // radio: 'front/chunk/chunkUpload',
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
      isUploadOk: false, // 是否还有未上传完成的文件
      attrs: {
        accept: '.txt'
      },
      fileStatusText: {
        success: '上传成功',
        error: '上传错误',
        uploading: '上传中',
        paused: '暂停上传',
        waiting: '等待上传',
        cmd5: 'cmd5'
      },
      fileList: [], // 上传文件数组
      flieAlllist: [],
      latestEmpty: {
        realCount: 0,
        silentCount: 0,
        emptyCount: 0,
        riskCount: 0
      }, // 最新一条检测记录
      emptyState: 0, // 检测按钮显示内容(0: 开始检测，1：检测中，2： 检测完成)
      result: [],
      tableData: [],
      selectData: [], // 选中的表格数据
      queryInfo: {
        page: 1,
        size: 10,
        customerId: '',
        createTimeFrom: this.$moment().format('YYYY-MM-DD'),
        createTimeEnd: this.$moment().format('YYYY-MM-DD')
      },
      currentSize: 10,
      total: 0,
      flag: false, // 是否停止调检测状态接口
      runningList: [
        // { name: '123', status: 9, emptyResult: '检测完成' },
        // { name: '456', status: -1, emptyResult: '正在检测中，请稍等...' },
        // { name: '789', status: -2, emptyResult: '正在检测中，请稍等...' }
      ], // 正在检测的任务
      dialogVisible: false,
      dialogImageUrl: '',
      dialogVisible1: false,
      isCertified: false, // 是否认证
      isDownloadAll: false // 是否可以一键下载全部
    }
  },
  methods: {
    // 计算文件大小
    computeFileSize(size) {
      size = +size
      if (!size) {
        return 0 + 'KB'
      }
      let formatSize = (size / 1024).toFixed(2)
      formatSize = +formatSize
      if (formatSize < 1) {
        return '< 1KB'
      }
      return formatSize + 'KB'
    },
    // 检测成功
    testSuccess() {
      this.getData()
      this.getLatestEmpty()
      this.getPageList()
    },
    async getStatisticalData() {
      const { data } = await this.$http.get('front/empty/getStatisticalData')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.statisticalData = data.data
    },
    async getData() {
      const { data } = await this.$http.get('front/personal/personalInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.personalInfo = data.data
      ss.set('personalInfo', JSON.stringify(data.data))
      this.queryInfo.customerId = JSON.parse(ss.get('customer')).id
    },
    goRecharge(txt) {
      ls.set('type', txt)
      this.$router.push('/recharge')
    },
    // 查看有没有正在检测的任务
    async getRunningList(show) {
      if (show === 'show') {
        this.dialogVisible = true
      }
      const { data } = await this.$http.post('front/empty/getRunningList')
      if (data.code !== 200) return this.$message.error(data.msg)
      // console.log('runningList', data.data)
      this.runningList = data.data
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
    async getCertified() {
      const { data } = await this.$http.get('/front/personal/isPermission')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.isCertified = data.data
    },
    async filesTip() {
      this.$confirm(
        '根据相关规定，您需通过资料认证后方可使用本平台产品。',
        '温馨提示',
        {
          confirmButtonText: '立即认证',
          cancelButtonText: '暂不认证',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }
      )
        .then(() => {
          this.$router.push('/attestation')
        })
        .catch(() => {
          this.getCertified()
        })
    },
    // 检查文件类型
    checkExtension(file) {
      const testMsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testMsg === 'txt'
      if (!extension) {
        this.$message({
          message: '上传失败：仅支持txt格式检测!',
          type: 'warning'
        })
      }
      return extension
    },
    // 上传文件之前
    filesAdded(file) {
      this.isUploadOk = false
      this.emptyState = 0
      this.result = []
      this.fileList = []
      this.flieAlllist = []
      document.getElementsByClassName(
        'uploader-list'
      )[0].children[0].innerHTML = ''
      // this.getRunningList()

      this.options.query.customerId = JSON.parse(ss.get('customer')).id
      this.options.query.taskId = file.id
      if (this.checkExtension(file)) {
        this.computeMD5(file)
      } else {
        // 过滤文件
        file.ignored = true
        // 停止上传
        file.cancel()
        return false
      }
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
      fileReader.onload = (e) => {
        if (file.size !== e.target.result.byteLength) {
          this.error(
            'Browser reported success but could not read the file until the end.'
          )
          return
        }
        md5 = SparkMD5.ArrayBuffer.hash(e.target.result)
        file.uniqueIdentifier = md5
        file.resume()
      }
      fileReader.onerror = function () {
        this.error(
          'FileReader onerror was triggered, maybe the browser aborted due to high memory usage.'
        )
      }
    },
    // 文件上传中触发
    fileProgress(rootFile, file, chunk) {},
    // 删除上传文件
    beforeRemove(file) {
      this.fileList.map((item, i) => {
        if (item === file) this.fileList.splice(i, 1)
      })
      this.flieAlllist.map((item, i) => {
        if (item === file) this.flieAlllist.splice(i, 1)
      })
      if (this.fileList.length === this.flieAlllist.length) {
        this.isUploadOk = true
      }
      if (this.fileList.length === 0) this.emptyState = 0
    },
    // 上传成功触发
    success_txt(rootFile, file, response, chunk) {
      let _response = JSON.parse(response)
      if (_response.code === 200) {
        this.fileList.push(file)
        this.fileList.length === this.flieAlllist.length
          ? (this.isUploadOk = true)
          : (this.isUploadOk = false)
      } else {
        this.$message.error(_response.msg)
        return false
      }
    },
    // 开始检测
    emptyCheck() {
      if (this.fileList.length === 0) {
        return this.$message.error('请先选择上传的txt文件')
      }
      if (!this.isUploadOk) {
        return this.$message.error('请等待文件上传完毕在进行检测！')
      }
      this.ids = []
      // this.$store.commit('setFileList', this.fileList)
      this.fileList.map(async (item) => {
        const { data } = await this.$http.post('front/empty/emptyCheckByFile', {
          customerId: JSON.parse(ss.get('customer')).id,
          md5: item.uniqueIdentifier,
          name: item.name
        })
        if (data.code !== 200) return this.$message.error(data.msg)
        this.ids.push(data.data.emptyId)
        if (this.fileList.length === this.ids.length) {
          this.getStatusList(this.ids)
        }
      })
      this.emptyState = 1
    },
    // 获取检测状态
    async getStatusList(ids) {
      // this.getRunningList()
      const { data } = await this.$http.post('front/empty/getStatusList', {
        ids
      })
      // if (data.code !== 200) return this.$message.error(data.msg)
      if (data.code !== 200) {
        this.$message.error(data.msg)
        this.emptyState = 0
      } else {
        this.result = data.data
        clearInterval(this._timer)
        this.getData()
        // this.getStatisticalData()
        this.result.map((item) => {
          switch (item.status) {
            case -1:
              item.emptyResult = '检测失败：最低上传3001条'
              this.emptyState = 2
              this.flag = true
              clearInterval(this._timer)
              break
            case -2:
              item.emptyResult = '检测失败：当前余额不足，请充值后重新检测'
              this.emptyState = 2
              this.flag = true
              clearInterval(this._timer)
              break
            case -3:
              item.emptyResult = '检测失败：代理商余额不足'
              this.emptyState = 2
              this.flag = true
              clearInterval(this._timer)
              break
            case -4:
              item.emptyResult = '检测失败：最大检测150万条'
              this.emptyState = 2
              this.flag = true
              clearInterval(this._timer)
              break
            case 9:
              item.emptyResult = '检测成功'
              this.emptyState = 2
              this.getPageList()
              this.getLatestEmpty()
              this.flag = true
              clearInterval(this._timer)
              break
            case 10:
              item.emptyResult = '已取消检测'
              this.emptyState = 2
              this.flag = true
              clearInterval(this._timer)
              break
            default:
              this.emptyState = 1
              item.emptyResult = '正在检测中....'
              this._timer = setInterval(() => {
                this.getStatusList(this.ids)
              }, 3000)
              this.flag = false
              break
          }
        })
      }
    },
    // 下载检测结果单个小包
    downloadPro(url) {
      if (this.personalInfo.unzipPassword) {
        this.$message.warning('已设置解压密码，无法直接下载单个文件')
        return
      }
      let _url = `${this.downloadDomain}/unn/${url}`
      window.open(_url)
    },
    // 获取检测记录
    async getPageList() {
      const { data } = await this.$http.post(
        'front/empty/getPageList',
        this.queryInfo
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      this.tableData = data.data.list
      this.total = parseInt(data.data.total)
    },
    // 获取最新一条检测结果
    async getLatestEmpty() {
      const { data } = await this.$http.get('front/empty/getLatestEmpty')
      if (data.code !== 200) return this.$message.error(data.msg)
      if (data.data == null) return
      this.isDownloadAll = true
      this.latestEmpty = data.data
    },
    search() {
      // console.log(this.timer)
      if (this.timer != null) {
        this.queryInfo.createTimeFrom = this.timer[0]
        this.queryInfo.createTimeEnd = this.timer[1]
      } else {
        this.queryInfo.createTimeFrom = this.queryInfo.createTimeEnd = ''
      }
      this.queryInfo.page = 1
      this.queryInfo.size = this.currentSize
      this.getPageList()
    },
    // 表格选项变化触发
    handleSelectionChange(arr) {
      this.selectData = arr
    },
    // 批量下载表格记录
    downloadTab(rows) {
      if (rows === 'select') {
        // 批量下载
        if (this.selectData.length === 0) {
          return this.$message.warning('至少选择一条记录')
        }
        const zip = new JSZip()
        const cache = {}
        const promises = []
        // 批量下载
        this.selectData.forEach((item) => {
          let url
          if (item.isOldData) {
            url = `${this.batchDownload}/${item.customerId}/${item.id}/${
              item.name + '.zip'
            }`
          } else {
            url = `${this.batchDownload}/unn/${item.zipPath}`
          }
          // console.log(url)
          const promise = getFile(encodeURI(url)).then((data) => {
            let fileName = (item.name || item.zipName) + '.zip'
            if (cache[item.name || item.zipName] !== undefined) {
              fileName = (item.name || item.zipName) + Date.now() + '.zip'
            }
            // 下载文件, 并存成ArrayBuffer对象
            zip.file(fileName, data, { binary: true }) // 逐个添加文件
            cache[item.name || item.zipName] = data
          })
          promises.push(promise)
        })
        Promise.all(promises).then(() => {
          zip.generateAsync({ type: 'blob' }).then((content) => {
            // 生成二进制流
            FileSaver.saveAs(content, '批量下载.zip') // 利用file-saver保存文件  自定义文件名
          })
        })
      } else {
        // 单个压缩包
        this.downloadZip(rows)
      }
    },
    // 下载单个压缩包
    downloadZip(rows) {
      const { isOldData, customerId, id, name, zipPath } = rows
      let url = ''
      if (isOldData) {
        url = `${this.downloadDomain}/${customerId}/${id}/${name + '.zip'}`
      } else {
        url = `${this.downloadDomain}/unn/${zipPath}`
      }
      this.downloadfunc(url)
    },
    // 下载表格单个文件
    downloadTxt(rows, names, newUrl) {
      if (this.personalInfo.unzipPassword) {
        this.$message.warning('已设置解压密码，无法直接下载单个文件')
        return
      }
      const {
        id,
        name,
        customerId,
        isOldData,
        emptyFilePath,
        realFilePath,
        riskFilePath,
        silentFilePath,
        realUrl,
        silentUrl,
        emptyUrl,
        riskUrl,
        zipPath
      } = rows
      console.log(
        id,
        name,
        isOldData,
        emptyFilePath,
        realFilePath,
        riskFilePath,
        silentFilePath,
        zipPath,
        realUrl,
        silentUrl,
        emptyUrl,
        riskUrl,
        names
      )
      let url = ''
      // 判断新老数据，新数据直接使用返回的URL，老数据继续拼接
      if (isOldData) {
        // console.log('老数据')
        url = `${this.downloadDomain}/${customerId}/${id}/${names}`
      } else {
        // console.log('新数据')
        url = `${this.downloadDomain}/unn/${rows[newUrl]}`
      }
      // console.log(url)
      this.downloadfunc(url)
    },
    // 下载方法
    downloadfunc(url) {
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
        const confirmResult = await this.$confirm(
          '此操作将删除选中记录, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).catch((err) => err)
        if (confirmResult !== 'confirm') return this.$message.info('已取消删除')
        arr.map(async (item) => {
          const { data } = await this.$http.post(
            `front/empty/delete/${item.id}/${item.isOldData}`
          )
          if (data.code === 200) {
            this.$message.success('删除成功')
            this.getPageList()
            this.getLatestEmpty()
          } else {
            this.$message.error('删除失败')
          }
        })
      }
    },
    handleSizeChange(newSize) {
      this.currentSize = newSize
      this.queryInfo.size = newSize
      this.getPageList()
    },
    handleCurrentChange(newCurrent) {
      this.queryInfo.page = newCurrent
      this.getPageList()
    },
    changeRadio() {
      this.isUploadOk = false
      this.emptyState = 0
      this.result = []
      this.fileList = []
      this.flieAlllist = []
      document.getElementsByClassName(
        'uploader-list'
      )[0].children[0].innerHTML = ''
      // this.getRunningList()
    },
    // 查看大图片
    handlePictureCardPreview(url) {
      this.dialogImageUrl = this.downloadDomain + url
      this.dialogVisible1 = true
    }
  },
  mounted() {
    this.getData()
    // this.getStatisticalData()
    this.getContractInfo()
    this.getLatestEmpty()
    this.getPageList()
    // this.getRunningList()
    this.getCertified()
  },
  // 页面卸载时清除计时器
  destroyed() {
    clearInterval(this._timer)
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
      border-radius: 50%;
    }
    .title {
      font-size: 16px;
      color: #7f859f;
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
        opacity: 0.1;
      }
      .text {
        float: left;
        width: 82px;
        height: 26px;
        color: #1db174;
        text-align: center;
        line-height: 26px;
        background-color: rgba(29, 177, 116, 0.1);
      }
    }
  }
}

.el-box {
  display: flex;
  justify-content: space-around;
  ._el-card {
    width: 95%;
    height: 140px;
    .recharge-btn {
      margin-top: 20px;
    }
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
          font-weight: bold;
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
          color: #f56c6c;
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
        color: #f56c6c;
        span {
          margin-right: 20px;
        }
      }
      .warning {
        margin-top: 10px;
        color: #e6a23c;
        span {
          margin-right: 20px;
        }
      }
    }
  }
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
        color: #67c23a;
      }
      .error {
        color: #f56c6c;
      }
    }
    .runing {
      color: #f56c6c;
      font-weight: 700;
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

.threecard {
  .addBtnBox {
    float: left;
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
      height: 36px;
      line-height: 32px;
    }
  }
  .el-col-13 {
    .el-dropdown {
      float: right;
    }
  }
}

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
    .qq-btn {
      border-radius: 20px;
    }
    .img_div {
      margin: 0 10.5%;
      p {
        margin-bottom: 10px;
      }
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
.lxfs {
  padding-bottom: 4.1%;
  min-height: 140px;
  padding: 0;
}

.dialog {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  .success {
    color: #67c23a;
  }
  .error {
    color: #f56c6c;
  }
}
</style>

<style>
.el-date-editor .el-range__icon,
.el-date-editor .el-range-separator {
  /* 可以通过设置行高改变图标在竖直方向上位置 */
  line-height: 28px;
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
.empty .el-dialog__footer {
  border: 0;
}
.empty .el-dialog__body {
  padding: 15px;
}

/* .empty .el-message-box__close el-icon-close {
  display: none;
} */
</style>
