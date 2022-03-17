<template>
  <div class="realtime-stardard">
    <api-test
      :from="'realtimeapistardard'"
      :api-url="apiUrl"
      :api-open="apiOpen"
      :api-name="apiName"
      :api-domain="apiDomain"
      :request-data="requestData"
      :response-data="responseData"
      :example-data="exampleData"
      :test-params-data="testParamsData"
      :test-params-url="testParamsUrl"
    />
  </div>
</template>

<script>
import ApiTest from './api_test'

export default {
  name: 'RealtimeStardard',
  components: { ApiTest },
  props: {
    apisetData: {
      type: Object,
      required: true
    },
    apiDomain: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      apiUrl: 'front/realtime/mobileStatusStardard',
      apiOpen: 'open/api/mobileStatusStardard',
      apiName: '实时查询标准版',
      requestData: [
        {
          params: 'appId',
          description: '应用id',
          isMust: '是',
          type: '[string]',
          example: `${this.apisetData.appId || 'xbCJaClq'}`,
          detail: '--'
        },
        {
          params: 'appKey',
          description: '应用key',
          isMust: '是',
          type: '[string]',
          example: '******',
          exampleShow: `${this.apisetData.appKey || 'xuvcmiiL'}`,
          isExample: true,
          detail: '--'
        },
        {
          params: 'mobiles',
          description: '手机号码，仅支持单个',
          isMust: '是',
          type: '[string]',
          example: '',
          detail: '--'
        }
      ],
      responseData: [
        {
          params: 'code',
          description: '返回结果码，200-成功，其他-失败',
          type: '[int]',
          detail: '--'
        },
        {
          params: 'msg',
          description: '返回结果码说明',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'success',
          description: '返回结果，true-成功false-失败',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'time',
          description: '调用时间',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'data',
          description: '返回对象',
          type: '[object]',
          detail: '--'
        },
        {
          params: 'orderNo',
          description: '订单号，业务唯一流水号',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'handleTime',
          description: '查询时间',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'mobile',
          description: '手机号码',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'mnpStatus',
          description: '是否携号转网 1-是 0-否',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'area',
          description: '手机号所属区域，样例：北京-北京',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'carrier',
          description: '手机号携号转网后的运营商类型，1-移动 2-联通 3-电信',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'status',
          description: '分为carrier为"1"、"2"、"3"不同情况',
          descriptionDetail:
            'carrier为"1"时，1-正常、2-停机、3-在网但不可用、4-不在网、5-无短信能力、6-欠费、7-长时间关机、8-销号/未启用、9-服务器异常、10-查询失败；carrier为"2"时，1-未启用、2-欠费停机、3-正常、4-其它停机、5-已销号、9-服务器异常、10-查询失败、7-关机；carrier为"3"时，0-在网状态停机、1-在网状态正常、2-在网但不可用、3-销号/未启用、4-无法查询、9-服务器异常、10-查询失败、7-关机',
          type: '[int]',
          detail: '--'
        },
        {
          params: 'remark',
          description: '备注',
          type: '[string]',
          detail: '--'
        }
      ],
      exampleData: {
        code: 200,
        msg: '操作成功',
        success: true,
        data: {
          orderNo: '1636537234685',
          handleTime: '2021-11-10 17:40:34',
          mobile: '18611768888',
          mnpStatus: '0',
          status: 3,
          carrier: '2',
          area: '北京-北京',
          remark: '中国联通-OK'
        },
        time: '2021-11-10 17:41:01'
      },
      testParamsData: [
        {
          params: 'appId',
          type: '[string]',
          description: '应用id',
          value: `${this.apisetData.appId || 'xbCJaClq'}`,
          isReadOnly: true
        },
        {
          params: 'appKey',
          type: '[string]',
          description: '应用key',
          value: '******',
          isValue: true,
          valueShow: `${this.apisetData.appKey || 'xuvcmiiL'}`
        },
        {
          params: 'mobiles',
          type: '[string]',
          description: '手机号码，多个号码以英文半角逗号分隔',
          value: ''
        }
      ],
      testParamsUrl: '/front/realtime/mobileStatusStardard'
    }
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
