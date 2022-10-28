<template>
  <div class="empty_real_api">
    <el-row class="empty_real_api-header">
      <span class="empty_real_api-title">选择接口</span>
      <ul>
        <li
          v-for="item in tabData"
          :key="item.key"
          @click="tabClick(item.key)"
          :class="{ active: tabActive === item.key }"
        >
          {{ item.name }}
        </li>
      </ul>
    </el-row>
    <section>
      <emptyapi
        v-if="JSON.stringify(apisetData) !== '{}' && tabActive === 1"
        :apiset-data="apisetData"
        :api-domain="apiDomain"
      />
      <realtimeapi
        v-if="JSON.stringify(apisetData) !== '{}' && tabActive === 2"
        :apiset-data="apisetData"
        :api-domain="apiDomain"
      />
      <realtime-stardard
        v-if="JSON.stringify(apisetData) !== '{}' && tabActive === 3"
        :apiset-data="apisetData"
        :api-domain="apiDomain"
      />
    </section>
  </div>
</template>

<script>
import { ss } from '../utils/storage'
import Emptyapi from './Emptyapi'
import Realtimeapi from './Realtimeapi'
import RealtimeStardard from './RealtimeStardard'

export default {
  name: 'EmptyRealApi',
  components: { Emptyapi, Realtimeapi, RealtimeStardard },
  data() {
    return {
      tabActive: 1,
      tabData: [
        {
          name: '空号检测API',
          key: 1
        },
        {
          name: '实时查询API',
          key: 2
        },
        {
          name: '实时查询API标准版',
          key: 3
        }
      ],
      apisetData: {}, // api参数
      apiDomain: 'http://url/' // api域名
    }
  },
  computed: {},
  created() {
    this.tabActive =
      (this.$route.params && this.$route.params.id) ? this.$route.params.id : 1
    // console.log(this.tabActive)
  },
  mounted() {
    this.getApiData()
    this.getContractInfo()
  },
  methods: {
    tabClick(val) {
      this.tabActive = val
    },
    async getApiData() {
      if (JSON.parse(ss.get('customer')) && JSON.parse(ss.get('customer')).id) {
        const { data } = await this.$http.get(
          `/front/apiSettings/info/${JSON.parse(ss.get('customer')) ? JSON.parse(ss.get('customer')).id : ''}`
        )
        if (data.code !== 200) return this.$message.error(data.msg)
        this.apisetData = data.data
        // console.log(this.apisetData)
      } else {
        this.$message.error('暂不支持')
      }
    },
    // 获取联系人信息-API域名
    async getContractInfo() {
      const { data } = await this.$http.post('front/personal/getContractInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.apiDomain = data.data.apiDomain ? (data.data.apiDomain + '/') : 'http://url/'
    }
  }
}
</script>

<style lang="scss" scoped>
.empty_real_api {
  &-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  &-title {
    min-width: 48px;
    height: 32px;
    line-height: 32px;
  }
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    align-content: space-around;
    margin-left: 20px;
    flex-wrap: wrap;
    list-style: none;
    li {
      padding: 0 15px;
      text-align: center;
      height: 32px;
      line-height: 32px;
      border: 1px solid #e4e8eb;
      border-radius: 4px;
      margin-right: 10px;
      cursor: pointer;
      &.active {
        background-color: #689cfc;
        color: #fff;
      }
    }
  }
}
</style>
