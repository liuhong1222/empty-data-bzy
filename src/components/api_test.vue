<template>
  <div class="api-test">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <!-- 接口详情 -->
      <el-tab-pane label="接口详情" name="detail">
        <section class="api-test-url">
          <el-row class="api-test-url-row">
            <span class="url-btn blue-btn">HTTP</span>
            <span>{{ apiDomain }}</span>
            <span>{{ apiOpen }}</span>
          </el-row>
          <el-row class="api-test-url-row">
            <span class="url-btn green-btn">POST</span>
            <span class="green-text">{{ apiName }}</span>
          </el-row>
        </section>
        <section class="api-test-params">
          <h2 class="api-test-title">请求参数</h2>
          <el-table :data="requestData" style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="params" label="参数" width="180">
            </el-table-column>
            <el-table-column prop="description" label="说明"> </el-table-column>
            <el-table-column prop="isMust" label="必填" width="50">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="100">
            </el-table-column>
            <el-table-column prop="example" label="示例" width="160">
              <template slot-scope="scope">
                <!-- appKey示例 -->
                <div v-if="scope.row.isExample" slot="reference">
                  <div v-if="isParamsEyeShow" class="api-test-params-apikey">
                    <span>{{ scope.row.example }}</span>
                    <img
                      src="../assets/img/eyes.png"
                      alt="显示"
                      @click="isParamsEyeBtn"
                    />
                  </div>
                  <div v-else class="api-test-params-apikey">
                    <span>{{ scope.row.exampleShow }}</span>
                    <img
                      src="../assets/img/closeEye.png"
                      alt="隐藏"
                      @click="isParamsEyeBtn"
                    />
                  </div>
                </div>
                <div v-else slot="reference">
                  {{ scope.row.example }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="detail" label="详情" width="100">
            </el-table-column>
          </el-table>
        </section>
        <section class="api-test-params api-test-response">
          <h2 class="api-test-title">返回参数</h2>
          <el-table
            :data="responseData"
            style="width: 100%"
            :cell-class-name="responseCellClass"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="params" label="参数" width="180">
            </el-table-column>
            <el-table-column prop="description" label="说明">
              <template slot-scope="scope">
                <!-- 实时查询标准版说明 -->
                <el-popover
                  trigger="hover"
                  placement="top"
                  v-if="scope.row.descriptionDetail"
                >
                  <p style="max-width: 950px">
                    {{ scope.row.descriptionDetail }}
                  </p>
                  <div slot="reference">
                    {{ scope.row.description }}
                  </div>
                </el-popover>
                <div v-else slot="reference">
                  {{ scope.row.description }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="100">
            </el-table-column>
            <el-table-column prop="detail" label="详情" width="100">
            </el-table-column>
          </el-table>
        </section>
        <section class="api-test-example">
          <h2 class="api-test-title">返回示例</h2>
          <ul class="api-test-example-tab">
            <li
              :class="{ active: exampleActive === 1 }"
              @click="resultTab('example', 1)"
            >
              成功结果
            </li>
            <li
              :class="{ active: exampleActive === 2 }"
              @click="resultTab('example', 2)"
            >
              失败结果
            </li>
          </ul>
          <div class="api-test-example-content">
            <json-view v-if="exampleActive === 1" :data="exampleData" />
            <span v-else>没有示例说明</span>
          </div>
        </section>
        <section class="api-test-params">
          <h2 class="api-test-title">详细说明</h2>
          <div class="api-test-apiname">{{ apiName }}</div>
        </section>
      </el-tab-pane>
      <!-- 状态码 -->
      <el-tab-pane label="状态码" name="status">
        <section class="api-test-statuscode">
          <el-table :data="statuscodeData" style="width: 100%">
            <el-table-column prop="code" label="状态码" width="180">
            </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="solution" label="解决方案">
            </el-table-column>
          </el-table>
        </section>
      </el-tab-pane>
      <el-tab-pane label="测试" name="test">
        <section class="api-test-postman">
          <el-row class="api-test-postman-urlinfo">
            <el-select v-model="httpValue">
              <el-option
                v-for="item in httpData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <span class="colon">:</span>
            <el-input
              v-model="apiUrlInput"
              readonly
              class="url-input"
            ></el-input>
            <el-select v-model="postValue">
              <el-option
                v-for="item in postData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-row>
        </section>
        <section class="api-test-params">
          <h2 class="api-test-title">请求参数</h2>
          <el-table
            ref="testParamsTable"
            :data="testParamsData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <!-- <el-table-column
              type="selection"
              width="55">
            </el-table-column> -->
            <el-table-column prop="params" label="参数名" width="180">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="120">
            </el-table-column>
            <el-table-column prop="description" label="说明"> </el-table-column>
            <el-table-column prop="value" label="参数值">
              <template slot-scope="scope">
                <!-- apikey显隐展示 -->
                <div v-if="scope.row.isValue" slot="reference">
                  <div v-if="isTestEyeShow" class="api-test-params-textarea">
                    <el-input
                      placeholder="参数值"
                      v-model="scope.row.value"
                      readonly
                    />
                    <img
                      src="../assets/img/eyes.png"
                      alt="显示"
                      @click="isTestEyeBtn"
                    />
                  </div>
                  <div v-else class="api-test-params-textarea">
                    <el-input
                      placeholder="参数值"
                      v-model="scope.row.valueShow"
                      readonly
                    />
                    <img
                      src="../assets/img/closeEye.png"
                      alt="隐藏"
                      @click="isTestEyeBtn"
                    />
                  </div>
                </div>
                <div v-else-if="scope.row.isReadOnly" slot="reference">
                  <el-input
                    placeholder="api参数值"
                    v-model="scope.row.value"
                    readonly
                  />
                </div>
                <div v-else slot="reference">
                  <el-input placeholder="参数值" v-model="scope.row.value" />
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-row class="api-test-params">
            <el-button
              type="primary"
              class="api-test-params-primarybtn"
              @click="postmanSend"
              >发送</el-button
            >
          </el-row>
        </section>
        <section class="api-test-example">
          <h2 class="api-test-title">返回结果</h2>
          <el-row>
            <ul class="api-test-example-tab">
              <li
                :class="{ active: resultActive === 1 }"
                @click="resultTab('result', 1)"
              >
                body
              </li>
              <li
                :class="{ active: resultActive === 2 }"
                @click="resultTab('result', 2)"
              >
                header
              </li>
            </ul>
            <el-button class="api-test-params-copybtn" @click="resultCopy"
              >复制</el-button
            >
          </el-row>
          <div class="api-test-example-content" v-if="resultActive === 1">
            <json-view
              v-if="JSON.stringify(testParamsBody) !== '{}'"
              :data="testParamsBody"
            />
            <span v-else>"没有示例说明"</span>
          </div>
          <div class="api-test-example-content" v-else>
            <span>"没有示例说明"</span>
          </div>
        </section>
      </el-tab-pane>
      <!-- <el-tab-pane label="接口文档" name="word"></el-tab-pane> -->
    </el-tabs>
    <a
      class="api-test-word"
      :href="downloadDomain + '/pdf/号码状态接口文档.pdf'"
      >接口文档</a
    >
  </div>
</template>

<script>
import jsonView from 'vue-json-views'

export default {
  name: 'ApiTest',
  components: { jsonView },
  props: {
    from: {
      type: String,
      required: true
    },
    apiUrl: {
      type: String,
      required: true
    },
    apiOpen: {
      type: String,
      required: false
    },
    apiName: {
      type: String,
      required: true
    },
    apiDomain: {
      type: String,
      required: true
    },
    requestData: {
      type: Array,
      required: true
    },
    responseData: {
      type: Array,
      required: true
    },
    exampleData: {
      type: Object,
      required: true
    },
    testParamsData: {
      type: Array,
      required: true
    },
    testParamsUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      activeName: 'detail',
      exampleActive: 1,
      resultActive: 1,
      isParamsEyeShow: true,
      isTestEyeShow: true,
      statuscodeData: [
        {
          code: '200',
          description: '请求成功',
          solution: ''
        },
        {
          code: '400',
          description: '坏请求',
          solution: ''
        },
        {
          code: '401',
          description: '非法访问',
          solution: '请检查参数'
        },
        {
          code: '403',
          description: '没有权限,请先实名认证',
          solution: ''
        },
        {
          code: '404',
          description: '你请求的资源不存在',
          solution: ''
        },
        {
          code: '500',
          description: '操作失败',
          solution: ''
        },
        {
          code: '4000',
          description: '登陆失败',
          solution: ''
        },
        {
          code: '5000',
          description: '系统异常',
          solution: ''
        },
        {
          code: '5001',
          description: '请求参数校验异常',
          solution: ''
        },
        {
          code: '5002',
          description: '请求参数解析异常',
          solution: ''
        },
        {
          code: '5003',
          description: 'HTTP Media 类型异常',
          solution: ''
        },
        {
          code: '5100',
          description: '系统处理异常',
          solution: ''
        },
        {
          code: '5101',
          description: '业务处理异常',
          solution: ''
        },
        {
          code: '5102',
          description: '数据库处理异常',
          solution: ''
        },
        {
          code: '5103',
          description: '验证码校验异常',
          solution: ''
        },
        {
          code: '5104',
          description: '登陆授权异常',
          solution: ''
        },
        {
          code: '5105',
          description: '没有访问权限',
          solution: ''
        },
        {
          code: '5106',
          description: '没有访问权限',
          solution: ''
        },
        {
          code: '5107',
          description: '需要二次图形验证',
          solution: ''
        },
        {
          code: '5201',
          description: '手机号码个数超过最大值',
          solution: ''
        },
        {
          code: '5202',
          description: '检测账户余额不足',
          solution: ''
        },
        {
          code: '5203',
          description: '消耗条数冻结状态更新失败',
          solution: ''
        },
        {
          code: '5204',
          description: '计数异常',
          solution: ''
        },
        {
          code: '500008',
          description: '请求速率超限',
          solution: ''
        }
      ],
      httpValue: 'http',
      httpData: [
        {
          value: 'http',
          label: 'HTTP'
        }
      ],
      urlValue: '前缀+url',
      postValue: 'post',
      postData: [
        {
          value: 'post',
          label: 'POST'
        }
      ],
      testParamsBody: {},
      testParamsArr: [], // 请求参数选中数组
      apiUrlInput: this.apiDomain + this.apiOpen
    }
  },
  computed: {},
  created() {
    // console.log(this.apiOpen)
  },
  mounted() {
    this.$nextTick(() => {
      this.setCurrentRows()
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
      if (tab.name === 'word') {
        window.location.href = this.downloadDomain + '/pdf/号码状态接口文档.pdf'
      }
      // if (tab.name === 'test') {
      //   this.$nextTick(() => {
      //     this.setCurrentRows()
      //   })
      // }
    },
    // 返回示例
    resultTab(item, val) {
      this[item + 'Active'] = val
    },
    responseCellClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (
          rowIndex === 5 ||
          rowIndex === 6 ||
          rowIndex === 7 ||
          rowIndex === 8 ||
          rowIndex === 9 ||
          rowIndex === 10 ||
          rowIndex === 11 ||
          rowIndex === 12
        ) {
          return 'space-cell'
        }
      }
    },
    isParamsEyeBtn() {
      this.isParamsEyeShow = !this.isParamsEyeShow
    },
    isTestEyeBtn() {
      this.isTestEyeShow = !this.isTestEyeShow
    },
    // 选中所有行
    handleSelectionChange(val) {
      // console.log(val)
      this.testParamsArr = val
    },
    // 设置默认选中行
    setCurrentRows() {
      this.testParamsArr = this.testParamsData
      this.$nextTick(() => {
        for (let i = 0; i < this.testParamsData.length; i++) {
          this.$refs.testParamsTable.toggleRowSelection(
            this.testParamsData[i],
            true
          )
        }
      })
    },
    // 测试发送请求
    async postmanSend() {
      // console.log(this.testParamsArr)
      let mobiles = ''
      // let appId = ''
      // let appKey = ''
      this.testParamsArr.map((item) => {
        switch (item.params) {
          case 'mobiles':
            mobiles = item.value
            break
          // case 'appId':
          //   appId = item.value
          //   break
          // case 'appKey':
          //   appKey = item.valueShow
          //   break
          default:
            break
        }
      })
      let testForm = new FormData()
      if (this.from === 'emptyapi') {
        testForm.append('mobiles', mobiles)
      } else {
        testForm.append('mobile', mobiles)
      }
      const { data } = await this.$http.post(this.testParamsUrl, testForm)
      this.testParamsBody = data
    },
    // 复制测试发送返回结果
    resultCopy() {
      let msg = ''
      if (JSON.stringify(this.testParamsBody) === '{}') {
        // 没有返回结果
        msg = '"没有示例说明"'
      } else {
        msg = JSON.stringify(this.testParamsBody)
      }
      // console.log(msg)
      // 创建input标签
      var input = document.createElement('input')
      // 将input的值设置为需要复制的内容
      input.value = msg
      // 添加input标签
      document.body.appendChild(input)
      // 选中input标签
      input.select()
      // 执行复制
      document.execCommand('copy')
      // 成功提示信息
      this.$message.success('复制成功！')
      // 移除input标签
      document.body.removeChild(input)
    }
  }
}
</script>

<style lang="scss">
.api-test {
  position: relative;
  &-url {
    &-row {
      &:first-child {
        margin: 12px 0;
      }
      .url-btn {
        margin-right: 12px;
        height: 18px;
        text-align: center;
        color: #fff;
        display: inline-block;
        padding: 0 10px;
        border-radius: 2px;
        font-size: 12px;
        line-height: 18px;
      }
      .blue-btn {
        background-color: #689cfc;
      }
      .green-btn {
        background-color: #01c0c8;
      }
      .green-text {
        font-weight: bold;
      }
    }
  }
  &-params {
    margin-top: 35px;
    &-apikey {
      display: flex;
      align-items: center;
      img {
        cursor: pointer;
        width: 16px;
        height: 16px;
        margin-left: 10px;
      }
    }
    &-textarea {
      position: relative;
      img {
        position: absolute;
        top: 10px;
        right: 15px;
        cursor: pointer;
      }
    }
    &-primarybtn {
      padding: 0;
      height: 30px;
      line-height: 30px;
      width: 100px;
      text-align: center;
    }
    &-copybtn {
      margin-left: 20px;
      padding: 0 20px;
      height: 32px;
      line-height: 32px;
    }
  }
  &-response {
    .el-table {
      .space-cell {
        div {
          margin-left: 15px;
        }
      }
    }
  }
  &-title {
    margin-bottom: 20px;
    padding-left: 13px;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    border-left: 4px solid #01bfcb;
    color: #878a9d;
    font-weight: 700;
  }
  &-example {
    margin-top: 35px;
    .el-row {
      display: flex;
    }
    &-tab {
      display: flex;
      width: 155px;
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        flex: 1;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #d3d5dc;
        margin-right: -1px;
        cursor: pointer;
        position: relative;
        &.active {
          background-color: #689cfc;
          border-color: #689cfc;
          color: #fff;
          z-index: 10;
        }
        &:first-child {
          border-radius: 3px 0 0 3px;
        }
        &:last-child {
          border-radius: 0 3px 3px 0;
        }
      }
    }
    &-content {
      border: 1px solid #efefef;
      padding: 15px 25px;
      margin-top: 12px;
    }
  }
  &-apiname {
    margin: 15px 15px 30px;
    line-height: 1;
    overflow: hidden;
  }
  &-postman {
    margin-top: 28px;
    &-urlinfo {
      display: flex;
      margin-top: -15px;
      .colon {
        display: table-cell;
        width: 18px;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      .url-input {
        margin-right: 14px;
      }
    }
  }
  &-word {
    position: absolute;
    top: 0;
    z-index: 2;
    left: 255px;
    text-decoration: none;
    color: #909399;
    font-size: 14px;
    font-weight: 700;
    margin: 0 16px;
    height: 40px;
    line-height: 40px;
    &:hover {
      color: #6799ee;
    }
  }
}
</style>
