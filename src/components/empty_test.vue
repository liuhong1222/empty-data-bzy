<template>
  <div class="empty-test">
    <div class="file-box">
      <div class="file-input">
        {{ this.fileObj['name'] || '请上传文件进行检测' | formatName }}
      </div>
      <div
        v-if="fileInfObj['minshow']"
        class="file-butt file-butt-layouts"
        @click="dialogIndex = 2"
      >
        <img
          height="20"
          src="../assets/img/loading.png"
          style="margin-right: 5px"
        />{{ mobileObj['stateDesc'] }}
      </div>
      <div
        v-else
        class="file-butt file-butt-select"
        @mouseenter="showFileBtn()"
        @mouseleave="hideFileBtn()"
      >
        浏览
      </div>
      <!-- 可选择单文件上传/多文件上传 -->
      <div
        class="file-butt file-butt-choose"
        @mouseenter="showFileBtn()"
        @mouseleave="hideFileBtn()"
        v-if="fileBtnShow"
      >
        <ul>
          <li @click="browseButt($event, 'singlefile')">上传单个文件</li>
          <li @click="browseButt($event, 'multfile')">上传多个文件</li>
        </ul>
      </div>
    </div>
    <div>
      <div if="stepIndex > 0" class="handle-regin">
        <el-button v-if="stepIndex == 1" @click="clickUpload"
          >点击上传</el-button
        >
        <el-progress
          v-if="stepIndex == 2"
          :text-inside="true"
          :stroke-width="18"
          :percentage="singleProgressVal"
          style="height: 5px; margin-top: 12px"
        ></el-progress>
        <!-- <el-button v-if='stepIndex == 3' @click="clickTesting">立即检测</el-button> -->
        <div v-if="stepIndex == 3" class="upload-test-wrap">
          <div class="upload-test-wrap-txt">
            <img
              src="../assets/img/upload_success.png"
              alt="success"
              width="30px"
              height="30px"
            />
            <div>
              <p>上传成功</p>
            </div>
            <span></span>
          </div>
          <el-button @click="clickTesting">开始检测</el-button>
        </div>
      </div>
    </div>
    <form ref="formelem" id="formelem">
      <input
        class="file-hidden"
        name="empty"
        id="singlefile"
        ref="singlefile"
        type="file"
        accept="text/plain,application/vnd.ms-excel"
        @change="singlefilePreview($event)"
      />
    </form>
    <form ref="formelem" id="formelem">
      <input
        class="file-hidden"
        name="multfile"
        id="multfile"
        ref="multfile"
        type="file"
        accept="text/plain,application/vnd.ms-excel"
        multiple
        @change="multfilePreview($event)"
      />
    </form>
    <!-- 单文件分片上传弹窗 -->
    <!-- <el-dialog width="300px" top="30vh" custom-class="dialog-reset dialog-loading" :show-close="false" :visible="isSingleFile && isUploadShow">
      <img height='30' src='../assets/img/loading.png' />
      <p>{{uploadCompleted}}</p>
    </el-dialog> -->
    <el-dialog
      width="300px"
      top="30vh"
      custom-class="dialog-reset dialog-loading"
      :show-close="false"
      :visible="dialogIndex == 1"
      append-to-body
    >
      <img height="30" src="../assets/img/loading.png" />
      <p>文件读取中，请勿离开...</p>
    </el-dialog>
    <el-dialog
      width="880px"
      custom-class="dialog-reset dialog-conduct"
      :show-close="false"
      :visible="dialogIndex == 2"
      append-to-body
    >
      <template slot="title">
        <span>空号检测</span>
        <button
          type="button"
          class="el-dialog__headerbtn"
          @click="dialogIndex = 0"
        >
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </template>
      <div class="loading-regin">
        <div class="loading1" :style="testingPosition">{{ testingScale }}%</div>
        <div class="loading2">
          <img width="100%" src="../assets/img/circle1.png" />
        </div>
        <div class="loading3">
          <img width="100%" src="../assets/img/circle2.png" />
        </div>
        <div class="loading4">
          <img width="100%" src="../assets/img/circle3.png" />
        </div>
      </div>
      <div class="conduct-scaling">
        <span>{{ mobileObj['stateDesc'] }}</span
        >({{ mobileObj['testCounts'] }}/{{ mobileObj['fileCounts'] }})
      </div>
      <ul class="conduct-order">
        <li
          v-for="(item, index) in mobileObj['mobileList']"
          :class="item.color"
          :key="index"
        >
          <span>{{ item.mobile }}</span>
          <i v-if="item['color'] == 'red'" class="el-icon-warning"></i>
          <i v-else-if="item['color'] == 'blue'" class="el-icon-success"></i>
          <i v-else-if="item['color'] == 'gray'" class="el-icon-error"></i>
          <i v-else-if="item['color'] == 'yellow'" class="el-icon-question"></i>
        </li>
      </ul>
      <p class="conduct-remarks">无需等待，系统后台自动执行......</p>
    </el-dialog>
    <el-dialog
      width="450px"
      custom-class="dialog-reset dialog-suspend"
      :show-close="false"
      :visible="dialogIndex == 3"
      append-to-body
    >
      <template slot="title">
        <span>提示</span>
        <button
          type="button"
          class="el-dialog__headerbtn"
          @click="dialogIndex = 0"
        >
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </template>
      <p class="text-desc">根据您的需求，此次检测已经被终止！</p>
      <template slot="footer">
        <el-button type="primary" size="small" @click="dialogIndex = 0"
          >确定</el-button
        >
      </template>
    </el-dialog>
    <el-dialog
      width="450px"
      custom-class="dialog-reset dialog-success"
      :show-close="false"
      :visible="dialogIndex == 4"
      append-to-body
    >
      <p>
        <img
          src="../assets/img/完成.png"
          style="vertical-align: middle; margin-right: 5px"
          alt="success"
          width="40px"
        />
        <span class="txt">恭喜！检测完成</span>
      </p>
      <el-button type="primary" size="small" @click="dialogIndex = 0"
        >确定</el-button
      >
    </el-dialog>
    <!-- <el-dialog width="450px" custom-class="dialog-reset dialog-success" :show-close="false" :visible="dialogIndex == 4">
      <img src="../assets/img/success.png" alt="">
      <h3>恭喜！检测完成</h3>
      <h4>本次检测提交条数：<span class="red">{{fileRows}}条</span></h4>
      <h4>{{countDown}}s后进入检测结果页面，或点击<a to="/html/account/testrecord">直接进入</a>
      </h4>
    </el-dialog> -->
    <!-- 多文件分片上传弹窗 -->
    <el-dialog
      width="860px"
      custom-class="dialog-batch"
      :show-close="false"
      :visible="dialogVisible"
      append-to-body
    >
      <template slot="title">
        <span>批量检测</span>
        <button
          v-if="mulCloseIcon"
          type="button"
          class="el-dialog__headerbtn"
          @click="closedialog"
        >
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </template>
      <div class="vue-scroll">
        <template v-for="(item, index) in mulFileList">
          <div v-bind:key="index">
            <el-row class="file-select">
              <el-col class="list1" :span="2">{{
                (index >= 9 ? '' : '0') + (index + 1)
              }}</el-col>
              <el-col class="list2" :span="16">
                <h3>
                  {{ item.file.name | formatName }}
                  <span v-if="item.uploadobj.fileRows"
                    >(号码条数：{{ item.uploadobj.fileRows || 0 }}条)</span
                  >
                  <span v-else>({{ item.file.size | formatSize }})</span>
                </h3>
              </el-col>
              <el-col class="list3" :span="6">
                <span v-html="item.stateDesc"></span>
                <i
                  v-if="mulStepIndex == 1"
                  class="el-icon-error"
                  @click="delectfile(index)"
                ></i>
              </el-col>
            </el-row>
            <el-progress
              :text-inside="true"
              :show-text="false"
              :stroke-width="1"
              :percentage="item.progressVal"
            ></el-progress>
          </div>
        </template>
      </div>
      <template v-if="mulStepIndex == 1">
        <div v-if="mulFileList.length < 30" class="add-file">
          <el-button
            size="medium"
            type="primary"
            @click="browseButt($event, 'multfile')"
          >
            <i class="el-icon-upload" />&nbsp;&nbsp;添加文件
          </el-button>
        </div>
        <div class="upload-file">
          <el-button type="primary" @click="clickMultiUpload"
            >立即上传</el-button
          >
          <p>
            注：您已添加{{ mulFileList.length }}个文件，最多可再添加{{
              30 - mulFileList.length
            }}个文件
          </p>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      width="450px"
      custom-class="dialog-confirm"
      :show-close="false"
      :visible="mulStepIndex == 2"
      append-to-body
    >
      <p>
        文档上传后会自动进行检测，<br />
        上传过程无法暂停或取消，是否立即上传
      </p>
      <el-button type="primary" :disabled="mulYesDisabled" @click="mulUploadYes"
        >是</el-button
      >
      <el-button
        type="primary"
        :disabled="mulYesDisabled"
        @click="
          mulStepIndex = 1
          mulCloseIcon = true
        "
        >否</el-button
      >
    </el-dialog>
    <el-dialog
      width="450px"
      custom-class="dialog-confirm"
      :show-close="false"
      :visible="mulStepOver"
      append-to-body
    >
      <p>
        <img
          src="../assets/img/完成.png"
          style="vertical-align: middle; margin-right: 5px"
          alt="success"
          width="40px"
        />本次操作已完成
      </p>
      <el-button type="primary" @click="mulStepOverClick">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { ss } from '../utils/storage'
import { uploadByPieces } from '../utils/uploadByPieces'

export default {
  name: 'EmptyTest',
  components: {},
  props: {
    personalInfo: {
      type: Object,
      required: true
    },
    isCertified: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      fileObj: {}, // 单文件上传数据
      fileRows: 0,
      fileInfObj: {
        id: null,
        minshow: false
      },
      stepIndex: 0,
      singleProgressVal: 0,
      dialogIndex: 0, // dialog状态
      mobileObj: {
        fileCounts: 0,
        testCounts: 0,
        mobileList: [],
        stateDesc: ''
      }, // 循环检测结果
      countDown: 10, // 完成10秒倒计时
      timersecond: null, // 倒计时对象
      fileBtnShow: false, // 是否展示可选上传按钮
      fileBtnTimer: null, // 倒计时对象
      isSingleFile: true, // 单文件上传/多文件上传
      fileObjList: [], // 单文件所有上传文件对象
      isUploadShow: false, // 分片上传弹窗
      uploadCompleted: '文件上传中，请勿离开...', // 分片上传进度
      checkId: '', // 单文件检测id（唯一id）
      dialogVisible: false, // 多文件上传弹窗
      mulFileList: [], // 多文件上传列表
      mulStepIndex: 1,
      mulCheckId: [], // 上传文件id
      mulStepOver: false, // 多文件上传检测完成
      mulCloseIcon: true,
      mulYesDisabled: false // 批量检测点击是按钮是否禁用
    }
  },
  computed: {
    testingScale() {
      const { testCounts = 0, fileCounts = 1 } = this.mobileObj || {}
      return parseInt((Number(testCounts) / (Number(fileCounts) || 1)) * 100)
    },
    testingPosition() {
      const { testCounts = 0, fileCounts = 1 } = this.mobileObj || {}
      return {
        'background-position-y':
          138 - (Number(testCounts) / (Number(fileCounts) || 1)) * 138 + 'px'
      }
    }
  },
  filters: {
    formatName(filename) {
      if (filename) {
        return filename.replace(/^(^.{12})(.+)(.{5}\.+\w+$)$/g, '$1...$3')
      }
      return filename
    },
    formatSize(filesize) {
      let size = ''
      if (filesize < 1 * 1024 * 1024) {
        size = (filesize / 1024).toFixed(2) + 'KB'
      } else {
        size = (filesize / (1024 * 1024)).toFixed(2) + 'MB'
      }
      return size
    }
  },
  created() {},
  mounted() {
    // 单文件上传
    try {
      const testingId = ss.get('TestingID')
      const testingrows = ss.get('TestingRows')
      if (testingId) {
        this.fileInfObj = { id: testingId, minshow: true }
        this.getTestProcessMobile('fromMounted')
      }
      if (testingrows) {
        this.fileRows = testingrows
      }
    } catch (err) {
      this.fileInfObj = {
        id: null,
        minshow: false
      }
      ss.remove('TestingID')
    }
    // 多文件上传
    try {
      const TestingList = ss.get('TestingList')
      this.fileList = JSON.parse(TestingList || '[]')
      if (this.fileList.length) {
        this.fileList.forEach((itemobj) => {
          if (itemobj.checkval === 3) {
            this.loopTestingProcess(itemobj)
          }
        })
        this.mulStepIndex = 4
        this.minshow = true
      }
    } catch (err) {
      this.fileList = []
      this.mulStepIndex = 1
      this.minshow = false
      this.dialogVisible = false
      ss.remove('TestingList')
    }
  },
  methods: {
    // 批量上传点击是
    mulUploadYes() {
      this.mulStepIndex = 3
      this.mulBeginUpload(0)
      this.mulYesDisabled = true
    },
    // 是否展示文件上传可选按钮
    showFileBtn() {
      clearTimeout(this.fileBtnTimer)
      this.fileBtnShow = true
    },
    hideFileBtn() {
      this.fileBtnTimer = setTimeout(() => {
        this.fileBtnShow = false
      }, 500)
    },
    // 单文件上传
    // 点击预览
    browseButt(event, dom) {
      // 判断是否登录
      if (!ss.get('token')) {
        event.preventDefault()
        this.$message.error('token已过期，请重新登录')
        return
      }

      // 判断是否认证
      if (!this.isCertified) {
        switch (this.personalInfo.authenticationLimitLevel) {
          case 1: // 可关（对应等级二）
            event.preventDefault()
            this.$root.$emit('showCertification', {
              source: {
                url: 'empty',
                type: dom,
                balance: this.personalInfo.remainNumberTotal
              },
              flag: true
            })
            break
          case 2: // 不可关（对应等级三）
            event.preventDefault()
            this.$root.$emit('showCertification', {
              source: { url: 'emptyapiNot', type: 'testBtn' },
              flag: true
            })
            break
          default:
            this.$message.error('请先完成认证')
            return false
        }
      } else {
        // 判断余额
        if (
          !this.personalInfo.remainNumberTotal ||
          this.personalInfo.remainNumberTotal === '0'
        ) {
          event.preventDefault()
          this.$message.error('余额不足')
          return
        }

        this.isSingleFile = dom === 'singlefile'
        // console.log(this.isSingleFile)
        document.getElementById(dom).click()
      }
    },
    // 验证预览文件1:点击上传 2：显示进度 3：立即检测
    // 单文件上传
    singlefilePreview({ target }) {
      const file = target.files[0]
      if (file.size === 0) {
        this.$message.error('上传文件有误，请重新上传！')
        this.$refs.singlefile.value = ''
        return
      }
      if (file) {
        if (
          file.name.substr(-4) !== '.txt' &&
          file.name.substr(-4) !== '.xls'
        ) {
          this.$message.warning('仅支持txt或者xls格式的文件')
          this.$refs.singlefile.value = ''
        } else if (file.size >= 41943041) {
          this.$message.warning('文件大小不能超过40M')
          this.$refs.singlefile.value = ''
        } else {
          this.fileObj = file || {}
          this.stepIndex = 2
          this.uploadAxios(file)
        }
      }
    },
    // 文件上传Ajax
    uploadAxios(file) {
      // 获取所有上传文件
      if (this.isSingleFile) {
        this.fileObjList = [file]
      } else {
        this.fileList.map((item) => {
          this.fileObjList.push(item.file)
        })
      }
      // console.log(this.fileObjList)
      this.fileObjList = this.fileObjList.map((v) => {
        v.status = '1'
        return v
      })
      // 分片上传
      this.processButtonClick(this.fileObjList, 0)
    },
    // 分片上传
    async processButtonClick(formData, index) {
      // console.log(formData, index)
      var formDatass = formData.map((v, i) => {
        if (index === i) {
          v.status = '3'
        }
        return v
      })
      // console.log(Object.assign([], formDatass))
      this.fileObjList = formDatass
      uploadByPieces({
        file: formData[index],
        fileUpload: '/front/chunk/chunkUpload',
        mergeFile: '/front/chunk/uploadStatus',
        customerId: this.personalInfo.id,
        pieceSize: 0.25,
        productCodeType: 'empty', // 0-空号检测  1-实时检测
        success: (data) => {
          console.log('文件上传成功--------' + data.data)
          if (data.code === 200) {
            this.isUploadShow = false
            this.$message.success('文件上传成功')
            this.stepIndex = 3 // 立即检测
            this.checkId = data.data
            formDatass = formData.map((v, i) => {
              if (index === i) {
                v.status = '5'
                v.id = data.data
              }
              return v
            })
            this.fileObjList = formDatass
          } else {
            formDatass = formData.map((v, i) => {
              if (index === i) {
                v.status = '4'
              }
              return v
            })
            this.fileObjList = formDatass
            this.$message.error(data.msg)
            this.resetFrom()
          }
        },
        progress: (completed) => {
          console.log('分片上传进度：' + completed)
          this.isUploadShow = true // 文件上传弹窗
          this.singleProgressVal = Number(completed)
          formDatass = formData.map((v, i) => {
            if (index === i) {
              v.progress = completed
            }
            return v
          })
          this.fileObjList = formDatass
        },
        error: (e) => {
          console.log('分片上传失败' + e)
          this.isUploadShow = false
          formDatass = formData.map((v, i) => {
            if (index === i) {
              v.status = '4'
              v.msg = e
            }
            this.$message.error(v.msg)
            return v
          })
          this.fileObjList = formDatass
          this.$message.error(e)
          this.resetFrom()
        }
      })
      if (index >= formData.length - 1) {
      } else {
        setTimeout(() => {
          this.processButtonClick(formData, index + 1)
        }, 500)
      }
    },
    // 重置文件选择
    resetFrom() {
      this.fileObj = {}
      this.stepIndex = 0
      document.getElementById('formelem').reset()
      this.mulCloseIcon = true
    },
    // 验证检测
    clickTesting() {
      // 从后台拿到的上传条数
      let runCount = 3
      this.stepIndex = 0
      this.dialogIndex = 1
      this.timersecond = setInterval(() => {
        runCount--
        if (runCount <= 0) {
          this.testingAxios()
          clearInterval(this.timersecond)
        }
      }, 1000)
    },
    // 准备检测数据
    testingAxios() {
      const testForm = new FormData()
      testForm.append('fileId', this.checkId)
      console.log(this.checkId)
      this.$http
        .post('/front/empty/emptyCheckByFile', testForm)
        .then((res) => {
          if (res.data.code === 200) {
            // 请求成功，关闭定时器
            clearInterval(this.timersecond)
            this.testingSuccess(res.data.data.runCount)
            console.log(res.data.code)
            ss.set('TestingID', res.data.data.code)
            ss.set('TestingRows', this.fileRows)
          } else {
            this.dialogIndex = ''
            this.$message.warning(res.data.msg)
            this.resetFrom()
          }
        })
        .catch(() => {
          this.$message.error('检测失败')
          this.resetFrom()
        })
    },
    // 缓冲后台数据读取延迟
    testingSuccess({ runCount = 3 }) {
      console.log(runCount)
      this.timersecond = setInterval(() => {
        runCount--
        if (runCount <= 0) {
          this.dialogIndex = 2
          console.log('testingSuccess')
          this.getTestProcessMobile()
          this.fileInfObj.minshow = true
          clearInterval(this.timersecond)
        }
      }, 1000)
    },
    //  200进行中，999979已完成
    getTestProcessMobile(type) {
      const testForm = new FormData()
      testForm.append('fileId', this.checkId || ss.get('TestingID'))
      this.$http
        .post('/front/empty/getTestProcessMobile', testForm)
        .then((res) => {
          console.log(res)
          // debugger
          if (res.data.code === 200) {
            // 检测中
            const { testCounts = '36', fileCounts } = res.data.data || {}
            // debugger
            if (testCounts === '36') {
              this.mobileObj = {
                ...res.data.data,
                testCounts: '0',
                stateDesc: '准备检测'
              }
            } else {
              if (testCounts === fileCounts) {
                this.mobileObj = { ...res.data.data, stateDesc: '文件解析中' }
              } else {
                this.mobileObj = { ...res.data.data, stateDesc: '正在检测' }
              }
            }
            if (type === 'fromMounted') {
              this.dialogIndex = 2
            }
            this.fileRows = res.data.data.fileCounts
            this.loopTestProcess(1500)
          } else if (res.data.code === 999979) {
            // if (type === 'fromMounted') {
            //   this.dialogIndex = 4
            // }
            // debugger
            ss.remove('TestingID')
            ss.remove('TestingRows')
            this.handleDoneDown(type)
          } else {
            // 检测失败
            this.dialogIndex = 0
            this.$message.warning(res.data.msg)
            ss.remove('TestingID')
            ss.remove('TestingRows')
          }
        })
        .catch(() => {
          this.fileInfObj = {}
          this.loopTestProcess(3000)
        })
    },
    // 循环数据检测进度
    loopTestProcess(times) {
      this.timersecond = setTimeout(() => {
        console.log('loopTestProcess')
        this.getTestProcessMobile()
      }, times)
    },
    // 完成倒计时
    handleDoneDown(type) {
      // this.timersecond = setInterval(() => {
      // this.countDown--
      // if (this.countDown <= 0) {
      this.dialogIndex = 4
      clearInterval(this.timersecond)
      this.fileInfObj.minshow = false
      this.resetFrom()
      // debugger
      // if (type !== 'fromMounted') {
      //   this.dialogIndex = 0
      //   this.$message.success('检测完成')
      // }
      this.$emit('testSuccess')
      // }
      // }, 1000)
    },
    // 多文件上传
    multfilePreview({ target }) {
      let flag = true
      const files = target.files || []
      for (let i = 0; i < files.length; i++) {
        if (
          files[i].name.substr(-4) !== '.txt' &&
          files[i].name.substr(-4) !== '.xls'
        ) {
          flag = false
          this.$message.warning('仅支持txt或者xls格式的文件')
          break
        } else if (files[i].size >= 41943041) {
          flag = false
          this.$message.warning('文件大小不能超过40M')
          break
        }
      }
      if (flag) {
        this.mulFilePush(files)
      } else {
        document.getElementById('formelem').reset()
      }
    },
    // 封装文件数据对象
    mulFilePush(files) {
      for (let i = 0; i < files.length; i++) {
        if (this.mulFileList.length < 30) {
          // checkval: 0: 默认值 1: 验证没通过 2:文件上传成功 3：文件检测通过 4:检测成功
          this.mulFileList.push({
            checkval: 0,
            stateDesc: '等待上传',
            file: files[i],
            progressVal: 0,
            uploadobj: {},
            testobj: {},
            mobileobj: {}
          })
        } else {
          this.$message.error(
            '您的文件数量超出限制，最多可上传30个文件，系统已自动选择前30个文件，如需检测其他文件，请删除列表中的文件后再添加。',
            8000
          )
          break
        }
      }
      this.dialogVisible = true
      document.getElementById('formelem').reset()
    },
    // 多文件上传-删除单个文件
    delectfile(index) {
      this.mulFileList.splice(index, 1)
    },
    // 多文件上传-点击循环上传
    mulBeginUpload(index = 0) {
      const itemobj = this.mulFileList[index]
      if (itemobj) {
        index++
        if (itemobj.checkval === 0) {
          this.mulProcessUpload(index, itemobj)
        } else {
          this.mulBeginUpload(index)
          // 全部上传失败时，显示关闭icon
          this.mulCloseIconDeal()
        }
      } else {
        this.mulStepIndex = 4
      }
      window.addEventListener('beforeunload', this.beforeunloadHandler, true)
    },
    beforeunloadHandler(event) {
      event.returnValue = '确定要离开当前页面吗？'
    },
    // 处理多文件上传icon显隐问题
    mulCloseIconDeal() {
      const resbool = this.mulFileList.every((item) => {
        return item.checkval === 1
      })
      if (resbool) {
        this.mulCloseIcon = true
      }
    },
    // 关闭多文件上传弹窗
    closedialog() {
      const resbool = this.mulFileList.some((item) => {
        return item.checkval === 3
      })
      if (resbool && this.mulStepIndex === 4) {
        this.minshow = true
        ss.set('TestingList', JSON.stringify(this.mulFileList))
        window.removeEventListener(
          'beforeunload',
          this.beforeunloadHandler,
          true
        )
      } else {
        this.mulFileList = []
        this.mulStepIndex = 1
      }
      this.dialogVisible = false
      this.mulStepOver = false
    },
    // 点击多文件上传
    clickMultiUpload() {
      if (this.mulFileList.length === 0) {
        this.$message.error('请选择检测文件')
      } else if (this.mulFileList.length >= 31) {
        this.$message.error('最多同时检测30个文件')
      } else {
        const resbool = this.mulFileList.some((item) => {
          return item.checkval === 0
        })
        if (resbool) {
          this.mulStepIndex = 2
          this.mulYesDisabled = false
          this.mulCloseIcon = false
        } else {
          this.$message.error('请选择正确的文件')
        }
      }
    },
    // 多文件上传-分片上传
    async mulProcessUpload(index, itemobj) {
      console.log(index, itemobj)
      console.log(this.mulFileList)
      const fileobj = itemobj.file
      uploadByPieces({
        file: fileobj,
        fileUpload: '/front/chunk/chunkUpload',
        mergeFile: '/front/chunk/uploadStatus',
        customerId: this.personalInfo.id,
        pieceSize: 0.25,
        success: (data) => {
          console.log('文件上传成功--------' + data)
          if (data.code === 200) {
            itemobj.checkval = 2
            itemobj.stateDesc = '准备检测'
            itemobj.file = { name: fileobj.name, size: fileobj.size }
            itemobj.uploadobj = data
            console.log(itemobj.uploadobj)
            this.mulCheckId.push(data.data)
            // for (let j = 0; j < this.mulCheckId.length; j++) {
            this.mulTestingAxios(itemobj, data.data)
            // }
          } else {
            itemobj.checkval = 1
            itemobj.stateDesc = `<span style='color: #F56C6C'>${data.msg}</span>`
            this.handeldone()
          }
          this.mulBeginUpload(index)
        },
        progress: (completed) => {
          console.log('分片上传进度：' + completed)
          // if (completed.indexOf('%') === -1) {
          //   itemobj.stateDesc = completed
          // }
        },
        error: (e) => {
          itemobj.checkval = 1
          itemobj.stateDesc = '<span style="color: #F56C6C">文件上传失败</span>'
          // this.mulBeginUpload(index) // 分片上传失败时，不重传该包，而是改为重传该片
          this.$message.error(e)
          this.handeldone()
          // this.dialogVisible = false
        }
      })
    },
    // 文件上传完成并全部验证通过
    mulTestingAxios(itemobj, id) {
      const testForm = new FormData()
      testForm.append('fileId', id)
      this.$http
        .post('/front/empty/emptyCheckByFile', testForm)
        .then((res) => {
          if (res.data.code === 200) {
            itemobj.checkval = 3
            this.loopTestingProcess(itemobj)
          } else {
            itemobj.checkval = 1
            itemobj.stateDesc = `<span style='color: #F56C6C'>${res.data.msg}</span>`
            this.handeldone()
            this.mulCloseIconDeal()
          }
        })
        .catch(() => {
          itemobj.checkval = 1
          itemobj.stateDesc = '<span style="color: #F56C6C">检测失败</span>'
          this.handeldone()
          this.mulCloseIconDeal()
        })
    },
    // 循环数据检测进度
    loopTestingProcess(itemobj) {
      const { runCount } = itemobj.runCount || {}
      const countdown = (runCount || 3) * 1000
      itemobj.stateDesc = '<a-icon type="loading" />文件读取中'
      // console.log(itemobj)
      // for (let j = 0; j < this.mulCheckId.length; j++) {
      setTimeout(() => {
        this.testingProcessMobile(countdown, itemobj, itemobj.uploadobj.data)
      }, countdown)
      // }
    },
    // 批量 200进行中，999979已完成
    testingProcessMobile(countdown, itemobj, id) {
      const testForm = new FormData()
      testForm.append('fileId', id)
      this.$http
        .post('/front/empty/getTestProcessMobile', testForm)
        .then((res) => {
          // console.log(res)
          // debugger
          if (res.data.code === 200) {
            // 检测中
            const { testCounts = '36', fileCounts } = res.data.data || {}
            if (testCounts === '36') {
              itemobj.stateDesc =
                '<a-icon type="loading" />准备检测<label>0%</label>'
              itemobj.progressVal = 0
            } else {
              if (testCounts === fileCounts) {
                itemobj.stateDesc =
                  '<a-icon type="loading" />解析中<label>100%</label>'
                itemobj.progressVal = 100
              } else {
                const testingScale = parseInt(
                  (Number(testCounts) / (Number(fileCounts) || 1)) * 100
                )
                itemobj.stateDesc =
                  '<a-icon type="loading" />正在检测<label>' +
                  testingScale +
                  '%</label>'
                itemobj.progressVal = testingScale
              }
            }
            itemobj.mobileobj = { testCounts, fileCounts }
            setTimeout(() => {
              this.testingProcessMobile(countdown, itemobj, id)
            }, countdown)
          } else if (res.data.code === 999979) {
            // 检测完成
            itemobj.checkval = 4
            itemobj.stateDesc =
              '<span style="color: #19be6b">检测已完成<i class="el-icon-success"></i></span>'
            this.handeldone()
          } else {
            // 检测失败
            itemobj.checkval = 1
            itemobj.stateDesc = `<span style='color: #F56C6C'>${res.data.msg}</span>`
            this.handeldone()
          }
        })
        .catch(() => {
          itemobj.checkval = 1
          itemobj.stateDesc = '<span style="color: #F56C6C">检测失败</span>'
          this.handeldone()
        })
    },
    // 关闭文件预览页面
    handeldone() {
      const resbool = this.mulFileList.every((item) => {
        return item.checkval === 1 || item.checkval === 4
      })
      if (resbool) {
        // debugger
        this.minshow = false
        // this.dialogVisible = false
        ss.remove('TestingList')
        this.mulStepOver = true
        this.$emit('testSuccess')
      }
    },
    mulStepOverClick() {
      this.mulStepOver = false
      this.dialogVisible = false
      this.mulFileList = []
      this.mulStepIndex = 1
    }
  },
  beforeDestroy() {
    clearTimeout(this.timersecond)
    clearInterval(this.timersecond)
    window.removeEventListener('beforeunload', this.beforeunloadHandler, true)
  }
}
</script>

<style lang="scss">
.empty-test {
  min-height: 100px;
  position: relative;
}
.file-box {
  height: 50px;
  background-color: #fff;
  position: relative;
  width: 650px;
  padding: 1px;
  display: flex;
  .file-input {
    float: left;
    line-height: 50px;
    padding: 0px 20px;
    color: #848a9f;
    width: 500px;
    border: 1px solid #e4e8eb;
  }

  .file-butt {
    float: right;
    min-width: 140px;
    height: 50px;
    color: #fff;
    font-size: 16px;
    line-height: 50px;
    cursor: pointer;
    width: 150px;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }

  .file-butt-select {
    background-color: #6799ee;
  }
}

.file-butt-choose {
  position: absolute;
  right: 1px;
  top: 50px;
  height: 80px;
  padding: 0;
  // background-color: white;
  width: 140px;
  ul {
    margin: 0;
    padding: 0;
    height: 80px;
    width: 140px;
    margin-left: 10px;
    background-color: white;
    li {
      color: #585f68;
      height: 40px;
      line-height: 40px;
      list-style: none;
      border: 1px solid #e4e8eb;
      &:first-child {
        border-bottom: none;
      }
    }
  }
}

.file-butt-layouts {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    animation: rotate 1s linear infinite;
  }
  background-color: #999;
}

.handle-regin {
  width: 513px;
  margin-top: 12px;

  .upload-test-wrap {
    display: flex;
    flex-direction: row;
    background-color: #f8f9fb;
    padding: 12px 25px;
    border-radius: 3px;
    justify-content: space-between;
    &-txt {
      display: flex;
      div {
        margin-left: 5px;
        height: 30px;
        line-height: 30px;
        p {
          color: #19be6b;
        }
        span {
          color: #b5b8c9;
        }
      }
    }
    .el-button {
      transition: all 0.3s;
      padding: 10px 16px;
      font-size: 14px;
      border-radius: 4px;
      color: #84899f;

      &:hover {
        color: #333;
        background-color: #fff;
      }
    }
  }
}
.file-hidden {
  display: none;
}
.dialog-reset {
  // border: 1px solid #273b87;
  // background-color: #09102c;
  // box-shadow: 0px 0px 5px #273b87;
  border: 1px solid #fff;
  background-color: #fff;
}

.dialog-loading {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    p {
      color: #606266;
      font-size: 16px;
      margin-top: 15px;
    }

    img {
      animation: rotate 1s linear infinite;
    }

    text-align: center;
    padding: 30px;
  }
}

.dialog-conduct {
  .el-dialog__header {
    span {
      color: #606266;
      font-size: 26px;
    }

    text-align: center;
  }

  .el-dialog__body {
    padding: 20px 20px 30px;
  }
}

.dialog-suspend {
  .el-dialog__header {
    span {
      color: #606266;
      font-size: 16px;
    }
  }

  .text-desc {
    color: #606266;
    font-size: 16px;
  }
}

.dialog-success {
  text-align: center;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    p {
      margin-top: 30px;
      margin-bottom: 25px;
    }
    .txt {
      color: #606266;
      font-size: 16px;
    }
  }
  h3 {
    color: #d9e3f8;
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 25px;
  }

  h4 {
    margin-bottom: 10px;
    color: #606266;

    a {
      color: #f7bd7f;
      cursor: pointer;
    }

    span {
      color: #f55f6a;
    }
  }
}

.conduct-scaling {
  margin-top: 15px;
  text-align: center;

  span {
    margin-right: 8px;
  }
}

.dialog-batch {
  border: 1px solid #fff;
  background-color: #fff;
  .el-dialog__header {
    span {
      color: #606266;
      font-size: 20px;
    }
    text-align: center;
  }
  .el-dialog__body {
    min-height: 400px;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    .file-select {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 68px;
      .list2 {
        h3 {
          margin: 0;
          font-weight: normal;
        }
      }
      .list3 {
        display: flex;
        justify-content: center;
        .el-icon-error {
          font-size: 25px;
          color: rgb(209, 213, 223);
          margin-left: 25px;
          cursor: pointer;
        }
      }
    }
  }
}

.dialog-confirm {
  border: 1px solid #fff;
  background-color: #fff;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    text-align: center;
    padding: 30px !important;
    p {
      color: #606266;
      font-size: 16px;
      line-height: 28px;
      padding-bottom: 50px;
    }
    .el-button {
      color: #fff;
      margin: 0px 20px;
      padding: 10px 40px;
      border-color: #6799ee;
      background-color: #6799ee;
    }
  }
}

.add-file {
  text-align: right;
  margin-top: 20px;
  padding: 0px 20px;
  .el-button {
    color: #606266;
    border-color: #e4e8eb;
    background-color: transparent;
  }
}

.upload-file {
  margin-top: 15px;
  text-align: center;
  p {
    color: #b5b8c9;
    margin: 20px 0;
  }
  .el-button {
    color: #fff;
    padding: 10px 40px;
    border-color: #6799ee;
    background-color: #6799ee;
  }
}

.el-progress-bar__outer {
  background-color: rgb(229, 238, 255);
  height: 12px !important;
}

.vue-scroll {
  max-height: 360px;
  overflow-y: scroll;
  padding-right: 20px;
}
.file-hidden {
  display: none;
}
::-webkit-scrollbar {
  width: 5px;
}
// ::-webkit-scrollbar-button {
//   background-color: #ccc;
// }
// ::-webkit-scrollbar-track {
//   background: #ccc;
// }
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.conduct-order {
  li {
    width: 33.33%;
    font-size: 12px;
    line-height: 14px;
    padding: 3px 60px;
    display: inline-block;

    i {
      float: right;
    }

    &.red {
      color: #f55f6a;
    }

    &.blue {
      color: #4b92ff;
    }

    &.gray {
      color: #888888;
    }

    &.yellow {
      color: #f3bb02;
    }
  }

  font-size: 0px;
  margin-top: 30px;
}

.conduct-remarks {
  color: #606266;
  text-align: center;
  margin-top: 30px;
}

.clock {
  border-radius: 60px;
  border: 3px solid #fff;
  height: 80px;
  width: 80px;
  position: relative;
}

.clock:after {
  content: '';
  position: absolute;
  background-color: #fff;
  top: 2px;
  left: 48%;
  height: 38px;
  width: 4px;
  border-radius: 5px;
  transform-origin: 50% 97%;
  animation: grdAiguille 2s linear infinite;
}

@keyframes grdAiguille {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.clock:before {
  content: '';
  position: absolute;
  background-color: #fff;
  top: 6px;
  left: 48%;
  height: 35px;
  width: 4px;
  border-radius: 5px;
  transform-origin: 50% 94%;
  animation: ptAiguille 12s linear infinite;
}

@keyframes ptAiguille {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-regin {
  .loading1 {
    width: 148px;
    height: 148px;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 148px;
    border-radius: 124px;
    margin: 16px 16px;
    background-color: rgba(17, 62, 169, 0.4);
    background-image: url(/image/water.png);
    background-repeat: repeat-x;
    background-position-y: 138px;
    animation: water 2s linear infinite;
    transition: all 1s linear;
    display: inline-block;
  }

  .loading2 {
    top: 0px;
    width: 180px;
    height: 180px;
    overflow: hidden;
    position: absolute;
    animation: rotate 1s linear infinite;
  }

  .loading3 {
    top: 0px;
    width: 180px;
    height: 180px;
    overflow: hidden;
    position: absolute;
    animation: rotate 1.5s linear infinite;
  }

  .loading4 {
    top: 0px;
    width: 180px;
    height: 180px;
    overflow: hidden;
    position: absolute;
    animation: rotate 2s linear infinite;
  }

  width: 180px;
  height: 180px;
  position: relative;
  margin: 0px auto;
}

@keyframes water {
  from {
    background-position-x: 0;
  }

  to {
    background-position-x: -180px;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
