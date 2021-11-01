<template>
  <div class="data">
    <el-card>
      <el-row>
        <el-col :span="24" >
          <div class="safety-title">
            <div class="i-title">
              <img src="../assets/img/个人中心.png">
              <div class="title">账户资料</div>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            <p class="_title">账户信息</p>
            <el-row>
              <el-col :span="24">
                <div class="rengong" v-if="personalInfo.state == 9">
                  <el-row>
                    <!-- 企业 -->
                    <el-col :span="24" v-if="personalInfo.customerType == 1">
                      <div class="div">
                        <span class="l_span">企业名称</span>
                        <span class="r_span">{{personalInfo.customerExt.companyName}}</span>
                      </div>
                      <div>
                        <span class="l_span">公司地址</span>
                        <span class="r_span">{{personalInfo.customerExt.companyAddress}}</span>
                      </div>
                      <div>
                        <span class="l_span">营业执照号</span>
                        <span class="r_span">{{personalInfo.customerExt.businessLicenseNumber}}</span>
                      </div>
                      <div>
                        <span class="l_span">法人名称</span>
                        <span class="r_span">{{personalInfo.customerExt.legalPerson}}</span>
                      </div>
                      <div>
                        <span class="l_span">营业期限</span>
                        <span class="r_span">{{personalInfo.customerExt.businessLicenseExpireStartTime}} ———— {{personalInfo.customerExt.businessLicenseExpireEndTime}}</span>
                      </div>
                      <div>
                        <span class="l_span">经营范围</span>
                        <span class="r_span">{{personalInfo.customerExt.businessScope}}</span>
                      </div>
                      <div>
                        <span class="l_span">营业执照</span>
                        <span class="r_span"><el-button size="small" plain icon="iconfont iconyanjing" @click="viewOriginal" class="button"> 查看原件</el-button></span>
                      </div>
                      <div>
                        <span class="l_span">认证信息</span>
                        <span class="r_span green">已认证</span>
                      </div>
                      <div><el-button class="button" size="small" plain icon="iconfont icondunpai-" @click="goAttestation">重新认证</el-button></div>
                    </el-col>
                    <!-- 个人 -->
                    <el-col :span="10" v-if="personalInfo.customerType == 0">
                      <div class="div">
                        <span class="l_span">身份证号 </span>
                        <span class="r_span">{{personalInfo.customerExt.idCardNumber}}</span>
                      </div>
                      <div>
                        <span class="l_span">姓名</span>
                        <span class="r_span">{{personalInfo.name}}</span>
                      </div>
                      <div>
                        <span class="l_span">住址</span>
                        <span class="r_span">{{personalInfo.customerExt.idCardAddress}}</span>
                      </div>
                      <div>
                        <span class="l_span">身份证</span>
                        <span class="r_span"><el-button size="small" plain icon="iconfont iconyanjing" @click="viewIdentity"> 查看大图</el-button></span>
                      </div>
                      <div>
                        <span class="l_span">认证信息</span>
                        <span class="r_span green">已认证</span>
                      </div>
                      <!-- <div><el-button class="button" size="small" plain icon="iconfont icondunpai-" @click="goAttestation">重新认证</el-button></div> -->
                    </el-col>
                  </el-row>
                </div>

                <div class="rengong" v-if="personalInfo.state == 0">
                  <el-col :span="10">
                    <div>
                      <span class="l_span">认证信息</span>
                      <span class="r_span red">
                        <i class="iconfont iconweirenzheng"></i>
                        未认证
                      </span>
                    </div>
                    <div><el-button class="button" size="small" plain icon="iconfont icondunpai-" @click="goAttestation"> 立即认证</el-button></div>
                  </el-col>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
      <img :src="dialogImageUrl2" height="50%" v-if="personalInfo.customerType == 0">
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      personalInfo: {}, // 个人信息
      dialogVisible: false,
      dialogImageUrl: '', // 营业执照大图
      dialogImageUrl2: '', // 身份证反面
      AttestationForm: {} // 认证信息
    }
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get('front/personal/personalInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.personalInfo = data.data
      this.getAttestationData(this.personalInfo.id)
    },
    async getAttestationData(id) {
      const { data } = await this.$http.get(`/front/personal/info/${id}`)
      if (data.code !== 200) return this.$message.error(data.msg)
      this.AttestationForm = data.data
    },
    viewOriginal() {
      this.dialogVisible = true
      this.dialogImageUrl = this.AttestationForm.businessLicensePath
    },
    viewIdentity() {
      this.dialogVisible = true
      this.dialogImageUrl = this.AttestationForm.idCardFrontPath
      this.dialogImageUrl2 = this.AttestationForm.idCardBackPath
    },
    goAttestation() {
      this.$router.push('/attestation')
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.el-card {
  min-height: 89vh;
  color: #848A9F;
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
  ._title {
    margin-bottom: 20px;
    padding-left: 13px;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    border-left: 4px solid #01bfcb;
    color: #878a9d;
    font-weight: 700;
  }
  .rengong {
    div {
      font-size: 13px;
      margin: 15px 0 40px 5px;
      .l_span {
        display: inline-block;
        width: 90px;
      }
      .r_span {
        color: #59607c;
        margin-left: 10px;
        span {
          display: inline-block;
          width: 240px;
        }
      }
      .red {
        margin-top: 10px;
        color: #F56C6C;
        font-weight: 700;
      }
      .warning {
        margin-top: 10px;
        color: #E6A23C;
        font-weight: 700;
      }
      .button {
        margin-left: 100px;
      }
      .green {
        color: #28b88c;
      }
    }
    .div {
      margin-top: -10px;
    }
  }
}
</style>

<style>
.data .el-dialog__header {
  border-bottom: 0px;
  padding: 10px;
}
</style>
