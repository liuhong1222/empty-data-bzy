<template>
  <div id="app">
    <router-view />
    <el-dialog
      :visible.sync="dialogVisible"
      title="空号检测服务协议"
      :close-on-click-modal="false"
      class="agreement"
    >
      <div class="dialog">
        <div class="details-content" v-html="content">
          <!-- <p style="text-align: center" class="MsoNormal" align="center">
            <strong>云信通-空号检测服务协议</strong>
          </p>
          <p class="MsoNormal">1. 服务条款概述</p>
          <p class="MsoNormal">
            本服务条款是云信通-空号检测（以下简称“云信通”）与
            用户之间关于使用云信通-空号检测服务所订立的协议。“云信通”是指大连云信通文化传播有限公司及其相关服务可能存在的运营关联单位。“用户”是指注册、登录、使用云信通软件的个人或组织，在本协议中称为“您”。
          </p>
          <p class="MsoNormal">
            云信通在此特别提醒：您欲访问和使用云信通所提供的服务，必须认真阅读本服务协议中各条款，包括用户使用规范和责任限制及免责条款。请您审阅并接受或不接受本服务条款，如您不同意本服务协议条款及/或随时对其的修改，您应不使用或主动停止接受云信通提供的服务，您的使用行为将被视为您对本服务条款全部的完全接受，包括接受云信通服务平台对服务条款随时所做的任何修改。
          </p>
          <p class="MsoNormal">
            1.1 本协议的内容包括以下条款及云信通已经发布的或将来可能发布的各项规则，所有规则为本协议不可分割的一部分，与协议正文具有同等法律效力。本协议是您与云信通共同签订的，适用于您在云信通的全部活动。在您注册成为用户时，您已经阅读、理解并接受本协议的全部条款及各项规则，并承诺遵守中国的各类法律、法规、政策的规定，如有违反而导致任何法律后果的发生，您将以自己的名义独立承担所有相应的法律责任。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            1.2 云信通有权根据相关法律、法规、政策的要求及提供服务的需要不时地修改本协议或根据本协议制定、修改各类具体规则并在云信通相关系统版块发布，请您适时注意本协议及具体规则的变更。若您在本协议及具体规则内容公告变更后继续使用本服务的，表示您已经阅读、理解并接受修改后的协议和具体规则内容，也将遵循修改后的协议和具体规则使用云信通的服务；对于您在协议和具体规则修订前通过云信通接受的数据检测服务，视为您已同意并已按照本协议及有关规则进行了相应的授权和追认。若您不同意修改后的协议内容，您应立即停止使用云信通相关的服务。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            1.3 本服务条款适用于云信通提供的各种服务，但当您使用云信通某一特定服务时，如该服务另有单独的服务条款、指引或规则，您应同时遵守本服务条款及云信通随时公布的与该服务相关的服务条款、指引或规则等。前述所有的指引和规则，均构成本服务条款的一部分。除非本服务条款另有其他明示规定，新推出的产品或服务、增加或强化目前本服务的任何新功能，均受到本服务条款之规范。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            1.4 依本服务条款所取得的服务权利只能由注册者本人使用，不可转让给第三人。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            1.5 云信通有权依据法律法规及本服务条款的规定对您的使用行为或服务进行检查和监督。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">2. 注册及账号安全</p>
          <p class="MsoNormal">
            2.1 您在完成注册程序或实际使用本服务时，应当是具备完全民事行为能力和与所从事的民事行为相适应的行为能力的自然人、法人或其他组织，如您不具备上述主体资格，云信通有权自动注销您的账户。未成年人不得使用本服务，否则您和您的监护人须承担您行为导致的一切法律后果和赔偿责任，同时给云信通造成损失的，云信通有权向您及您的监护人索赔。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            2.2 您向云信通提供的用户资料须属于您本人（包括但不限于：姓名、地址、手机号等）且真实、准确、完整及有效，符合中华人民共和国有关法律法规的规定，不侵犯任何第三方合法权益。若您冒用、盗用他人信息注册和使用云信通提供的服务，所导致的一切后果由您个人承担。若因您的违法违规行为，导致云信通陷入争议或诉讼纠纷，您应向云信通赔偿一切损失。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            2.3 您应当妥善保管用户名和密码，且需对用户名和密码的安全负全部责任，同时对以用户名进行的所有活动和事件负全责。云信通无法对非法或未经您授权使用您帐号及密码的行为作出甄别，因此云信通不承担您账号被盗用、冒用的任何责任。您同意并承诺做到∶当您的的帐号遭到盗用、冒用或发生其他任何安全问题时，您会立即有效通知云信通来获得帮助和处理。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">3. 用户使用规范</p>
          <p class="MsoNormal">您不得利用云信通的服务从事下列行为：</p>
          <p class="MsoNormal">3.1</p>
          <p class="MsoNormal">（1）违反国家法律、法规和行业政策开展业务；</p>
          <p class="MsoNormal">
            （2）向用户发送违反国家法律、法规、国家政策和公序良俗的信息；
          </p>
          <p class="MsoNormal">
            （3）向用户发送政治类信息、违法犯罪信息、涉黄信息、SP诱骗定制信息或第三方广告或其它信息；
          </p>
          <p class="MsoNormal">（4）未经客户允许向其发送商业广告或其他信息；</p>
          <p class="MsoNormal">（5）发布可能产生重大负面社会影响的短信；</p>
          <p class="MsoNormal">
            （6）违反《互联网信息服务管理办法》第十五条的规定，发送含有以下内容的信息（“九不准”）：
          </p>
          <p class="MsoNormal">①违反宪法确定的基本原则的；</p>
          <p class="MsoNormal">
            ②危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
          </p>
          <p class="MsoNormal">③损害国家荣誉和利益的；</p>
          <p class="MsoNormal">④煽动民族仇恨、民族歧视，破坏民族团结的；</p>
          <p class="MsoNormal">⑤破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
          <p class="MsoNormal">⑥散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
          <p class="MsoNormal">
            ⑦散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；
          </p>
          <p class="MsoNormal">⑧侮辱或者诽谤他人，侵害他人合法权益的；</p>
          <p class="MsoNormal">⑨含有法律、行政法规禁止的其他内容的。</p>
          <p class="MsoNormal">
            （7）违反中华人民共和国公安部发出的《关于依法开展治理手机违法短信息有关工作的通知》（公通字【2005】77号），发送含有以下内容的信息：
          </p>
          <p class="MsoNormal">
            ①假冒银行或银联名义进行诈骗或者敲诈勒索公私财物的信息；
          </p>
          <p class="MsoNormal">
            ②散布淫秽、色情、赌博、暴力、凶杀、恐怖内容或者教唆犯罪、传授犯罪方法的信息；
          </p>
          <p class="MsoNormal">
            ③非法销售枪支、弹药、爆炸物、走私车、毒品、迷魂药、淫秽物品、假钞假发票或者明知是犯罪所得赃物的信息；
          </p>
          <p class="MsoNormal">
            ④发布假中奖、假婚介、假招聘，或者引诱、介绍他人卖淫嫖娼的信息；
          </p>
          <p class="MsoNormal">
            ⑤多次发送干扰他人正常生活的，以及含有其他违反宪法、法律、行政法规禁止性规定内容的信息。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            3.2 发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">3.3 涉及他人隐私、个人信息或资料的内容；</p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            3.4 发表、传送、传播骚扰信息、广告信息及垃圾信息或含有任何性或性暗示的内容；
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            3.5 其他违反法律法规、政策及公序良俗、社会公德或干扰云信通正常运营和侵犯其他用户或第三方合法权益内容的信息。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">4. 责任限制及免责条款</p>
          <p class="MsoNormal">
            4.1 您理解并同意，云信通提供的技术工具合法、中立，由您付费购买后自主使用。由于云信通不能预知您的使用目的，您不得利用云信通的数据服务进行本协议第3条所规范的干扰云信通正常运营、以及侵犯其他用户或第三方合法权益的行为，一经发现云信通将立即停止对您的服务，同时，云信通不承担您侵权行为所导致的任何法律责任。如您违反使用规范给云信通造成负面影响导致云信通无法正常运营并遭受经济损失的，云信通有权向您索偿。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            4.2 鉴于网络服务的特殊性，您同意云信通会变更、中断部分或全部的网络服务，并按本协议规定删除您在使用服务中提交的任何资料，而无需通知您，也无需承担任何责任。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            4.3 您理解并同意，因业务发展需要，云信通保留单方面对本服务的全部或部分服务内容在任何时候不经任何通知的情况下变更、暂停、限制、终止或撤销的权利，用户需承担此风险。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            4.4 用户在使用本服务时，须自行承担如下云信通不可掌控的风险内容，包括但不限于：
          </p>
          <p class="MsoNormal">
            （1）由于受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏等不可抗拒因素可能引起的信息丢失、泄漏等风险；
          </p>
          <p class="MsoNormal">
            （2）用户或云信通的电脑软件、系统、硬件和通信线路出现故障；
          </p>
          <p class="MsoNormal">（3）用户操作不当使用本服务；</p>
          <p class="MsoNormal">（4）其他云信通无法控制或合理预见的情形。</p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            4.5 云信通依据本协议约定获得处理违法违规内容或行为的权利，该权利不构成云信通的义务或承诺，云信通不能保证及时发现违法违规情形或进行相应处理。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            4.6 若云信通发现您因包括但不限于组织机构解散、注销、被吊销等任何原因导致民事行为能力、民事权利能力终止的情况，为保障用户和其他主体的合法权益，将有权决定立即终止本服务，且无需承担任何责任。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">5.其他</p>
          <p class="MsoNormal">
            5.1 本协议签订地为辽宁省大连市甘井子区爱贤街10号。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            5.2 若您和云信通之间发生任何纠纷或争议，应友好协商解决；协商不成的，您同意双方均可向协议签订地法院起诉。
          </p>
          <p class="MsoNormal"></p>
          <p class="MsoNormal">
            5.3 用户对服务之任何部分或本服务条款的任何部分之意见及建议可通过公司电话与云信通联系，云信通保留本服务条款之解释权。
          </p> -->
        </div>
        <div style="font-weight: 700; margin: 15px 0">
          <el-checkbox v-model="checked"></el-checkbox>
          <span style="margin-left: 5px">我已阅读并同意该协议</span>
        </div>
        <div slot="footer" style="width: 100%; text-align: center">
          <el-button
            type="primary"
            :disabled="!checked"
            @click="dialogVisible = false"
            >确 定</el-button
          >
        </div>
      </div>
    </el-dialog>
    <certification />
  </div>
</template>

<script>
import certification from './components/certification'
export default {
  components: {
    certification
  },
  data() {
    return {
      checked: true,
      dialogVisible: false,
      content: '',
      isFirst: false
    }
  },
  methods: {
    dealIE(data) {
      var theUA = window.navigator.userAgent.toLowerCase()
      if (
        (theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) ||
        (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])
      ) {
        var ieVersion =
          theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] ||
          theUA.match(/trident\s?\d+/)[0]
        if (ieVersion < 11) {
          console.log('data---' + data)
          var str = '你的浏览器版本太low了,已经和时代脱轨了 :'
          var str2 =
            "推荐使用:<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:blue;'>谷歌</a>," +
            "<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E7%81%AB%E7%8B%90%E6%B5%8F%E8%A7%88%E5%99%A8' target='_blank' style='color:blue;'>火狐</a>," +
            '其他双核极速模式'
          var str3 = '联系方式：' + data.data.domainContactWay || ''
          document.writeln(
            "<pre style='text-align:center;color:#fff;background-color:rgb(56, 120, 172); height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234'>" +
              "<h2 style='padding-top:200px;margin:0'><strong>" +
              str +
              '<br/></strong></h2><h2>' +
              str2 +
              "</h2><h2 style='margin:0'><strong>如果你使用的是双核浏览器,请切换到极速(高速)模式 / 兼容模式访问，如果仍然不能访问，请考虑以上两条建议<br/></strong></h2><h2><strong>" +
              str3 +
              '</h2></strong></pre>'
          )
          document.execCommand('Stop')
        }
      }
    },
    async getLogo() {
      // debugger
      const { data } = await this.$http.get('front/siteInfo')
      this.content = data.data.agreement
      this.dealIE(data)
      // console.log(this.content)
      // console.log(this.isFirst)
      // if (!this.content) {
      //   this.dialogVisible = false
      // }
      // 代理商网站设置
      document.title = data.data.siteName || ''
      document
        .querySelector('meta[name="keywords"]')
        .setAttribute('content', data.data.seoKeywords)
      document
        .querySelector('meta[name="description"]')
        .setAttribute('content', data.data.seoDescription)
      // icon
      let link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement('link')
      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      link.href = this.downloadDomain + data.data.agentIcon
      document.getElementsByTagName('head')[0].appendChild(link)

      // debugger
      if (data.data?.la51Src) {
        const srcList = data.data?.la51Src.split(',')
        srcList.map((src) => this.loadJS(src))
      }
      if (data.data?.baiduSrc) {
        window._hmt = window._hmt || []
        this.loadJS(data.data?.baiduSrc)
      }
    },
    loadJS(src) {
      var hm = document.createElement('script')
      hm.src = src
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    }
  },
  created() {
    this.getLogo()
  },
  watch: {
    $route: {
      handler: function (route, oldRoute) {
        // debugger
        if (oldRoute !== undefined && oldRoute.path === '/login') {
          // console.log(this.content)
          if (this.content) {
            this.dialogVisible = true
          }
          // this.isFirst = true
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.agreement .el-dialog__headerbtn {
  display: none;
}
.agreement .el-dialog__body {
  padding: 18px;
}
.details-content {
  max-height: 400px;
  overflow-y: auto;
}
</style>
