<template>
  <div class="match">
    <el-row :span="24">
      <div class="product-title">
        <div class="i-title">
          <img src="../assets/img/号码匹配.png" />
          <div class="title">原文件匹配</div>
        </div>
      </div>
    </el-row>
    <el-card>
      <el-row>
        <!-- <el-col :span="24">
          <div class="number-title">
            <div class="i-title">
              <img src="../assets/img/号码匹配.png" />
              <div class="title">原文件匹配</div>
            </div>
          </div>
        </el-col> -->
        <el-col :span="24" :offset="2">
          <el-row>
            <div placement="right" width="160" trigger="hover">
              <!-- <div>
                <p>excel: 至少1-300W条</p>
              </div> -->
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
                  <uploader-btn
                    :attrs="attrs1"
                    single
                    class="upload_button el-button el-button--primary"
                    type="primary"
                    >浏览</uploader-btn
                  >
                  <uploader-list></uploader-list>
                </uploader>
              </div>
            </div>
          </el-row>
          <el-row>
            <p class="gray" style="margin-bottom: 15px">
              注:支持2003版本的excel(.xls)和.csv文件/文件大小最大为15M
            </p>
          </el-row>
          <el-row>
            <div placement="right" width="160" trigger="hover">
              <!-- <div>
                <p>txt: 至少1-300W条</p>
              </div> -->
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
                  <uploader-btn
                    :attrs="attrs2"
                    single
                    class="upload_button el-button el-button--primary"
                    type="primary"
                    >浏览</uploader-btn
                  >
                  <uploader-list></uploader-list>
                </uploader>
              </div>
            </div>
          </el-row>
          <el-row>
            <p class="gray">注:只支持txt文件（一行一个号码）/文件大小最大15M</p>
          </el-row>
          <el-row class="but_box">
            <el-col
              :span="8"
              :offset="offset"
              style="display: flex; flex-direction: row"
            >
              <el-button
                type="success"
                @click="matchNow"
                class="button"
                :disabled="hideMatch"
                >立即匹配</el-button
              >
              <el-button
                type="success"
                v-if="downloadObj.fileAccessPath"
                style="margin: 0 40px"
                class="button"
              >
                <a
                  :href="this.downloadDomain + downloadObj.fileAccessPath"
                  style="text-decoration: none; color: #fff"
                  >立即下载</a
                >
              </el-button>
            </el-col>
            <el-col :span="24" class="matchTip">
              <!-- <p style="margin-bottom: 10px; font-weight: bold">
                检测结果需要匹配哪个文件上传哪个文件
              </p>
              <p style="margin-bottom: 5px; font-weight: bold">检测结果：</p>
              <p style="margin-bottom: 5px">
                已匹配，后缀是已匹配的号码是指您提交匹配的那个文档对应的号码
              </p>
              <p style="margin-bottom: 5px; color: #b5b8c9">
                例：您的原始表格和活跃号匹配完，已匹配号码是指的活跃号
              </p>
              <p style="margin-bottom: 5px">
                末找到：是除了您匹配的包的剩余的三个包的号码
              </p>
              <p style="color: #b5b8c9">
                例：您的原始表格和活跃号匹配完，末找到号码是指：沉默号、风险号、空号三个包）
              </p> -->
              <p style="margin-bottom: 5px">
                该功能可将检测后的号码文件（txt格式）跟原始数据文件（xls、csv格式）中相匹配的号码数据列标注出来（以txt文件名称标记）
              </p>
              <p style="color: #b5b8c9">
                例：您的原始表格和活跃号匹配完，检测结果就会标注为活跃号
              </p>
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
        target: `${this.$http.defaults.baseURL}front/customer/uploadMatching`,
        testChunks: false, // 是否开启服务器分片校验
        chunkSize: 524288, // 512kb
        simultaneousUploads: 10, // 并发上传数
        maxChunkRetries: 10, // 最大自动失败重试上传次数
        headers: {
          token: ss.get('token')
        },
        query: {
          // customerId: '',
          // taskId: '',
          // fileRealName: ''
        },
        processParams(params) {
          // console.log(params)
          return {
            customerId: JSON.parse(ss.get('customer')).id,
            chunkNumber: params.chunkNumber - 1,
            chunkSize: params.chunkSize,
            totalChunks: params.totalChunks,
            identifier: params.identifier,
            fileRealName: params.filename
          }
        }
      },
      isUploadOk1: false, // 是否还有未上传完成的文件
      isUploadOk2: false,
      attrs1: {
        accept: '.xls, .csv'
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
      downloadObj: {},
      md5Excel: '',
      md5Txt: '',
      hideMatch: false
    }
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get('front/personal/personalInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.personalInfo = data.data
    },
    filesAdded1(file) {
      this.hideMatch = false
      file.pause()
      // 文件类型限制
      const types = file.name.substring(file.name.lastIndexOf('.') + 1)
      const fileType = ['xls', 'csv'].some((item) => {
        return item === types
      })
      if (!fileType) {
        this.$message.error('文件格式错误，请重新选择文件！')
        file.ignored = true // 文件过滤
        file.cancel()
        return
      }
      // 文件大小限制
      const maxSize = 1024 * 1024 * 15
      if (file.size > maxSize) {
        this.$message.error('文件大小最大为15M')
        file.ignored = true // 文件过滤
        file.cancel()
        return
      }
      if (file.size === 0) {
        this.$message.error('上传文件有误，请重新上传')
        file.ignored = true // 文件过滤
        file.cancel()
        return
      }
      if (JSON.stringify(this.excelFile) !== '{}') {
        this.$message.error('仅支持上传一个文件')
        file.ignored = true // 文件过滤
        file.cancel()
        return
      }
      file.resume()
      this.excelFile = file
      this.computeMD5(file)
    },
    filesAdded2(file) {
      this.hideMatch = false
      file.pause()
      // 文件类型限制
      const types = file.name.substring(file.name.lastIndexOf('.') + 1)
      const fileType = ['txt'].some((item) => {
        return item === types
      })
      if (!fileType) {
        this.$message.error('文件格式错误，请重新选择文件！')
        file.ignored = true // 文件过滤
        file.cancel()
        return
      }
      // 文件大小限制
      const maxSize = 1024 * 1024 * 15
      if (file.size > maxSize) {
        this.$message.error('文件大小最大为15M')
        file.ignored = true // 文件过滤
        file.cancel()
        return
      }
      if (file.size === 0) {
        this.$message.error('上传文件有误，请重新上传')
        file.ignored = true // 文件过滤
        file.cancel()
        return
      }
      if (JSON.stringify(this.txtFile) !== '{}') {
        this.$message.error('仅支持上传一个文件')
        file.ignored = true // 文件过滤
        file.cancel()
        return
      }
      file.resume()
      this.txtFile = file
      this.computeMD5(file)
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
      if (!this.excelFile.id) {
        return this.$message.error('请先选择需要上传的excel文件')
      }
      if (!this.txtFile.id) {
        return this.$message.error('请先选择需要上传的txt文件')
      }
      if (!this.isUploadOk1 || !this.isUploadOk2) {
        return this.$message.error('请等待文件上传完毕在进行匹配！')
      }
      // loading效果
      const loading = this.$loading({
        lock: true,
        text: '正在匹配，请稍等...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      // 合并文件-excel文件
      if (this.excelFile.id) {
        let excelForm = new FormData()
        // console.log(this.excelFile)
        const chunks = Math.floor(
          this.excelFile.size < this.options.chunkSize
            ? 1
            : this.excelFile.size / this.options.chunkSize
        )
        excelForm.append('md5', this.excelFile.uniqueIdentifier)
        excelForm.append('chunks', chunks)
        excelForm.append('fileName', this.excelFile.name)
        excelForm.append('fileSize', this.excelFile.size)
        const { data } = await this.$http.post(
          'front/customer/mergeFileMatching',
          excelForm
        )
        if (data.code === 200) {
          this.md5Excel = data.data.md5Name
          this.downloadMatchingFile(loading)
        } else {
          this.$message.error(data.msg)
          loading.close()
        }
      }

      // 合并文件-txt文件
      if (this.txtFile.id) {
        let txtForm = new FormData()
        // console.log(this.txtFile)
        const chunks = Math.floor(
          this.txtFile.size < this.options.chunkSize
            ? 1
            : this.txtFile.size / this.options.chunkSize
        )
        txtForm.append('md5', this.txtFile.uniqueIdentifier)
        txtForm.append('chunks', chunks)
        txtForm.append('fileName', this.txtFile.name)
        txtForm.append('fileSize', this.txtFile.size)
        const { data } = await this.$http.post(
          'front/customer/mergeFileMatching',
          txtForm
        )
        if (data.code === 200) {
          this.md5Txt = data.data.md5Name
          this.downloadMatchingFile(loading)
        } else {
          this.$message.error(data.msg)
          loading.close()
        }
      }
    },
    async downloadMatchingFile(loading) {
      if (this.md5Excel !== '' && this.md5Txt !== '') {
        let obj = {
          customerId: JSON.parse(ss.get('customer')).id,
          md5Excel: this.md5Excel,
          md5Txt: this.md5Txt,
          nameExcel: this.excelFile.name,
          nameTxt: this.txtFile.name
        }
        await this.$http
          .post('front/customer/downloadMatchingFile', obj)
          .then((res) => {
            // debugger
            if (res.data.code !== 200) return this.$message.error(res.data.msg)
            loading.close()
            this.downloadObj = res.data.data
            this.offset = 3
            this.$message.success('匹配成功！')
            this.hideMatch = true
            this.reset()
          })
          .catch((e) => {
            this.$message.error('请求超时，请重试！')
          })
      }
    },
    reset() {
      this.md5Excel = ''
      this.md5Txt = ''
    },
    download() {
      // let url = `${this.$http.defaults.baseURL}${this.downloadObj.fileAccessPath}`
      // window.open(url)
    }
  },
  mounted() {
    this.getData()
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
      width: 26px;
      height: 26px;
      border-radius: 50%;
    }
    .title {
      font-size: 16px;
      color: #7f859f;
    }
  }
}
.el-card {
  // height: 89vh;
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
        color: #f56c6c;
      }
      .error {
        color: #67c23a;
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
.matchTip {
  margin-top: 40px;
  font-size: 14px;
}
</style>
