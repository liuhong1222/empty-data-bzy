<template>
  <div class="realtime-api">
    <api-test
      :from="'realtimeapi'"
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
  name: 'RealtimeApi',
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
      apiUrl: 'front/realtime/mobileStatusStatic',
      apiOpen: 'open/api/mobileStatusStatic',
      apiName: '实时查询API',
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
          description:
            '号码状态，1-正常 2-空号 3-通话中 4-不在网(空号)  5-关机 7-疑似关机 13-停机 10-未知 9-服务器异常 12-号码错误 -1-检测失败',
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
          orderNo: '1636536222819',
          handleTime: '2021-11-10 17:23:16',
          mobile: '18611768888',
          mnpStatus: '0',
          status: 1,
          carrier: '2',
          area: '北京-北京',
          remark: '中国联通-OK'
        },
        time: '2021-11-10 17:23:43'
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
          description: '手机号码，仅支持单个',
          value: ''
        }
      ],
      testParamsUrl: '/front/realtime/mobileStatusStatic'
    }
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
