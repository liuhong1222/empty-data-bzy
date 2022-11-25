<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="24">
          <div class="number-title">
            <div class="i-title">
              <img src="../assets/img/ssjl.png" />
              <div class="title">实时查询充值记录</div>
            </div>
          </div>
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
              >
              </el-date-picker>
              <el-button
                type="primary"
                size="small"
                @click="getPageList"
                class="button"
                >查询</el-button
              >
            </el-col>
          </el-col>
          <el-table
            :data="tableData"
            style="width: 100%; margin-bottom: 12px"
            border
          >
            <el-table-column prop="orderNo" label=" 订单编号"></el-table-column>
            <el-table-column
              prop="goodsName"
              label="套餐名称"
            ></el-table-column>
            <el-table-column prop="price" label="单价（元）"></el-table-column>
            <el-table-column prop="payType" label="充值类型">
              <template slot-scope="scope">
                {{ payTypeMap[scope.row.payType] }}
              </template>
            </el-table-column>
            <el-table-column
              prop="paymentAmount"
              label="充值金额（元）"
            ></el-table-column>
            <el-table-column
              prop="rechargeNumber"
              label="充值条数"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              label="充值时间"
            ></el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.page"
            :page-sizes="[10, 15, 20, 25, 30]"
            :page-size="queryInfo.size"
            layout="prev, pager, next, sizes, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
        <el-col> </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// import { ss } from '../utils/storage'
export default {
  data() {
    return {
      personalInfo: {},
      tableData: [],
      timer: [],
      total: 0,
      queryInfo: {
        // keyword: '',
        page: 1,
        size: 10,
        customerId: '',
        createTimeFrom: '',
        createTimeEnd: ''
      },
      payTypeMap: {
        0: '对公转账',
        1: '支付宝扫码付',
        2: '注册赠送',
        3: '赠送',
        4: '对公支付宝',
        5: '对私支付宝',
        6: '对私微信',
        7: '对私转账',
        8: '微信扫码付',
        11: '对公转账-综合收款码'
      }
    }
  },
  methods: {
    async getData() {
      const { data } = await this.$http.get('front/personal/personalInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.personalInfo = data.data
      // console.log(this.personalInfo)
      this.queryInfo.customerId = this.personalInfo.id
    },
    async getPageList() {
      if (this.timer != null) {
        this.queryInfo.createTimeFrom = this.timer[0]
        this.queryInfo.createTimeEnd = this.timer[1]
      } else {
        this.queryInfo.createTimeFrom = this.queryInfo.createTimeEnd = ''
      }
      this.queryInfo.category = 1
      const { data } = await this.$http.post(
        'front/recharge/getPageList',
        this.queryInfo
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      // console.log(data)
      this.tableData = data.data.list
      this.total = parseInt(data.data.total)
    },
    handleSizeChange(newSize) {
      this.queryInfo.size = newSize
      this.getPageList()
    },
    handleCurrentChange(newCurrent) {
      this.queryInfo.page = newCurrent
      this.getPageList()
    }
  },
  mounted() {
    this.getData()
    this.getPageList()
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
  .el-col-21 {
    height: 36px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    .el-input {
      width: 240px;
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
  .picker {
    margin: 0 15px;
    width: 300px;
    height: 36px;
    line-height: 32px;
  }
}
</style>
