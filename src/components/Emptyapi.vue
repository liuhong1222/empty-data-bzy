<template>
  <div class='empty-api'>
    <api-test
    :from="'emptyapi'"
    :api-url="apiUrl"
    :api-open="apiOpen"
    :api-name="apiName"
    :api-domain="apiDomain"
    :request-data="requestData"
    :response-data="responseData"
    :example-data="exampleData"
    :test-params-data="testParamsData"
    :test-params-url="testParamsUrl"/>
  </div>
</template>

<script>
import ApiTest from './api_test'

export default {
  name: 'EmptyApi',
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
  data () {
    return {
      apiUrl: 'front/empty/batchCheckNew',
      apiOpen: 'open/api/batchCheckNew',
      apiName: '空号检测API',
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
          description: '手机号码，多个号码以英文半角逗号分隔',
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
          type: '[array]',
          detail: '--'
        },
        {
          params: 'mobile',
          description: '手机号',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'lastTime',
          description: '时间戳，毫秒。样例：1522080000000',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'area',
          description: '手机号所属区域。样例：省-市',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'numberType',
          description: '手机号运营商类型。样例：中国移动 GSM',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'chargesStatus',
          description: '是否收费，1-收费 0-不收费',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'status',
          description: '检测结果，0-空号 1-实号 4-沉默号 5-风险号 12-号码错误',
          type: '[string]',
          detail: '--'
        }
      ],
      exampleData: {
        code: 200,
        msg: '操作成功',
        success: true,
        data: [
          {
            mobile: '17771206666',
            lastTime: '1634073937257',
            area: '湖北-孝感',
            numberType: '中国电信',
            chargesStatus: '1',
            status: '1'
          },
          {
            mobile: '18611768888',
            lastTime: '1635193475520',
            area: '北京-北京',
            numberType: '中国联通',
            chargesStatus: '1',
            status: '1'
          }
        ],
        time: '2021-11-10 17:17:40'
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
      testParamsUrl: '/front/empty/batchCheckNew'
    }
  },
  computed: {

  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
