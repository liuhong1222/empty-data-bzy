<template>
  <section>
    <div class="international-test" ref="fixedView">
      <el-select
        v-model="countryCodeValue"
        placeholder="请选择国码（必选）"
        class="country-code"
      >
        <el-option
          v-for="item in countryCodeList"
          :key="item.countryCode"
          :label="item.countryCode"
          :value="item.countryCode"
        >
        </el-option>
      </el-select>
      <section class="body-regin">
        <div class="center-box">
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
              @click="browseButt($event, 'internationalSinglefile')"
            >
              浏览
            </div>
          </div>
          <div if="stepIndex > 0" class="international-handle-regin">
            <el-progress
              v-if="stepIndex == 2"
              :text-inside="true"
              :stroke-width="18"
              :percentage="singleProgressVal"
              style="height: 5px; width: 650px"
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
      </section>
      <form ref="formelem" id="formelem">
        <input
          class="file-hidden"
          name="empty"
          ref="internationalSinglefile"
          id="internationalSinglefile"
          type="file"
          accept="text/plain,application/vnd.ms-excel"
          @change="singlefilePreview($event)"
        />
      </form>
    </div>
    <!-- 单文件分片上传弹窗 -->
    <el-dialog
      width="300px"
      top="30vh"
      custom-class="dialog-reset dialog-loading"
      :show-close="false"
      :visible="isUploadShow"
      append-to-body
    >
      <img height="30" src="../assets/img/loading.png" />
      <p>{{ uploadCompleted }}</p>
    </el-dialog>
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
        <span>实时检测</span>
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
  </section>
</template>

<script>
import { ss } from '../utils/storage'
import { uploadByPieces } from '../utils/uploadByPieces'
export default {
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
      fileObj: {},
      fileRows: 0, // 条数
      fileInfObj: {
        id: null,
        minshow: false
      },
      stepIndex: 0,
      singleProgressVal: 0,
      dialogIndex: 0, // dialog状态
      mobileObj: {
        // 循环检测结果
        fileCounts: 0,
        testCounts: 0,
        mobileList: [],
        stateDesc: ''
      },
      countDown: 10, // 完成10秒倒计时
      timersecond: null, // 倒计时对象
      fileBtnShow: false, // 是否展示可选上传按钮
      checkList: [],
      fileObjList: [], // 所有上传文件对象
      isUploadShow: false, // 分片上传弹窗
      uploadCompleted: '文件上传中，请勿离开...', // 分片上传进度
      checkId: '', // 文件检测id（唯一id）
      countryCodeList: [], // 国码下拉框数据
      countryCodeValue: undefined // 选中的国码
    }
  },
  head() {
    return { title: '实时查询' }
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
  mounted() {
    try {
      const internationalTestingID = ss.get('internationalTestingID')
      const internationalTestingRows = ss.get('internationalTestingRows')
      if (internationalTestingID) {
        this.fileInfObj = { id: internationalTestingID, minshow: true }
        this.getTestProcessMobile('fromMounted')
      }
      if (internationalTestingRows) {
        this.fileRows = internationalTestingRows
      }
    } catch (err) {
      this.fileInfObj = {
        id: null,
        minshow: false
      }
      ss.remove('internationalTestingID')
    }
  },
  methods: {
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
    // 点击预览
    async browseButt(event, dom) {
      // 判断是否登录
      if (!ss.get('token')) {
        event.preventDefault()
        this.$message.error('token已过期，请重新登录')
        return
      }

      if (!this.countryCodeValue) {
        event.preventDefault()
        this.$message.error('请先选择国码')
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
                balance: this.personalInfo.internationalBalance
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
          !this.personalInfo.internationalBalance ||
          this.personalInfo.internationalBalance === '0'
        ) {
          this.$message.error('余额不足')
          return
        }
        document.getElementById(dom).click()
      }
    },
    // 验证预览文件1:点击上传 2：显示进度 3：立即检测
    // 单文件上传
    singlefilePreview({ target }) {
      const file = target.files[0]
      if (file.size === 0) {
        this.$message.error('上传文件有误，请重新上传！')
        this.$refs.internationalSingleFile.value = ''
        return
      }
      if (file) {
        if (file.name.substr(-4) !== '.txt') {
          this.$message.warning('仅支持txt文件')
          this.$refs.internationalSingleFile.value = ''
        } else if (file.size >= 31457280) {
          this.$message.warning('文件大小不能超过30M')
          this.$refs.internationalSingleFile.value = ''
        } else {
          this.fileObj = file || {}
          // debugger
          this.uploadAxios(file)
        }
      }
    },
    // 文件上传Ajax
    uploadAxios(file) {
      // 获取所有上传文件
      this.fileObjList = [file]
      // console.log(this.fileObjList)
      this.fileObjList = this.fileObjList.map((v) => {
        v.status = '1'
        return v
      })
      // 分片上传
      this.processButtonClick(this.fileObjList, 0)
    },
    // 验证检测
    clickTesting() {
      // 从后台拿到的上传条数
      // debugger
      // if (this.fileInfObj.fileRows <= 3000) { // 接口没有返条数
      //   this.$message.warning('对不起，实时查询类业务最低检测条数为3001条')
      // } else {
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
      // }
    },
    // 准备检测数据
    testingAxios() {
      const testForm = new FormData()
      testForm.append('fileId', this.checkId)
      this.$http
        .post('/front/international/internationalCheckByFile', testForm)
        .then((res) => {
          if (res.data.code === 200) {
            // 请求成功，关闭定时器
            clearInterval(this.timersecond)
            this.testingSuccess(res.data.data.runCount)
            // console.log(res.data.code)
            ss.set('internationalTestingID', res.data.data.code)
            ss.set('internationalTestingRows', this.fileRows)
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
      // console.log(runCount)
      this.timersecond = setInterval(() => {
        runCount--
        if (runCount <= 0) {
          this.dialogIndex = 2
          this.getTestProcessMobile()
          this.fileInfObj.minshow = true
          clearInterval(this.timersecond)
        }
      }, 1000)
    },
    //  200进行中，999979已完成
    getTestProcessMobile(type) {
      const testForm = new FormData()
      testForm.append(
        'fileId',
        this.checkId || ss.get('internationalTestingID')
      )
      this.$http
        .post('/front/international/getTestProcessMobile', testForm)
        .then((res) => {
          // console.log(res)
          // debugger
          if (res.data.code === 200) {
            // 检测中
            const { testCounts = '36', fileCounts } = res.data.data || {}
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
            // debugger
            // 检测完成
            this.fileInfObj = {}
            // this.dialogIndex = 4
            ss.remove('internationalTestingID')
            ss.remove('internationalTestingRows')
            this.handleDoneDown(type)
          } else {
            // 检测失败
            this.dialogIndex = 0
            this.$message.warning(res.data.msg)
            ss.remove('internationalTestingID')
            ss.remove('internationalTestingRows')
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
      // debugger
      this.resetFrom()
      // 获取最新数据
      this.$emit('testSuccess')
      // }
      // }, 1000)
    },
    goto(path) {
      this.$router.push({
        path: path,
        name: 'testrecord',
        params: { fromInternational: true }
      })
    },
    // 重置文件选择
    resetFrom() {
      this.fileObj = {}
      this.stepIndex = 0
      document.getElementById('formelem').reset()
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
        productCodeType: 'international', // 0-空号检测  1-实时检测
        success: (data) => {
          console.log('文件上传成功--------' + data)
          if (data.code === 200) {
            this.isUploadShow = false
            this.$message.success('文件上传成功')
            this.stepIndex = 3 // 立即检测
            this.checkId = data.data
            this.checkList.push(data.data)
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
          // if (completed.indexOf('%') === -1) {
          //   this.uploadCompleted = completed
          // }
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
          this.resetFrom()
        }
      })
      if (index >= formData.length - 1) {
      } else {
        setTimeout(() => {
          this.processButtonClick(formData, index + 1)
        }, 500)
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.timersecond)
    clearInterval(this.timersecond)
  }
}
</script>

<style lang="scss">
.international-test {
  min-height: 100px;
  position: relative;
  .country-code {
    width: 650px;
    height: 50px;
    margin-bottom: 16px;
    .el-input--suffix .el-input__inner {
      height: 50px;
      border-radius: 0;
    }
  }
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

  .file-butt-layouts {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      animation: rotate 1s linear infinite;
    }
    background-color: #999;
  }
}
.international-handle-regin {
  padding-top: 15px;
  width: 650px;

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
    color: #606266;
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
