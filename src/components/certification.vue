<template>
  <el-dialog
    class="auth-dialog"
    title=""
    width="450px"
    :visible="modal1Visible"
    :show-close="true"
    :maskClosable="false"
    :footer="null"
    @close="modal1Visible = false"
  >
    <h3>尊敬的用户</h3>
    <p>
      根据互联网安全相关规定，您需通过实名认证后方可继续使用本平台产品，如需帮助请联系客服人员。
    </p>
    <div class="auth-footer">
      <button
        type="button"
        class="el-button el-button--default el-button--small"
        @click="closeModal"
        v-if="isShowClose"
      >
        <span>暂不认证</span>
      </button>
      <button
        type="button"
        class="el-button el-button--default el-button--small"
        @click="gotocertification"
      >
        <span>立即认证</span>
      </button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'certification',
  data() {
    return {
      modal1Visible: false,
      source: undefined,
      isShowClose: true
    }
  },
  mounted() {
    this.$root.$on('showCertification', this.setModal1Visible)
  },
  methods: {
    setModal1Visible({ source, flag }) {
      this.modal1Visible = flag
      this.source = source
      if (source.url === 'emptyapiNot') {
        // 不可点击暂不认证
        this.isShowClose = false
      } else {
        this.isShowClose = true
      }
    },
    closeModal() {
      this.modal1Visible = false
      if (this.source.url === 'empty') {
        // console.log(this.personalInfo)
        // console.log(this.source.balance)
        this.$root.$emit('closeCertification', {
          source: 'certification',
          flag: true
        })
        if (!this.source.balance || this.source.balance === '0') {
          this.$message.error('余额不足')
        } else {
          document.getElementById(this.source.type).click()
        }
      } else if (this.source.url === 'emptyapi') {
        this.$root.$emit('closeCertification', {
          source: 'certification',
          flag: true
        })
      }
    },
    gotocertification() {
      this.modal1Visible = false
      this.$router.push('/attestation')
    }
  }
}
</script>
<style lang="scss">
.certification {
  .closebtn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}

.auth-dialog {
  font-size: 16px;
  line-height: 30px;
  .el-dialog__header {
    display: none;
  }
  .ant-modal-close-x {
  }

  .el-dialog__body {
    padding: 30px 20px;
    color: #606266;
    h3 {
      text-align: center;
    }

    p {
      text-indent: 32px;
      padding: 20px;
      font-size: 16px;
      line-height: 30px;
    }
  }

  .el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }

  .auth-footer {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 10px;

    .el-button--default {
      margin: 0 10px;
      border-radius: 0;
    }

    .el-button--small,
    .el-button--small.is-round {
      padding: 8px 11px;
    }

    .el-button--default {
      border-color: #6799ee;
      background-color: #6799ee;
      color: #fff;
    }
  }

  .ant-modal-content,
  .el-dialog__body {
    /*background-color: transparent;*/
    top: 15%;
    height: 285px;
  }
}

.certificationBox p {
  color: #ffffff;
}
</style>
