<template>
  <div class="match">
    <el-card>
      <el-row>
        <el-col :span="24" >
          <div class="number-title">
            <div class="i-title">
              <img src="../assets/img/号码匹配.png">
              <div class="title">号码匹配</div>
            </div>
          </div>
        </el-col>
        <el-col :span="24" :offset="2">
          <el-row>
            <el-popover placement="right" width="160" trigger="hover">
              <div>
                <p>excel: 至少1-150w条</p>
              </div>
              <div class="upload" slot="reference">
                <div class="upload_div">请上传文件进行检测</div>
                <uploader
                  ref="uploader"
                  class="upload-demo"
                  :options="options"
                  :fileStatusText="fileStatusText"
                  autoStart
                  @file-added="filesAdded1"
                  @file-success="success_txt1"
                  @file-removed="beforeRemove1"
                >
                  <uploader-btn :attrs="attrs1" single class="upload_button el-button el-button--primary" type="primary">浏览</uploader-btn>
                  <uploader-list></uploader-list>
                </uploader>
              </div>
            </el-popover>
          </el-row>
          <el-row>
            <p class="gray" style="margin-bottom:15px;">注:后缀必须是XLSX。如不是此格式的表格可以在excel里打开文件 左上角文件另存为xlsx格式。</p>
          </el-row>
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
                  @file-added="filesAdded2"
                  @file-success="success_txt2"
                  @file-removed="beforeRemove2"
                >
                  <uploader-btn :attrs="attrs2" single class="upload_button el-button el-button--primary" type="primary">浏览</uploader-btn>
                  <uploader-list></uploader-list>
                </uploader>
              </div>
            </el-popover>
          </el-row>
          <el-row>
            <p class="gray">注:只支持TXT文件（一行一个号码）</p>
          </el-row>
          <el-row class="but_box">
            <el-col :span="8" :offset="offset">
              <el-button type="success" @click="matchNow" class="button">立即匹配</el-button>
              <el-button type="success" @click="download" v-if="downloadObj.fileAccessPath" style="margin: 0 40px;" class="button">立即下载</el-button>
            </el-col>
            <el-col :span="24" class="matchTip">
              <p style="margin-bottom:10px;font-weight:bold;">检测结果需要匹配哪个文件上传哪个文件</p>
              <p style="margin-bottom:5px;font-weight:bold;">检测结果：</p>
              <p style="margin-bottom:5px;">已匹配，后缀是已匹配的号码是指您提交匹配的那个文档对应的号码</p>
              <p style="margin-bottom:5px; color: #b5b8c9;">例：您的原始表格和活跃号匹配完，已匹配号码是指的活跃号</p>
              <p style="margin-bottom:5px;">末找到：是除了您匹配的包的剩余的三个包的号码</p>
              <p style="color: #b5b8c9;">例：您的原始表格和活跃号匹配完，末找到号码是指：沉默号、风险号、空号三个包）</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { ss } from '../utils/storage'
import SparkMD5 from 'spark-md5'

export default {
  data() {
    return {
      personalInfo: {},
      options: {
        target: `${this.$http.defaults.baseURL}front/chunk/chunkUpload`,
        testChunks: false, // 是否开启服务器分片校验
        chunkSize: 2048000, // 512kb
        simultaneousUploads: 10, // 并发上传数
        maxChunkRetries: 10, // 最大自动失败重试上传次数
        headers: {
          token: ss.get('token')
        },
        query: {
          customerId: '',
          taskId: ''
        }
      },
      isUploadOk1: false, // 是否还有未上传完成的文件
      isUploadOk2: false,
      attrs1: {
        accept: '.xlsx'
      },
      attrs2: {
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
      offset: 4, // 偏移量
      excelFile: {},
      txtFile: {},
      downloadObj: {}
    }
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get('front/personal/personalInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.personalInfo = data.data
    },
    filesAdded1(file) {
      this.options.query.customerId = JSON.parse(ss.get('customer')).id
      this.options.query.taskId = file.id
      this.excelFile = file
      this.computeMD5(file)
    },
    filesAdded2(file) {
      this.options.query.customerId = JSON.parse(ss.get('customer')).id
      this.options.query.taskId = file.id
      this.txtFile = file
      this.computeMD5(file)
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
    beforeRemove1(file) {
      this.isUploadOk1 = false
      this.excelFile = {}
    },
    beforeRemove2(file) {
      this.isUploadOk2 = false
      this.txtFile = {}
    },
    // 上传成功触发
    success_txt1(rootFile, file, response, chunk) {
      let _response = JSON.parse(response)
      if (_response.code === 200) {
        this.isUploadOk1 = true
      } else {
        this.$message.error(_response.msg)
        this.isUploadOk1 = false
        return false
      }
    },
    success_txt2(rootFile, file, response, chunk) {
      let _response = JSON.parse(response)
      if (_response.code === 200) {
        this.isUploadOk2 = true
      } else {
        this.$message.error(_response.msg)
        this.isUploadOk2 = false
        return false
      }
    },
    // 开始匹配
    async matchNow() {
      if (!this.excelFile.id) return this.$message.error('请先选择需要上传的excel文件')
      if (!this.txtFile.id) return this.$message.error('请先选择需要上传的txt文件')
      if (!this.isUploadOk1 || !this.isUploadOk2) return this.$message.error('请等待文件上传完毕在进行匹配！')
      // loading效果
      const loading = this.$loading({
        lock: true,
        text: '正在匹配，请稍等...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let obj = {
        customerId: JSON.parse(ss.get('customer')).id,
        md5Excel: this.excelFile.uniqueIdentifier,
        md5Txt: this.txtFile.uniqueIdentifier,
        nameExcel: this.excelFile.name,
        nameTxt: this.txtFile.name
      }
      const { data } = await this.$http.post('front/customer/v2/downloadMatchingFile', obj)
      if (data.code !== 200) return this.$message.error(data.msg)
      loading.close()
      this.downloadObj = data.data
      this.offset = 3
      this.$message.success('匹配成功！')
    },
    download() {
      let url = `${this.$http.defaults.baseURL}${this.downloadObj.fileAccessPath}`
      window.open(url)
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.el-card {
  height: 89vh;
  .number-title {
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
      line-height: 28PX;
      img {
        margin-right: 10px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
      .title {
        font-size: 16px;
        color: #7f859f
      }
    }
  }
  .upload {
    display: flex;
    padding: 1px;
    width: 650px;
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
  .btn-box {
    width: 750px;
    margin-top: 12px;
    text-align: center;
    .result {
      width: 750px;
      display: flex;
      justify-content: space-between;
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
  .gray {
    color: #b5b8c9;
    margin-bottom: 0;
    margin-top: 15px;
  }
  .but_box {
    margin: 30px auto;
  }
}
</style>

<style>
.match .el-upload-list__item {
  width: 500%;
  margin-left: -600px;
}
.match .uploader-file {
  height: 30px;
  line-height: 30px;
  margin-top: 4px;
  width: 433%;
  margin-left: -500px;
}
.match .uploader-file-icon {
  margin-top: 4px;
}
.match .uploader-file-actions > span {
  margin-top: 6px;
}
.uploader-file-remove {
  display: block !important;
}
.match .el-icon-loading {
  font-size: 20px;
  margin: 10px 0;
}
.matchTip{
  margin-top: 40px;
  font-size: 14px;
}
</style>
