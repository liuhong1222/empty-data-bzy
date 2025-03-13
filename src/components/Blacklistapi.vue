<template>
  <div class="realtime-api">
    <api-test
      :from="'blacklistapi'"
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
  name: 'BlacklistApi',
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
      apiUrl: 'open/api/risk/batchCheck',
      apiOpen: 'open/api/risk/batchCheck',
      apiName: '防骚扰黑名单',
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
          description: '手机号码，多个号码以英文半角逗号分隔，单次支持1-500个号码',
          isMust: '是',
          type: '[string]',
          example: '',
          detail: '--'
        },
        {
          params: 'forbidLevel',
          description: '拦截等级（1:一般 2:敏感 3:高危） 高危：拦截实际有过投诉行为的号码、有投诉意向的号码。敏感：拦截有过投诉行为的号码。一般：仅拦截极敏感的号码',
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
          description: '返回数组',
          type: '[array]',
          detail: '--'
        },
        {
          params: 'mobile',
          description: '手机号码',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'forbid',
          description: '是否拦截，0: 非风险号码,不拦截，1: 风险号码,拦截，2: 超频号码,拦截（拦截等级为3时才会有超频校验）',
          type: '[int]',
          detail: '--'
        },
        {
          params: 'msg',
          description: '中文描述：非风险号码,风险号码需拦截,超频号码需拦截',
          type: '[string]',
          detail: '--'
        },
        {
          params: 'luckyLevel',
          description: '吉祥号等级',
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
            mobile: '18610764785',
            forbid: 0,
            msg: '非风险号码',
            luckyLevel: '0'
          },
          {
            mobile: '17971205284',
            forbid: 1,
            msg: '风险号码需拦截',
            luckyLevel: '4-2'
          }
        ],
        time: '2025-03-12 12:57:34'
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
          description: '手机号码，多个号码以英文半角逗号分隔，单次支持1-500个号码',
          value: ''
        },
        {
          params: 'forbidLevel',
          type: '[string]',
          description: '拦截等级（1:一般 2:敏感 3:高危） 高危：拦截实际有过投诉行为的号码、有投诉意向的号码。敏感：拦截有过投诉行为的号码。一般：仅拦截极敏感的号码',
          value: ''
        }
      ],
      testParamsUrl: '/front/risk/batchCheck'
    }
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
