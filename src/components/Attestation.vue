<template>
  <div class="attest">
    <el-card>
      <el-row>
        <el-col :span="24">
          <div class="safety-title">
            <div class="i-title">
              <img src="../assets/img/个人中心.png" />
              <div class="title">认证中心</div>
            </div>
          </div>
        </el-col>
        <el-col :span="10" :offset="2" v-show="complete == false">
          <el-form
            :model="AttestationForm"
            :rules="Rrules"
            ref="AttestationFormRef"
            label-width="120px"
            label-position="left"
          >
            <el-form-item label="认证类型">
              <div slot="label" style="margin-left: 10px">认证类型</div>
              <el-radio-group v-model="personalInfo.customerType">
                <el-radio :label="9" v-if="personalInfo.customerType === 9"
                  >企业认证</el-radio
                >
                <el-radio
                  :label="1"
                  v-if="
                    personalInfo.customerType === 1 ||
                    personalInfo.customerType === 0
                  "
                  >企业认证</el-radio
                >
                <el-radio :label="0">个人认证</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 企业 -->
            <div
              v-if="
                personalInfo.customerType == 1 || personalInfo.customerType == 9
              "
            >
              <el-form-item label="营业执照" prop="businessLicensePath">
                <el-upload
                  :class="{ disabled: uploadDisabled }"
                  ref="yyzzUpload"
                  :multiple="false"
                  action=""
                  accept=".jpg,.jpeg,.png"
                  :auto-upload="false"
                  :file-list="imagelist"
                  list-type="picture-card"
                  :on-change="codeChange1"
                >
                  <!-- <img :size="103" class="avatar" v-if="AttestationForm.businessLicensePath" :src="AttestationForm.businessLicensePath" /> -->
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{ file }">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-show="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                  <div slot="tip" class="el-upload__tip">
                    <p><strong>营业执照上传后，以下内容可自动识别</strong></p>
                    <p>格式要求：扫描件需要使用jpg,jpeg,png图片格式</p>
                    <p>内容要求：上传营业执照正面</p>
                    <p>大小要求：不得超过5M</p>
                  </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </el-form-item>
              <el-form-item label="公司名称" prop="companyName">
                <el-input
                  v-model="AttestationForm.companyName"
                  @input="updateView($event)"
                ></el-input>
              </el-form-item>
              <el-form-item label="营业执照号" prop="businessLicenseNumber">
                <el-input
                  v-model="AttestationForm.businessLicenseNumber"
                  @input="updateView($event)"
                ></el-input>
              </el-form-item>
              <el-form-item label="公司地址" prop="companyAddress">
                <el-input
                  type="textarea"
                  v-model="AttestationForm.companyAddress"
                  @input="updateView($event)"
                ></el-input>
              </el-form-item>
              <el-form-item label="法人名称" prop="legalPerson">
                <el-input
                  v-model="AttestationForm.legalPerson"
                  @input="updateView($event)"
                ></el-input>
              </el-form-item>
              <el-form-item label="营业期限">
                <div slot="label" style="margin-left: 10px">营业期限</div>
                <el-date-picker
                  v-model="timer"
                  type="daterange"
                  businessScope-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  class="picker"
                  style="width: 95%"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="经营范围" prop="businessScope">
                <el-input
                  v-model="AttestationForm.businessScope"
                  type="textarea"
                  rows="5"
                  @input="updateView($event)"
                ></el-input>
              </el-form-item>
              <el-form-item style="display: block">
                <el-button
                  :loading="btnLoading"
                  type="primary"
                  @click="submitForm(1)"
                  class="button"
                  >提交认证</el-button
                >
              </el-form-item>
            </div>
            <!-- 个人 -->
            <div v-if="personalInfo.customerType == 0">
              <el-form-item
                label="身份证人像面"
                style="display: block"
                prop="idCardFrontPath"
              >
                <el-upload
                  class="avatar-uploader"
                  action=""
                  accept=".jpg,.jpeg,.png"
                  list-type="picture-card"
                  :show-file-list="false"
                  :on-change="codeChange2"
                >
                  <img
                    v-if="AttestationForm.idCardFrontPath"
                    :src="downloadDomain + AttestationForm.idCardFrontPath"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p><strong>身份证上传后，以下内容可自动识别</strong></p>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item
                label="身份证国徽面"
                style="display: block"
                prop="idCardBackPath"
              >
                <el-upload
                  class="avatar-uploader"
                  action=""
                  accept=".jpg,.jpeg,.png"
                  list-type="picture-card"
                  :show-file-list="false"
                  :on-change="codeChange3"
                >
                  <img
                    v-if="AttestationForm.idCardBackPath"
                    :src="downloadDomain + AttestationForm.idCardBackPath"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">
                    <p><strong>身份证上传后，以下内容可自动识别</strong></p>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item label="身份证号" prop="idCardNumber">
                <el-input
                  v-model="AttestationForm.idCardNumber"
                  @input="updateView($event)"
                ></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="idCardName">
                <el-input
                  v-model="AttestationForm.idCardName"
                  @input="updateView($event)"
                ></el-input>
              </el-form-item>
              <el-form-item label="住址" prop="idCardAddress">
                <el-input
                  type="textarea"
                  v-model="AttestationForm.idCardAddress"
                  @input="updateView($event)"
                ></el-input>
              </el-form-item>
              <el-form-item label="身份证有效期" prop="timer1">
                <el-date-picker
                  v-model="AttestationForm.timer1"
                  type="daterange"
                  businessScope-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  class="picker"
                  style="width: 95%"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item style="display: block">
                <el-button
                  :loading="btnLoading"
                  type="primary"
                  @click="submitForm(0)"
                  class="button"
                  >提交认证</el-button
                >
              </el-form-item>
            </div>
          </el-form>
        </el-col>
        <!-- 上传成功后 -->
        <el-col :span="18" v-show="complete == true">
          <div class="box">
            <p class="complete">
              <img src="../assets/img/提交完成.png" alt="提交成功" />
              <span>您已成功提交认证信息</span>
            </p>
            <p class="tip">请稍后，等待工作人员审核，如需加急请联系客服。</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { ss } from '../utils/storage'

export default {
  data() {
    // 身份证号验证
    let checksfz = (rule, value, cb) => {
      const regsfz = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (regsfz.test(value)) return cb()
      cb(new Error('请输入合法的身份证号'))
    }
    return {
      personalInfo: {},
      // 认证表单
      AttestationForm: {
        idCardExpireStartTime: '',
        idCardExpireEndTime: '',
        timer1: [] // 时间选择框
      },
      timer: [], // 时间选择框(营业执照)
      imagelist: [], // 上传图片的数组
      dialogVisible: false,
      dialogImageUrl: '',
      disabled: false,
      Rrules: {
        companyName: [
          {
            required: true,
            message: '公司名称不能为空',
            trigger: 'blur'
          }
        ],
        businessLicenseNumber: [
          {
            required: true,
            message: '营业执照号不能为空',
            trigger: 'blur'
          }
        ],
        companyAddress: [
          {
            required: true,
            message: '公司地址不能为空',
            trigger: 'blur'
          }
        ],
        legalPerson: [
          {
            required: true,
            message: '法人名称不能为空',
            trigger: 'blur'
          }
        ],
        businessScope: [
          {
            required: true,
            message: '法人名称不能为空',
            trigger: 'blur'
          }
        ],
        businessLicensePath: [
          {
            required: true,
            message: '请上传营业执照照片',
            trigger: 'change'
          }
        ],
        idCardFrontPath: [
          {
            required: true,
            message: '请上传身份证国徽面照片',
            trigger: 'blur'
          }
        ],
        idCardBackPath: [
          {
            required: true,
            message: '请上传身份证背面照片',
            trigger: 'blur'
          }
        ],
        idCardNumber: [
          {
            required: true,
            message: '身份证号不能为空',
            trigger: 'blur'
          },
          {
            validator: checksfz,
            trigger: 'blur'
          }
        ],
        idCardName: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }
        ],
        idCardAddress: [
          {
            required: true,
            message: '住址不能为空',
            trigger: 'blur'
          }
        ],
        timer1: [
          {
            required: true,
            message: '请选择身份证有效期',
            trigger: 'change'
          }
        ]
      },
      complete: false, // 是否提交认证信息
      btnLoading: false
    }
  },
  computed: {
    uploadDisabled() {
      return this.imagelist.length > 0
    },
    timer1() {
      return this.AttestationForm.timer1
    }
  },
  methods: {
    updateView() {
      this.$forceUpdate()
    },
    async getData() {
      const { data } = await this.$http.get('front/personal/personalInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.personalInfo = data.data
      this.getAttestationData(this.personalInfo.id)
    },
    async getAttestationData(id) {
      const { data } = await this.$http.get(`/front/personal/info/${id}`)
      if (data.code !== 200) return this.$message.error(data.msg)
      this.AttestationForm = Object.assign({}, data.data, this.AttestationForm)
      this.AttestationForm.customerId = this.personalInfo.id
      data.data.businessLicenseExpireStartTime
        ? this.timer.push(data.data.businessLicenseExpireStartTime)
        : (this.timer = [])
      data.data.businessLicenseExpireEndTime
        ? this.timer.push(data.data.businessLicenseExpireEndTime)
        : (this.timer = [])
      data.data.idCardExpireStartTime
        ? this.AttestationForm.timer1.push(data.data.idCardExpireStartTime)
        : (this.AttestationForm.timer1 = [])
      data.data.idCardExpireEndTime
        ? this.AttestationForm.timer1.push(data.data.idCardExpireEndTime)
        : (this.AttestationForm.timer1 = [])
      data.data.businessLicensePath
        ? (this.imagelist = [
          { url: this.downloadDomain + data.data.businessLicensePath }
        ])
        : console.log('营业执照链接不存在')
    },
    async codeChange1(file, fileList) {
      var types = ['image/jpeg', 'image/png', 'image/jpg']
      var isJPG = types.indexOf(file.raw.type) > -1
      if (!isJPG) {
        this.$message.error('图片需要使用jpg,jpeg,png格式')
        this.$refs.yyzzUpload.handleRemove(file)
        return
      }
      var isLt2M = file.raw.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message.error('图片大小不能超过5M')
        this.$refs.yyzzUpload.handleRemove(file)
        return
      }
      this.imagelist = fileList
      // 添加了图片之后去掉表单验证并清除当前验证结果
      if (fileList.length > 0) {
        this.Rrules.businessLicensePath = []
        this.$refs.AttestationFormRef.clearValidate(['businessLicensePath'])

        let formData = new FormData()
        formData.append('img', file.raw)
        const { data } = await this.$http.post(
          'front/customer/businessLicenseUpload',
          formData
        )
        if (data.code !== 200) return this.$message.error(data.msg)
        this.AttestationForm.companyName = data.data.companyName
        this.AttestationForm.businessLicenseNumber = data.data.socialCreditCode
        this.AttestationForm.legalPerson = data.data.legalPerson
        this.AttestationForm.companyAddress = data.data.address
        this.AttestationForm.businessScope = data.data.businessScope
        this.AttestationForm.businessLicensePath = data.data.fileAccessPath
        let end = data.data.validityTerm.replace(/[^\d]/g, '-')
        let start = data.data.establishmentDate.replace(/[^\d]/g, '-')
        start = start.substring(0, start.length - 1)
        end = end.substring(0, end.length - 1)
        if (end === '-') {
          end = ''
          // this.timer = [start]
          this.timer = []
        } else {
          this.timer = [start, end]
        }
        // console.log(this.timer)
        // console.log(this.AttestationForm)
      }
    },
    // 身份证照片（正）
    async codeChange2(file) {
      if (!file) return
      var types = ['image/jpeg', 'image/png', 'image/jpg']
      var isJPG = types.indexOf(file.raw.type) > -1
      if (!isJPG) {
        this.$message.error('图片需要使用jpg,jpeg,png格式')
        return
      }
      var isLt2M = file.raw.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message.error('图片大小不能超过5M')
        return
      }
      // 去掉表单验证
      this.Rrules.idCardFrontPath = []
      this.$refs.AttestationFormRef.clearValidate(['idCardFrontPath'])
      let formData = new FormData()
      formData.append('side', 'front') // 正面
      formData.append('img', file.raw)
      const { data } = await this.$http.post(
        'front/customer/idCardUpload',
        formData
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      this.AttestationForm.idCardFrontPath = data.data
        ? data.data.fileAccessPath
        : ''
      this.AttestationForm.idCardName = data.data ? data.data.idCardName : ''
      this.AttestationForm.idCardAddress = data.data
        ? data.data.idCardAddress
        : ''
      this.AttestationForm.idCardNumber = data.data
        ? data.data.idCardNumber
        : ''
      this.$forceUpdate()
      // console.log(this.AttestationForm)
    },
    // 身份证照片（反）
    async codeChange3(file) {
      if (!file) return
      var types = ['image/jpeg', 'image/png', 'image/jpg']
      var isJPG = types.indexOf(file.raw.type) > -1
      if (!isJPG) {
        this.$message.error('图片需要使用jpg,jpeg,png格式')
        return
      }
      var isLt2M = file.raw.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message.error('图片大小不能超过5M')
        return
      }
      this.Rrules.idCardBackPath = []
      this.$refs.AttestationFormRef.clearValidate(['idCardBackPath'])
      let formData = new FormData()
      formData.append('side', 'back')
      formData.append('img', file.raw)
      const { data } = await this.$http.post(
        'front/customer/idCardUpload',
        formData
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      this.AttestationForm.idCardBackPath = data.data
        ? data.data.fileAccessPath
        : ''
      this.AttestationForm.timer1 = [
        data.data.idCardExpireStartTime,
        data.data.idCardExpireEndTime
      ]
      this.AttestationForm.idCardExpireStartTime = data.data
        ? data.data.idCardExpireStartTime
        : ''
      this.AttestationForm.idCardExpireEndTime = data.data
        ? data.data.idCardExpireEndTime
        : ''
      // console.log(this.AttestationForm)
    },
    // 删除当前图片
    handleRemove(file) {
      this.$refs.yyzzUpload.handleRemove(file)
      this.imagelist = []
      this.Rrules.businessLicensePath = [
        { required: true, message: '请上传营业执照照片', trigger: 'change' }
      ]
      this.$refs.AttestationFormRef.resetFields()
    },
    // 查看大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    submitForm(type) {
      // console.log(this.AttestationForm)
      // console.log(this.imagelist)
      if (type === 1 && this.imagelist.length === 0) {
        this.$message.warning('营业执照不能为空')
        return
      }
      if (type === 0) {
        if (
          !this.AttestationForm.timer1[0] &&
          !this.AttestationForm.timer1[1]
        ) {
          this.$message.warning('身份证有效期不能为空')
          return
        }
      }
      this.$refs.AttestationFormRef.validate(async (valid) => {
        if (!valid) return
        this.btnLoading = true
        delete this.AttestationForm.timer1
        if (this.personalInfo.state !== 1) {
          // 新增不传id，再次提交传id
          delete this.AttestationForm.id
        }
        this.AttestationForm.customerType = type
        // console.log(this.AttestationForm)
        const { data } = await this.$http.post(
          'front/personal/add',
          this.AttestationForm
        )
        this.btnLoading = false
        if (data.code !== 200) return this.$message.error(data.msg)
        this.personalInfo.state = 0
        ss.set('personalInfo', JSON.stringify(this.personalInfo))
        this.complete = true
      })
    }
  },
  created() {
    this.getData()
  },
  watch: {
    timer(newVal) {
      if (newVal != null) {
        this.AttestationForm.businessLicenseExpireStartTime = this.timer[0]
        this.AttestationForm.businessLicenseExpireEndTime = this.timer[1]
      }
    },
    timer1(newVal) {
      if (newVal != null) {
        this.AttestationForm.idCardExpireStartTime =
          this.AttestationForm.timer1[0]
        this.AttestationForm.idCardExpireEndTime =
          this.AttestationForm.timer1[1]
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-card {
  min-height: 89vh;
  // color: #848A9F;
  .safety-title {
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
  .el-form {
    width: 650px;
    .el-form-item {
      display: inline-block;
      padding-right: 20px;
      margin-bottom: 30px;
      .el-form-item__content {
        width: 217px;
        font: 700;
        .el-input {
          width: 400px;
        }
        .el-textarea {
          width: 400px;
        }
      }
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 145px;
    height: 145px;
    line-height: 145px;
    text-align: center;
  }
  .avatar {
    width: 145px;
    height: 145px;
    display: block;
  }
  .el-col-18 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    .box {
      width: 550px;
      height: 270px;
      border-radius: 5px;
      background-color: #eef0f3;
      padding: 50px;
      box-sizing: border-box;
      .complete {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 80px;
        }
        span {
          font-size: 16px;
          margin-left: 15px;
        }
      }
      .tip {
        width: 100%;
        text-align: center;
        margin-top: 30px;
      }
    }
  }
}
</style>

<style>
.el-textarea__inner {
  /* height: 60px; */
  padding: 5px 10px;
}
.disabled .el-upload--picture-card {
  display: none;
}
.attest .el-dialog__header {
  border-bottom: 0px;
}
</style>
