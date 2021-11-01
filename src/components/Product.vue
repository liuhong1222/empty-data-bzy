<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="24" >
          <div class="product-title">
            <div class="i-title">
              <img src="../assets/img/guanli-pro.png">
              <div class="title">产品管理</div>
            </div>
          </div>
        </el-col>
        <el-row :span="24" style="margin: 20px 0;">
          <el-col :span="12">
            <div class="product">
              <div class="left-block">
                <img src="../assets/img/空号检测.png" alt="空号检测">
                <div class="left-block-p" @click="$router.push('/emptynumber')">
                  <div class="p-title">空号检测</div>
                  <div class="des">根据客户提供的手机号，分类筛选出其中的空号、实号、风险号和沉默号。多用于一般营销。（仅支持批量检测）</div>
                </div>
              </div>
              <div class="right-block">
                <div class="right-block-p">
                  <span class="money">
                  0.001元/条~0.002 元/条
<!--                  <span class="product-listunit">元/条</span>-->
                  </span>
                </div>
                <div class="btn-wrap button">
                  <el-button icon="el-icon-right" size="small" plain @click="$router.push('/emptynumber')">立即检测</el-button>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product" style="margin-right:0">
              <div class="left-block">
                <img src="../assets/img/实时显示.png" alt="号码实时查询">
                <div class="left-block-p" @click="$router.push('/realtime')">
                  <div class="p-title">号码实时检测</div>
                  <div class="des">实时检测手机号码状态，包括空号、正常、忙、关机、停机，是否有语音功能、短信功能，用于检测上网卡、非正常卡。（可单条查询）</div>
                </div>
              </div>
              <div class="right-block">
                <div class="right-block-p">
                  <span class="money">
                  0.05元/条~0.07元/条
<!--                  <span class="product-listunit">元/条</span>-->
                  </span>
                </div>
                <div class="btn-wrap button">
                  <el-button icon="el-icon-right" size="small" plain @click="$router.push('/realtime')">立即检测</el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="12">
            <div class="product">
              <div class="left-block">
                <img src="https://static.253.com/wanshu/02/2019-05-07/164805_bceef520.png" alt="">
                <div class="left-block-p" @click="Alart">
                  <div class="p-title">空号检测API</div>
                  <div class="des">用户侧营销系统可调用空号检测API直接实现号码检测功能，无需登录检测平台提交号码检测</div>
                </div>
              </div>
              <div class="right-block">
                <div class="right-block-p">
                  <span class="money">
                  0.001元/条~0.002 元/条
<!--                  <span class="product-listunit">元/条</span>-->
                  </span>
                </div>
                <div class="btn-wrap button"><el-button icon="el-icon-right" size="small" plain @click="Alart">查看详情</el-button></div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="product" style="margin-right:0">
              <div class="left-block">
                <img src="https://static.253.com/wanshu/02/2019-05-07/164805_bceef520.png" alt="">
                <div class="left-block-p" @click="Alart">
                  <div class="p-title">号码实时检测API</div>
                  <div class="des">基于运营商接口的手机号码状态查询接口，精准检测出号码的在网状态，实时反馈出检测结果</div>
                </div>
              </div>
              <div class="right-block">
                <div class="right-block-p">
                  <span class="money">
                  0.05元/条~0.07元/条
<!--                  <span class="product-listunit">元/条</span>-->
                  </span>
                </div>
                <div class="btn-wrap button"><el-button icon="el-icon-right" size="small" plain @click="Alart">查看详情</el-button></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-row>
    </el-card>

    <!-- <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>详询客户经理</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // dialogVisible: false
    }
  },
  methods: {
    Alart() {
      this.$alert('详询客户经理', '提示', {
        confirmButtonText: '确定',
        type: 'info'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-card {
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
  .product {
    padding: 16px 20px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 28px;
    // width: 85%;
    margin-right: 16px;
    &:hover {
      border-color: #6799ee;
      .p-title {
        font-weight: 700;
        color: #6799ee !important;
      }
    }
    .left-block {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding-bottom: 16px;
      height: 80px;
      img {
        width: 100%;
        height: 100%;
        max-width: 62px;
        max-height: 62px;
        margin-right: 15px;
      }
      .left-block-p {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        cursor: pointer;
        .p-title {
          height: 25px;
          line-height: 25px;
          font-size: 16px;
          color: #59607c;
        }
      }
    }
    .right-block {
      padding-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .right-block-p {
        height: 32px;
        line-height: 32px;
        .money {
          // color: #84899f;
          color: #ff5054;
        }
        .times {
          padding-left: 20px;
          color: #84899f;
        }
      }
      .btn-wrap {
        margin-bottom: 2px;
      }
    }
  }
}
</style>
