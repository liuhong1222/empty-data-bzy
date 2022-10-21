<template>
  <div class="empty">
    <el-row :span="24">
      <div class="product-title">
        <div class="i-title">
          <img src="../assets/img/international_test.svg" />
          <div class="title">国际定向检测</div>
        </div>
      </div>
    </el-row>

    <el-row :span="24" class="el-box">
      <el-col :span="8">
        <el-card class="_el-card">
          <div class="onecard">
            <div class="left-block">
              <div class="count">{{ personalInfo.internationalBalance }}</div>
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
                @click="goRecharge('国际定向检测')"
              >
                充值</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="zhxx lxfs">
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
                    :src="this.downloadDomain + contract.wechatQrcode"
                    @click="handlePictureCardPreview(contract.wechatQrcode)"
                    alt="微信二维码"
                  />
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
                    :src="this.downloadDomain + contract.maintainerWechatQrcode"
                    @click="
                      handlePictureCardPreview(contract.maintainerWechatQrcode)
                    "
                    alt="微信二维码"
                  />
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
          <direct-test
            :personal-info="personalInfo"
            :is-certified="isCertified"
            @testSuccess="testSuccess"
          />
          <div class="gray">
            <p>
              注:
              1、号码文件中号码不管有没有带国码都<strong>必须选择国码</strong>；每批上传的号码只能同一个国家的号码，不支持一次性筛查多个国家的号码；筛查完下载的号码系统都已带上了国码
            </p>
            <p class="txt">
              2、
              <strong>
                文件格式仅支持TXT格式文件/每行一个手机号/支持最低2000条-200W条号码包上传/txt文件小于30MB
              </strong>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 检测结果 -->
    <el-row :span="24" style="margin-top: 20px">
      <el-col :span="24">
        <el-card class="towcard">
          <div class="title">检测结果</div>
          <el-row :span="24">
            <el-col :span="12" style="width: 33%">
              <div class="result-box">
                <p class="result-title">
                  已激活
                  <el-popover
                    placement="right"
                    width="160"
                    trigger="hover"
                    content="已激活用户"
                  >
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">
                  {{
                    newInternational.已激活号 ||
                    newInternational.activeNumber ||
                    0
                  }}
                </p>
                <el-button
                  size="medium"
                  :disabled="
                    !newInternational.已激活号url &&
                    !newInternational.activeFilePath
                  "
                  @click="downloadPro(newInternational.activeFilePath)"
                  class="button"
                  >下载</el-button
                >
              </div>
            </el-col>
            <el-col :span="12" style="width: 33%">
              <div class="result-box">
                <p class="result-title">
                  未激活
                  <el-popover
                    placement="right"
                    width="160"
                    trigger="hover"
                    content="未激活"
                  >
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">
                  {{
                    newInternational.未激活 ||
                    newInternational.noRegisterNumber ||
                    0
                  }}
                </p>
                <el-button
                  size="medium"
                  :disabled="
                    !newInternational.未激活url &&
                    !newInternational.noRegisterFilePath
                  "
                  @click="downloadPro(newInternational.noRegisterFilePath)"
                  class="button"
                  >下载</el-button
                >
              </div>
            </el-col>
            <el-col :span="12" style="width: 33%">
              <div class="result-box" style="border-right: none">
                <p class="result-title">
                  未注册
                  <el-popover
                    placement="right"
                    width="160"
                    trigger="hover"
                    content="未注册"
                  >
                    <i class="iconfont iconquestion icon" slot="reference"></i>
                  </el-popover>
                </p>
                <p class="result-size">
                  {{
                    newInternational.未注册 ||
                    newInternational.unknownNumber ||
                    0
                  }}
                </p>
                <el-button
                  size="medium"
                  :disabled="
                    !newInternational.未注册url &&
                    !newInternational.unknownFilePath
                  "
                  @click="downloadPro(newInternational.unknownFilePath)"
                  class="button"
                  >下载</el-button
                >
              </div>
            </el-col>
          </el-row>

          <el-row :span="24">
            <el-col
              :span="4"
              :offset="6"
              style="width: 20%; margin-left: 40%; margin-top: 35px"
              class="downloadAll"
            >
              <p class="solid"></p>
              <el-button
                size="medium"
                :disabled="!isDownloadAll"
                @click="
                  downloadZip(
                    newInternational,
                    newInternational.zip_url || newInternational.zipPath
                  )
                "
                class="button"
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
              <span>产品类型</span>
              <el-select v-model="productVal" class="product-input">
                <el-option
                  v-for="item in productList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
              <el-button
                type="primary"
                size="small"
                @click="search"
                class="button"
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
                  class="button"
                >
                  批量操作</el-button
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
            <!-- // ? 产品类型字段名 -->
            <el-table-column prop="productType" label="产品类型" width="100"></el-table-column>
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
            <el-table-column prop="activeNumber" label="已激活">
              <template slot-scope="scope">
                <a
                  :style="{
                    'pointer-events':
                      !scope.row.activeNumber || scope.row.activeNumber == '0'
                        ? 'none'
                        : 'auto'
                  }"
                  style="cursor: pointer; color: #6799ee"
                  @click="
                    downloadTxt(scope.row, '已激活.txt', 'activeFilePath')
                  "
                  >{{ scope.row.activeNumber || 0 }}</a
                >
              </template>
            </el-table-column>
            <el-table-column prop="noRegisterNumber" label="未激活">
              <template slot-scope="scope">
                <a
                  :style="{
                    'pointer-events':
                      !scope.row.noRegisterNumber || scope.row.noRegisterNumber == '0'
                        ? 'none'
                        : 'auto'
                  }"
                  style="cursor: pointer; color: #6799ee"
                  @click="
                    downloadTxt(scope.row, '未激活.txt', 'noRegisterFilePath')
                  "
                  >{{ scope.row.noRegisterNumber || 0 }}</a
                >
              </template>
            </el-table-column>
            <el-table-column prop="unknownNumber" label="未注册">
              <template slot-scope="scope">
                <a
                  :style="{
                    'pointer-events':
                      !scope.row.unknownNumber ||
                      scope.row.unknownNumber == '0'
                        ? 'none'
                        : 'auto'
                  }"
                  style="cursor: pointer; color: #6799ee"
                  @click="
                    downloadTxt(scope.row, '未注册.txt', 'unknownFilePath')
                  "
                  >{{ scope.row.unknownNumber || 0 }}</a
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="totalNumber"
              label="总条数"
            ></el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
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

    <el-dialog title="二维码" width="25%" :visible.sync="dialogVisible">
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
import DirectTest from './direct_test'
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
  components: { DirectTest },
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
        page: 1,
        size: 10,
        customerId: '',
        createTimeFrom: this.$moment().format('YYYY-MM-DD'),
        createTimeEnd: this.$moment().format('YYYY-MM-DD'),
        productType: ''
      },
      currentSize: 10,
      timer: [
        this.$moment().format('YYYY-MM-DD'),
        this.$moment().format('YYYY-MM-DD')
      ], // 时间选择框
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
      newInternational: {
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
      total: 0,
      selectData: [],
      dialogImageUrl: '',
      dialogVisible: false,
      isCertified: false,
      loading: false,
      text: ls.get('text'),
      uploadListShow: false, // 文件上传弹窗是否展示
      isDownloadAll: false, // 是否可以一键下载全部
      productVal: '', // 国际定向检测产品下拉框选中值
      productList: [ // 'viber', 'zalo', 'botim', 'line'
        {
          value: '',
          label: '全部'
        },
        {
          value: 'viber',
          label: 'viber'
        },
        {
          value: 'zalo',
          label: 'zalo'
        },
        {
          value: 'botim',
          label: 'botim'
        },
        {
          value: 'line',
          label: 'line'
        }
      ] // 国际定向检测产品下拉框列表
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
      // debugger
      this.getData()
      this.getLatestEmpty()
      this.getInternationalPageList()
    },
    async getData() {
      const { data } = await this.$http.get('front/personal/personalInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.personalInfo = data.data
      this.queryInfo.customerId = JSON.parse(ss.get('customer')).id
    },
    async getInternationalStatisticalData() {
      // const { data } = await this.$http.get(
      //   'front/international/getInternationalStatisticalData'
      // )
      // if (data.code !== 200) return this.$message.error(data.msg)
      // this.statisticalData = data.data
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
    // 上传文件之前
    filesAdded(file) {
      this.isUploadOk = true
      ls.set('text', '开始检测')
      this.text = '开始检测'
      this.result = []
      this.fileList = []
      this.flieAlllist = []
      document.getElementsByClassName(
        'uploader-list'
      )[0].children[0].innerHTML = ''

      this.options.query.customerId = JSON.parse(ss.get('customer')).id
      this.options.query.taskId = file.id
      this.uploadListShow = true
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
      if (!this.loading) {
        ls.set('text', '检测中...')
        this.text = '检测中...'
      }
      this.fileList.map(async (item) => {
        const { data } = await this.$http.post(
          'front/intDirect/checkByFile',
          {
            customerId: JSON.parse(ss.get('customer')).id,
            md5: item.uniqueIdentifier,
            name: item.name
          }
        )
        if (data.code !== 200) return this.$message.error(data.msg)
        this.result.push(data.data)
        if (this.fileList.length === this.result.length) {
          // this.$store.commit('setInternationalResult', this.result)
          this.getLatestEmpty()
          this.getInternationalPageList()
          ls.set('text', '继续检测')
          this.text = '继续检测'
          this.loading = true
        } else {
          ls.set('text', '开始检测')
          this.text = '开始检测'
        }
      })
    },
    // 检测结果-下载单个小包
    downloadPro(url) {
      if (this.personalInfo.unzipPassword) {
        this.$message.warning('已设置解压密码，无法直接下载单个文件')
        return
      }
      let _url = `${this.downloadDomain}international/${url}`
      window.open(_url)
    },
    // 获取最新一条检测结果
    async getLatestEmpty() {
      const { data } = await this.$http.get(
        'front/intDirect/getLatestIntDirect'
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      if (data.data == null) return
      this.isDownloadAll = true
      this.newInternational = data.data
    },
    // 获取检测记录
    async getInternationalPageList() {
      const { data } = await this.$http.post(
        'front/intDirect/getIntDirectPageList',
        this.queryInfo
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      this.tableData = data.data.list
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
      this.queryInfo.page = 1
      this.queryInfo.size = this.currentSize
      this.queryInfo.productType = this.productVal
      this.getInternationalPageList()
    },
    // 表格选项变化触发
    handleSelectionChange(arr) {
      this.selectData = arr
    },
    // 批量下载
    downloadTab(rows) {
      if (rows === 'select') {
        if (this.selectData.length === 0) {
          return this.$message.warning('至少选择一条记录')
        }
        const zip = new JSZip()
        const cache = {}
        const promises = []
        // 批量
        this.selectData.forEach((item) => {
          let url
          if (item.isOldData) {
            url = `${this.batchDownload}/international/${item.customerId}/${
              item.id
            }/${item.name + '.zip'}`
          } else {
            url = `${this.batchDownload}/international/${item.zipPath}`
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
    downloadZip(rows, _url = ' ') {
      const { isOldData, customerId, id, name, zipPath } = rows
      let url = ''
      if (isOldData) {
        if (_url !== ' ') {
          // 此处下载全部直接使用返回URL
          url = `${this.downloadDomain}international/${_url}`
        } else {
          url = `${this.downloadDomain}international/${customerId}/${id}/${
            name + '.zip'
          }`
        }
      } else {
        url = `${this.downloadDomain}international/${zipPath}`
      }
      this.downloadfunc(url)
    },
    // 下载表格单个小包
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
        riskUrl
      )
      let url
      if (isOldData) {
        url = `${this.downloadDomain}international/${customerId}/${id}/${names}`
      } else {
        url = `${this.downloadDomain}international/${rows[newUrl]}`
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
            `front/intDirect/delete/${item.id}`
          )
          if (data.code !== 200) return this.$message.error('删除失败')
          this.getInternationalPageList()
          this.getLatestEmpty()
        })
        this.$message.success('删除成功')
      }
    },
    handleSizeChange(newSize) {
      this.currentSize = newSize
      this.queryInfo.size = newSize
      this.getInternationalPageList()
    },
    handleCurrentChange(newCurrent) {
      this.queryInfo.page = newCurrent
      this.getInternationalPageList()
    },
    changeRadio() {
      this.isUploadOk = true
      ls.set('text', '开始检测')
      this.text = '开始检测'
      this.result = []
      this.fileList = []
      this.flieAlllist = []
      document.getElementsByClassName(
        'uploader-list'
      )[0].children[0].innerHTML = ''
    },
    // 查看大图片
    handlePictureCardPreview(url) {
      this.dialogImageUrl = this.downloadDomain + url
      this.dialogVisible = true
    }
  },
  mounted() {
    this.getData()
    this.getInternationalStatisticalData()
    this.getContractInfo()
    this.getLatestEmpty()
    this.getInternationalPageList()
    ls.set('text', '开始检测')
    this.getCertified()
    // this.result = this.$store.state.internationalResult
    // console.log(this.$http.defaults.baseURL)
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
    .txt {
      margin-left: 19px;
      margin-top: 10px;
    }
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
        color: #f56c6c;
      }
      .error {
        color: #67c23a;
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
      left: 49.5%;
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
      width: 240px;
      height: 34px;
      line-height: 32px;
    }
    .product-input {
      width: 150px;
      margin: 0 15px;
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
