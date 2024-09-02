<template>
  <div class="secure">
    <el-card>
      <el-row>
        <el-col :span="24">
          <div class="safety-title">
            <div class="i-title">
              <img src="../assets/img/zhanghuanqvan.png" />
              <div class="title">账户安全</div>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            <p class="_title">当前安全等级</p>
            <el-col>
              <div class="level">
                <p>
                  当前账户安全等级为：<strong style="color: rgb(40, 184, 140)"
                    >强</strong
                  >
                </p>
                <div class="ul">
                  <div class="li">
                    <div class="box"></div>
                    <div class="name">弱</div>
                  </div>
                  <div class="li">
                    <div class="box"></div>
                    <div class="name">中</div>
                  </div>
                  <div class="li active">
                    <div class="box"></div>
                    <div class="name">强</div>
                  </div>
                </div>
                <p class="des">为了账户更好的安全保障，可以完善更多设置</p>
              </div>
              <div class="sets">
                <div class="set-item">
                  <div class="title">
                    <h4><i class="iconfont iconmima icon"></i>登录密码</h4>
                    <div class="title-info">
                      密码强度
                      <strong style="color: rgb(40, 184, 140)">强</strong>
                    </div>
                  </div>
                  <div class="set-des">
                    安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位以上的密码
                  </div>
                  <el-button
                    size="small"
                    icon="iconfont iconxiugaimima"
                    @click="dialogVisiblePassword = true"
                    class="button"
                  >
                    {{
                      personalInfo.password ? '修改' : '添加'
                    }}账号密码</el-button
                  >
                  <el-button
                    style="margin-left: 70px"
                    size="small"
                    icon="iconfont iconwangjimima"
                    @click="forgetPassword"
                    v-if="personalInfo.password"
                    class="button"
                  >
                    忘记账号密码</el-button
                  >
                </div>
                <div class="set-item">
                  <div class="title">
                    <h4>
                      <i class="iconfont iconshoujihaoma icon"></i>手机号码
                    </h4>
                  </div>
                  <div class="set-des" style="padding-top: 0px">
                    <p v-if="personalInfo.phone" style="padding-bottom: 5px">
                      当前手机号： <strong>{{ personalInfo.phone }}</strong>
                    </p>
                    绑定手机号码可以方便登录，用户收发短信快速获得即时消息。忘记密码时,或修改其他信息时有用
                  </div>
                  <el-button
                    size="small"
                    icon="iconfont iconcaozuo-xunhuan"
                    @click="dialogVisibleNumber = true"
                    class="button"
                  >
                    重新绑定</el-button
                  >
                </div>
                <div class="set-item">
                  <div class="title">
                    <h4>
                      <img src="../assets/img/balance_mind_icon.svg" alt="icon" />
                      余额提醒
                    </h4>
                  </div>
                  <div class="set-des">
                    产品余额低于设置的值时，系统会发送提醒信息到联系人手机号
                  </div>
                  <el-button
                    size="small"
                    icon="iconfont iconcaozuo-xunhuan"
                    @click="clickBalanceMind"
                    class="button"
                  >
                    设置余额提醒</el-button
                  >
                </div>
              </div>
              <div class="sets towsets">
                <div class="set-item">
                  <div class="title">
                    <h4><i class="iconfont iconyouxiang icon"></i>邮箱绑定</h4>
                  </div>
                  <div class="set-des">
                    <p v-if="personalInfo.email">
                      当前邮箱：<strong>{{ personalInfo.email }}</strong>
                    </p>
                    绑定邮箱可以使用邮箱当做您的登陆账户
                  </div>
                  <el-button
                    size="small"
                    icon="iconfont iconbangding"
                    @click="dialogVisibleEmail = true"
                    class="button"
                  >
                    {{ personalInfo.email ? '修改' : '绑定' }}邮箱</el-button
                  >
                </div>
                <div class="set-item">
                  <div class="title">
                    <h4>
                      <img src="../assets/img/zip_pass.svg" alt="icon" />
                      压缩密码
                    </h4>
                  </div>
                  <div class="set-des">
                    设置压缩密码可以使检测的结果包更安全，解压文件包时需要此压缩密码解压
                  </div>
                  <el-button
                    size="small"
                    icon="iconfont iconxiugaimima"
                    @click="zipVisibleShow()"
                    class="button"
                  >
                    {{
                      personalInfo.unzipPassword ? '修改' : '添加'
                    }}解压密码</el-button
                  >
                  <el-button
                    style="margin-left: 70px"
                    size="small"
                    icon="iconfont iconwangjimima"
                    @click="forgetZip"
                    v-if="personalInfo.unzipPassword"
                    class="button"
                  >
                    忘记解压密码</el-button
                  >
                </div>
              </div>
            </el-col>
          </div>
        </el-col>
        <!-- <el-col :span="24" style="margin-top: 20px;">
          <div>
            <p class="_title">登录日志</p>
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="今日登录" name="today">
                <el-col :span="12">
                  <el-table :data="tableData1" style="width: 100%;margin-bottom:12px;" border>
                    <el-table-column prop="createTime" label="登录时间"></el-table-column>
                    <el-table-column prop="ip" label="IP"></el-table-column>
                    <el-table-column prop="area" label="登录地点"></el-table-column>
                  </el-table>
                  <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="queryInfo1.current"
                    :page-sizes="[10, 15, 20, 25, 30]"
                    :page-size="queryInfo1.size"
                    layout="total, prev, pager, next, sizes, jumper"
                    :total="total1"
                  ></el-pagination>
                </el-col>
              </el-tab-pane>
              <el-tab-pane label="历史登录" name="history">
                <el-col :span="12">
                  <el-table :data="tableData2" style="width: 100%;margin-bottom:12px;" border>
                    <el-table-column prop="createTime" label="登录时间"></el-table-column>
                    <el-table-column prop="ip" label="IP"></el-table-column>
                    <el-table-column prop="area" label="登录地点"></el-table-column>
                  </el-table>
                  <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="queryInfo2.current"
                    :page-sizes="[10, 15, 20, 25, 30]"
                    :page-size="queryInfo2.size"
                    layout="total, prev, pager, next, sizes, jumper"
                    :total="total2"
                  ></el-pagination>
                </el-col>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col> -->
      </el-row>
    </el-card>

    <!-- 添加修改忘记账号密码弹框 -->
    <el-dialog
      :visible.sync="dialogVisiblePassword"
      width="420px"
      :close-on-click-modal="false"
      @close="DialogClosed"
    >
      <div class="bindNumber">
        <p class="title">安全验证</p>
        <el-form
          :model="editPasswordForm"
          :rules="FormRules"
          ref="editPasswordFormRef"
          class="password_form"
          label-width="70px"
          label-position="left"
        >
          <div class="box" v-if="verify === 1">
            <p>
              绑定手机 <span>{{ personalInfo.phone }}</span>
            </p>
            <el-form-item label="验证码" prop="code">
              <el-input
                class="input"
                v-model="forgetPasswordForm.code"
                placeholder="请输入验证码"
              ></el-input>
              <el-button size="small" @click="getYzm" v-show="show"
                >获取验证码</el-button
              >
              <el-button
                size="small"
                class="button"
                v-cloak
                v-show="!show"
                v-bind:class="{ huise: !show }"
                >重新获取({{ counter }}s)</el-button
              >
            </el-form-item>
            <el-button
              style="margin: 8px 10px 10px 0"
              size="small"
              @click="submitVerify"
              >提交并验证</el-button
            >
            <el-button size="small" @click="dialogVisiblePassword = false"
              >取消</el-button
            >
          </div>
          <div class="box" v-if="verify == 0 || verify == 2">
            <p>
              账号 <span>{{ personalInfo.phone }}</span>
            </p>
            <el-form-item
              label="原始密码"
              prop="oldPassword"
              v-if="personalInfo.password && verify != 2"
            >
              <el-input
                v-model="editPasswordForm.oldPassword"
                type="password"
                placeholder="请输入原始密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input
                v-model="editPasswordForm.newPassword"
                type="password"
                placeholder="请输入数字,字母等任意组合的6-16位字符"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                v-model="editPasswordForm.confirmPassword"
                type="password"
                placeholder="请再次输入新的密码"
              ></el-input>
            </el-form-item>
            <el-button
              :loading="btnLoading"
              style="margin: 8px 10px 10px 0"
              size="small"
              @click="submitForgetPassword"
              v-if="flag === 1"
              >提交</el-button
            >
            <el-button
              :loading="btnLoading"
              style="margin: 8px 10px 10px 0"
              size="small"
              @click="submitPassword"
              v-else
              >提交</el-button
            >
            <el-button size="small" @click="dialogVisiblePassword = false"
              >取消</el-button
            >
          </div>
        </el-form>
      </div>
    </el-dialog>

    <!-- 添加手机号码弹框 -->
    <el-dialog
      :visible.sync="dialogVisibleNumber"
      width="420px"
      :close-on-click-modal="false"
      @close="DialogClosed2"
    >
      <div class="bindNumber">
        <p class="title">安全验证</p>
        <el-form
          :model="editNumberForm"
          :rules="FormRules"
          ref="editNumberFormRef"
          class="password_form"
          label-width="70px"
          label-position="left"
        >
          <div class="box" v-if="verify1 === false">
            <p>
              绑定手机 <span>{{ personalInfo.phone }}</span>
            </p>
            <el-form-item label="验证码" prop="oldCode">
              <el-input
                class="input"
                v-model="editNumberForm.oldCode"
                placeholder="请输入验证码"
              ></el-input>
              <el-button size="small" @click="getYzm1" v-show="show1"
                >获取验证码</el-button
              >
              <el-button
                size="small"
                class="button"
                v-cloak
                v-show="!show1"
                v-bind:class="{ huise: !show1 }"
                >重新获取({{ counter1 }}s)</el-button
              >
            </el-form-item>
            <el-button
              style="margin: 8px 10px 10px 0"
              size="small"
              @click="submitVerify1"
              >提交并验证</el-button
            >
            <el-button size="small" @click="dialogVisibleNumber = false"
              >取消</el-button
            >
          </div>
          <div class="box" v-if="verify1 === true">
            <el-form-item label="手机" prop="newPhone">
              <el-input
                v-model="editNumberForm.newPhone"
                placeholder="请输入新的手机号"
                :disabled="notChange"
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="newCode">
              <el-input
                class="input"
                v-model="editNumberForm.newCode"
                placeholder="请输入验证码"
              ></el-input>
              <el-button size="small" @click="getYzm2" v-show="show2"
                >获取验证码</el-button
              >
              <el-button
                size="small"
                class="button"
                v-cloak
                v-show="!show2"
                v-bind:class="{ huise: !show1 }"
                >重新获取({{ counter2 }}s)</el-button
              >
            </el-form-item>
            <el-button
              :loading="btnLoading"
              style="margin: 8px 10px 10px 0"
              size="small"
              @click="submitNumber"
              >提交并验证</el-button
            >
            <el-button size="small" @click="dialogVisibleNumber = false"
              >取消</el-button
            >
          </div>
        </el-form>
      </div>
    </el-dialog>

    <!-- 添加邮箱弹框 -->
    <el-dialog
      :visible.sync="dialogVisibleEmail"
      width="420px"
      :close-on-click-modal="false"
      @close="DialogClosed3"
    >
      <div class="bindNumber">
        <p class="title">安全验证</p>
        <el-form
          :model="editEmailForm"
          :rules="FormRules"
          ref="editEmailFormRef"
          class="password_form"
          label-width="60px"
          label-position="left"
        >
          <div class="box" v-if="verify2 === true">
            <p>
              绑定手机 <span>{{ personalInfo.phone }}</span>
            </p>
            <el-form-item label="验证码" prop="code">
              <el-input
                class="input"
                v-model="editEmailForm.code"
                placeholder="请输入验证码"
              ></el-input>
              <el-button size="small" @click="getYzm3" v-show="show3"
                >获取验证码</el-button
              >
              <el-button
                size="small"
                class="button"
                v-cloak
                v-show="!show3"
                v-bind:class="{ huise: !show3 }"
                >重新获取({{ counter3 }}s)</el-button
              >
            </el-form-item>
            <el-button
              :loading="btnLoading"
              style="margin: 8px 10px 10px 0"
              size="small"
              @click="submitVerify2"
              >提交并验证</el-button
            >
            <el-button size="small" @click="dialogVisibleEmail = false"
              >取消</el-button
            >
          </div>
          <div class="box" v-if="verify2 === false">
            <p>
              账号 <span>{{ personalInfo.phone }}</span>
            </p>
            <el-form-item label="新邮箱" prop="email">
              <el-input
                v-model="editEmailForm.email"
                placeholder="请输入新邮箱"
              ></el-input>
            </el-form-item>
            <el-button
              :loading="btnLoading"
              style="margin: 8px 10px 10px 0"
              size="small"
              @click="submitEmail"
              >保存</el-button
            >
            <el-button size="small" @click="dialogVisibleEmail = false"
              >取消</el-button
            >
          </div>
        </el-form>
      </div>
    </el-dialog>

    <!-- 添加解压密码 -->
    <el-dialog
      :visible.sync="dialogVisibleZipAdd"
      width="420px"
      :close-on-click-modal="false"
      @close="DialogClosed5"
    >
      <div class="bindNumber">
        <p class="title">安全验证</p>
        <el-form
          :model="addZipForm"
          :rules="FormRules"
          ref="AddZipFormRef"
          class="password_form"
          label-width="70px"
          label-position="left"
        >
          <div class="box" v-if="zipVerify === 1">
            <p>
              绑定手机 <span>{{ personalInfo.phone }}</span>
            </p>
            <el-form-item label="验证码" prop="code">
              <el-input
                class="input"
                v-model="forgetZipForm.code"
                placeholder="请输入验证码"
              ></el-input>
              <el-button size="small" @click="getYzm" v-show="show"
                >获取验证码</el-button
              >
              <el-button
                size="small"
                class="button"
                v-cloak
                v-show="!show"
                v-bind:class="{ huise: !show }"
                >重新获取({{ counter }}s)</el-button
              >
            </el-form-item>
            <el-button
              style="margin: 8px 10px 10px 0"
              size="small"
              @click="submitZipVerify"
              >提交并验证</el-button
            >
            <el-button size="small" @click="dialogVisibleZipEdit = false"
              >取消</el-button
            >
          </div>
          <div class="box" v-if="zipVerify == 0 || zipVerify == 2">
            <p>
              账号 <span>{{ personalInfo.phone }}</span>
            </p>
            <el-form-item label="新密码" prop="newZipPass">
              <el-input
                v-model="addZipForm.newZipPass"
                type="password"
                placeholder="请输入数字,字母等任意组合的6-16位字符"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmZipPass">
              <el-input
                v-model="addZipForm.confirmZipPass"
                type="password"
                placeholder="请再次输入新的密码"
              ></el-input>
            </el-form-item>
            <div class="remark" v-if="personalInfo.unzipPassword">
              <p>
                本次修改/取消操作仅对操作后的检测生效，本次操作前的所有检测包只能用之前的密码解压，请您牢记之前的密码，以免无法查看之前的检测结果。
              </p>
            </div>
            <el-button
              :loading="btnLoading"
              style="margin: 8px 10px 10px 0"
              size="small"
              @click="submitAddZip"
              >提交</el-button
            >
            <el-button size="small" @click="dialogVisibleZipAdd = false"
              >取消</el-button
            >
          </div>
        </el-form>
      </div>
    </el-dialog>

    <!-- 修改解压密码 -->
    <el-dialog
      :visible.sync="dialogVisibleZipEdit"
      width="420px"
      :close-on-click-modal="false"
      @close="DialogClosed4"
    >
      <div class="bindNumber">
        <p class="title">安全验证</p>
        <el-form
          :model="editZipForm"
          :rules="FormRules"
          ref="editZipFormRef"
          class="password_form"
          label-width="70px"
          label-position="left"
        >
          <div class="box">
            <p>
              账号 <span>{{ personalInfo.phone }}</span>
            </p>
            <el-form-item label="原始密码" prop="oldPass">
              <el-input
                v-model="editZipForm.oldPass"
                type="password"
                placeholder="请输入原始密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass">
              <el-input
                v-model="editZipForm.newPass"
                type="password"
                placeholder="请输入数字,字母等任意组合的6-16位字符"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPass">
              <el-input
                v-model="editZipForm.confirmPass"
                type="password"
                placeholder="请再次输入新的密码"
              ></el-input>
            </el-form-item>
            <div class="remark" v-if="personalInfo.unzipPassword">
              <p>1：修改密码：旧密码+新密码+确认新密码；</p>
              <p>2：取消密码：旧密码+不填新密码+不填确认新密码；</p>
              <p>
                本次修改/取消操作仅对操作后的检测生效，本次操作前的所有检测包只能用之前的密码解压，请您牢记之前的密码，以免无法查看之前的检测结果。
              </p>
            </div>
            <el-button
              :loading="btnLoading"
              style="margin: 8px 10px 10px 0"
              size="small"
              @click="submitZip"
              >提交</el-button
            >
            <el-button size="small" @click="dialogVisibleZipEdit = false"
              >取消</el-button
            >
          </div>
        </el-form>
      </div>
    </el-dialog>

    <!-- 余额提醒 -->
    <el-dialog
      :visible.sync="balanceRemindShow"
      width="420px"
      :close-on-click-modal="false"
      @close="DialogClosed6"
    >
      <div class="bindNumber">
        <p class="title">设置余额提醒</p>
        <el-form
          :model="balanceRemindFrom"
          :rules="balanceRemindRules"
          ref="balanceRemindRef"
          class="password_form balance_mind"
          label-width="95px"
          label-position="left"
        >
          <div class="box">
            <el-form-item label="选择产品" prop="productType">
              <el-select v-model="balanceRemindFrom.productType" style="width: 252px;" @change="handleProductChange">
                <el-option
                  v-for="item in productTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="提醒余额" prop="warningCount" class="balance_mind_number">
              <el-input-number
                v-model="balanceRemindFrom.warningCount"
                controls-position="right"
                :min="1"
                :precision='0'
                placeholder="请输入提醒余额"
                style="width: 228px;"
              >
              </el-input-number>
              <span class='count-unit'>条</span>
              <p class="count-note">产品余额低于该值时，系统会发送提醒信息到联系人手机号</p>
            </el-form-item>
            <el-form-item label="联系人手机号" prop="informMobiles">
              <el-input
                v-model="balanceRemindFrom.informMobiles"
                placeholder='请输入联系人手机号，多个号码以英文逗号分隔'
                type='textarea'
                style="width: 252px;"
              ></el-input>
            </el-form-item>
            <el-button
              :loading="btnLoading"
              style="margin: 8px 10px 10px 0"
              size="small"
              @click="submitBalanceMind"
              >提交</el-button
            >
            <el-button size="small" @click="balanceRemindShow = false"
              >取消</el-button
            >
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ss } from '../utils/storage'

export default {
  data() {
    // 验证手机号
    let checkMobile = (rule, value, cb) => {
      const regMobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (regMobile.test(value)) return cb()
      cb(new Error('请输入合法的手机号'))
    }
    // 密码
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.editPasswordForm.newPassword !== '') {
          this.$refs.editPasswordFormRef.validateField('confirmPassword')
        }
        callback()
      }
    }
    // 确认密码
    let validatePass2 = (rule, value, callback) => {
      if (value !== this.editPasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 验证邮箱
    let checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) return cb()
      cb(new Error('请输入合法的邮箱'))
    }
    // 验证添加解压密码
    let checkConfirmZipPass = (rule, value, callback) => {
      // console.log(this.addZipForm)
      if (value !== this.addZipForm.newZipPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 验证确认解压密码
    let checkConfirmPass = (rule, value, callback) => {
      // console.log(this.editZipForm)
      // if (value !== this.editZipForm.newPass) {
      //   callback(new Error('两次输入密码不一致!'))
      // } else {
      //   callback()
      // }
    }
    return {
      personalInfo: {}, // 当前个人信息
      dialogVisiblePassword: false, // 添加、修改密码
      dialogVisibleNumber: false,
      dialogVisibleEmail: false,
      dialogVisibleZipEdit: false,
      activeName: 'today',
      verify: 0, // 忘记密码验证手机
      flag: 0,
      verify1: false,
      verify2: false,
      zipVerify: 0, // 忘记解压密码验证手机
      zipFlag: 0,
      // zipVerify: false,
      // zipVerify: false,
      tableData1: [],
      tableData2: [],
      queryInfo1: {
        page: 1,
        customerId: '',
        size: 10
      },
      queryInfo2: {
        page: 1,
        customerId: '',
        size: 10
      },
      total1: 0,
      total2: 0,
      editPasswordForm: {
        newPassword: '',
        confirmPassword: ''
      },
      forgetPasswordForm: {
        code: '',
        newPassword: '',
        confirmPassword: ''
      },
      editNumberForm: {
        oldCode: '',
        newPhone: '',
        newCode: ''
      },
      editEmailForm: {
        code: '',
        email: ''
      },
      addZipForm: {
        newZipPass: '',
        confirmZipPass: ''
      },
      editZipForm: {
        oldPass: '',
        newPass: '',
        confirmPass: ''
      },
      forgetZipForm: {
        code: '',
        newPass: '',
        confirmPass: ''
      },
      options: [], // 地区数据
      FormRules: {
        oldCode: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          }
        ],
        newCode: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          }
        ],
        oldPassword: [
          {
            required: true,
            message: '请输入原来的密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 15,
            message: '密码的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            validator: validatePass,
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '密码长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '密码长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        newPhone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        oldPass: [
          {
            required: true,
            message: '请输入原来的密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '密码的长度在6~16个字符之间',
            trigger: 'blur'
          }
        ],
        newPass: [
          {
            min: 6,
            max: 16,
            message: '密码的长度在6~16个字符之间',
            trigger: 'blur'
          }
        ],
        confirmPass: [
          {
            min: 6,
            max: 16,
            message: '密码的长度在6~16个字符之间',
            trigger: 'blur'
          },
          {
            validator: checkConfirmPass,
            trigger: 'blur'
          }
        ],
        newZipPass: [
          {
            required: true,
            min: 6,
            max: 16,
            message: '密码的长度在6~16个字符之间',
            trigger: 'blur'
          }
        ],
        confirmZipPass: [
          {
            required: true,
            min: 6,
            max: 16,
            message: '密码的长度在6~16个字符之间',
            trigger: 'blur'
          },
          {
            validator: checkConfirmZipPass,
            trigger: 'blur'
          }
        ]
      },
      verifyToken: '', // 短信验证token
      show: true,
      timer: null,
      counter: 60,
      show1: true,
      timer1: null,
      counter1: 60,
      show2: true,
      timer2: null,
      counter2: 60,
      show3: true,
      timer3: null,
      counter3: 60,
      notChange: false, // 能否修改新手机号
      btnLoading: false,
      dialogVisibleZipAdd: false,

      balanceRemindShow: false,
      productTypeOptions: [
        {
          label: '空号检测',
          value: '1'
        },
        {
          label: '实时检测',
          value: '2'
        },
        {
          label: '国际号码检测',
          value: '3'
        },
        {
          label: '定向通用检测',
          value: '4'
        },
        {
          label: 'line定向检测',
          value: '5'
        }
      ],
      balanceRemindInit: {},
      balanceRemindFrom: {
        productType: '1',
        warningCount: undefined,
        informMobiles: null
      },
      balanceRemindRules: {
        productType: [
          {
            required: true,
            message: '产品不能为空',
            trigger: 'blur'
          }
        ],
        warningCount: [
          {
            required: true,
            message: '提醒余额不能为空',
            trigger: 'blur'
          }
        ],
        informMobiles: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            // 多个手机号用英文逗号隔开
            pattern: /^1[3456789][0-9]{9}(,1[3456789][0-9]{9})*$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 提交修改密码
    async submitPassword() {
      this.$refs.editPasswordFormRef.validate(async (valid) => {
        if (!valid) return
        this.btnLoading = true
        this.editPasswordForm.customerId = this.personalInfo.id
        if (!this.personalInfo.password) {
          // 添加
          const { data } = await this.$http.post(
            'front/personal/addPassword',
            this.editPasswordForm
          )
          this.btnLoading = false
          if (data.code !== 200) return this.$message.error(data.msg)
          this.personalInfo.password = this.editPasswordForm.newPassword
          ss.set('personalInfo', JSON.stringify(this.personalInfo))
          this.$message.success('添加密码成功')
          this.logout()
        } else {
          // 修改
          const { data } = await this.$http.post(
            'front/personal/updatePassword',
            this.editPasswordForm
          )
          this.btnLoading = false
          if (data.code !== 200) return this.$message.error(data.msg)
          this.$message.success('修改密码成功')
          this.logout()
        }
        this.dialogVisiblePassword = false
      })
    },
    async logout() {
      const { data } = await this.$http.post('front/logout')
      if (data.code === 200) {
        ss.remove('token')
        ss.remove('customer')
        ss.remove('personalInfo')
        this.$router.push('/login')
      } else {
        this.$message.error(data.msg)
      }
    },
    forgetPassword() {
      this.dialogVisiblePassword = true
      this.flag = 1
      this.verify = 1
    },
    forgetZip() {
      this.dialogVisibleZipAdd = true
      this.zipFlag = 1
      this.zipVerify = 1
    },
    // 获取验证码
    async getYzm() {
      const { data } = await this.$http.post('front/customer/sendSms', {
        phone: this.personalInfo.phone
      })
      if (data.code !== 200) return this.$message.error(data.msg)
      // debugger
      this.verifyToken = data.data
      if (!this.timer) {
        this.counter = 60
        this.show = false
        this.timer = setInterval(() => {
          if (this.counter > 0 && this.counter <= 60) {
            this.counter--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    // 提交并验证
    async submitVerify() {
      const { data } = await this.$http.get(
        `front/customer/checkCodePwd/${this.verifyToken}/${this.forgetPasswordForm.code}`
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      this.verify = 2 // 忘记账号密码
      this.editPasswordForm.verifyToken = data.data
    },
    // 提交并验证
    async submitZipVerify() {
      const { data } = await this.$http.get(
        `front/customer/checkCodePwd/${this.verifyToken}/${this.forgetZipForm.code}`
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      this.editPasswordForm.verifyToken = data.data
      this.zipVerify = 2 // 忘记解压密码
      this.dialogVisibleZipEdit = false
      this.dialogVisibleZipAdd = true
    },
    // 忘记修改密码
    submitForgetPassword() {
      this.$refs.editPasswordFormRef.validate(async (valid) => {
        if (!valid) return
        this.btnLoading = true
        this.editPasswordForm.customerId = this.personalInfo.id
        let editPasswordForm = this.editPasswordForm
        delete editPasswordForm.oldPassword
        let obj = {
          phone: this.personalInfo.phone,
          code: this.forgetPasswordForm.code,
          password: this.editPasswordForm.newPassword,
          verifySmsToken: this.verifyToken
        }
        const { data } = await this.$http.post(
          'front/customer/forgetPassword',
          obj
        )
        this.btnLoading = false
        if (data.code !== 200) return this.$message.error(data.msg)
        this.$message.success('修改密码成功')
        this.dialogVisiblePassword = false
        this.logout()
      })
    },
    async getYzm1() {
      const { data } = await this.$http.post('front/customer/sendSms', {
        phone: this.personalInfo.phone
      })
      if (data.code !== 200) return this.$message.error(data.msg)
      // debugger
      this.editNumberForm.oldVerifyToken = data.data
      this.editNumberForm.oldPhone = this.personalInfo.phone
      if (!this.timer1) {
        this.counter1 = 60
        this.show1 = false
        this.timer1 = setInterval(() => {
          if (this.counter1 > 0 && this.counter1 <= 60) {
            this.counter1--
          } else {
            this.show1 = true
            clearInterval(this.timer1)
            this.timer1 = null
          }
        }, 1000)
      }
    },
    async getYzm2() {
      if (this.editNumberForm.newPhone.length < 0) { return this.$message.error('请先输入要绑定的手机号') }
      const { data } = await this.$http.post('front/customer/sendSms', {
        phone: this.editNumberForm.newPhone
      })
      // debugger
      if (data.code !== 200) return this.$message.error(data.msg)
      this.editNumberForm.newVerifyToken = data.data
      this.notChange = true
      if (!this.timer2) {
        this.counter2 = 60
        this.show2 = false
        this.timer2 = setInterval(() => {
          if (this.counter2 > 0 && this.counter2 <= 60) {
            this.counter2--
          } else {
            this.show2 = true
            clearInterval(this.timer2)
            this.timer2 = null
          }
        }, 1000)
      }
    },
    async getYzm3() {
      const { data } = await this.$http.post('front/customer/sendSms', {
        phone: this.personalInfo.phone
      })
      if (data.code !== 200) return this.$message.error(data.msg)
      this.verifyToken = data.data
      if (!this.timer3) {
        this.counter3 = 60
        this.show3 = false
        this.timer3 = setInterval(() => {
          if (this.counter3 > 0 && this.counter3 <= 60) {
            this.counter3--
          } else {
            this.show3 = true
            clearInterval(this.timer3)
            this.timer3 = null
          }
        }, 1000)
      }
    },
    async submitVerify1() {
      const { data } = await this.$http.get(
        `front/customer/verifySmsCode/${this.editNumberForm.oldVerifyToken}/${this.editNumberForm.oldCode}`
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      this.verify1 = true
    },
    // 提交修改手机号
    async submitNumber() {
      this.btnLoading = true
      const { data } = await this.$http.get(
        `front/customer/verifySmsCode/${this.editNumberForm.newVerifyToken}/${this.editNumberForm.newCode}`
      )
      this.btnLoading = false
      if (data.code !== 200) return this.$message.error(data.msg)

      this.$refs.editNumberFormRef.validate(async (valid) => {
        if (!valid) return
        const { data } = await this.$http.post(
          'front/customer/modifyMobile',
          this.editNumberForm
        )
        if (data.code !== 200) return this.$message.error(data.msg)
        this.$message.success('修改手机号成功')
        this.logout()
        this.dialogVisibleNumber = false
      })
    },
    async submitVerify2() {
      this.btnLoading = true
      const { data } = await this.$http.get(
        `/front/customer/verifySmsCode/${this.verifyToken}/${this.editEmailForm.code}`
      )
      this.btnLoading = false
      if (data.code !== 200) return this.$message.error(data.msg)
      this.verify2 = false
    },
    // 提交修改邮箱
    submitEmail() {
      this.$refs.editEmailFormRef.validate(async (valid) => {
        if (!valid) return
        this.btnLoading = true
        const { data } = await this.$http.post(
          `front/personal/addEmail/${this.personalInfo.id}/${this.editEmailForm.email}`
        )
        this.btnLoading = false
        if (data.code !== 200) return this.$message.error(data.msg)
        this.personalInfo.email = this.editEmailForm.email
        ss.set('personalInfo', JSON.stringify(this.personalInfo))
        let customer = JSON.parse(ss.get('customer'))
        customer.email = this.editEmailForm.email
        ss.set('customer', JSON.stringify(customer))
        ss.set('userInfo', JSON.stringify(customer))
        this.$message.success('添加成功')
        this.dialogVisibleEmail = false
      })
    },

    // 添加解压密码
    submitAddZip() {
      // console.log(this.addZipForm)
      this.$refs.AddZipFormRef.validate(async (valid) => {
        if (!valid) return
        this.btnLoading = true
        let url = ''
        let params = ''
        if (this.personalInfo.unzipPassword) {
          // 修改密码
          url = 'front/personal/updateUnzipPassword'
          params = {
            newUnzipPwd: this.addZipForm.newZipPass,
            newUnzipPwdRepeat: this.addZipForm.confirmZipPass
          }
        } else {
          // 添加密码
          url = 'front/personal/addUnzipPassword'
          params = {
            unzipPassword: this.addZipForm.newZipPass,
            unzipPasswordRepeat: this.addZipForm.confirmZipPass
          }
        }
        const { data } = await this.$http.post(url, params)
        this.btnLoading = false
        if (data.code !== 200) return this.$message.error(data.msg)
        this.$message.success('操作成功')
        this.dialogVisibleZipAdd = false
        this.getData()
      })
    },
    // 修改解压密码
    async submitZip() {
      // console.log('submitZip')
      // console.log(this.zipVerify)
      // console.log(this.zipFlag)
      // this.$refs.editZipFormRef.validate(async valid => {
      // if (!valid) return
      if (!this.editZipForm.oldPass) {
        this.$message.error('请输入旧密码')
        return
      }
      this.btnLoading = true
      let url = ''
      let params = ''
      url = 'front/personal/updateUnzipPassword'
      params = {
        oldUnzipPwd: this.editZipForm.oldPass,
        newUnzipPwd: this.editZipForm.newPass,
        newUnzipPwdRepeat: this.editZipForm.confirmPass
      }
      const { data } = await this.$http.post(url, params)
      // console.log(data)
      this.btnLoading = false
      if (data.code !== 200) return this.$message.error(data.msg)
      this.$message.success('操作成功')
      this.dialogVisibleZipEdit = false
      this.getData()
      // })
    },
    clickBalanceMind() {
      this.balanceRemindShow = true
      this.getProductData(this.balanceRemindFrom.productType)
    },
    handleProductChange(value) {
      this.getProductData(value)
    },
    // 获取余额提醒回显数据
    async getProductData(value) {
      let url = '/front/warning/findOne'
      const paramsForm = new FormData()
      paramsForm.append('productType', this.balanceRemindFrom.productType)
      const { data } = await this.$http.post(url, paramsForm)
      if (data.code !== 200) return this.$message.error(data.msg)

      if (data.data) {
        this.balanceRemindFrom.informMobiles = data.data.informMobiles
        this.balanceRemindFrom.warningCount = data.data.warningCount
        this.balanceRemindInit.id = data.data.id
      } else {
        this.balanceRemindFrom.informMobiles = null
        this.balanceRemindFrom.warningCount = undefined
        this.balanceRemindInit.id = null
      }
    },
    // 设置余额提醒
    submitBalanceMind() {
      this.$refs.balanceRemindRef.validate(async (valid) => {
        if (!valid) return
        this.btnLoading = true
        let url = 'front/warning/modify'
        let params = {
          id: this.balanceRemindInit.id || undefined,
          productType: this.balanceRemindFrom.productType,
          warningCount: this.balanceRemindFrom.warningCount,
          informMobiles: this.balanceRemindFrom.informMobiles
        }
        const { data } = await this.$http.post(url, params)
        this.btnLoading = false
        if (data.code !== 200) return this.$message.error(data.msg)
        this.$message.success('设置余额提醒成功')
        this.balanceRemindShow = false
      })
    },
    // 对话框关闭事件
    DialogClosed() {
      this.$refs.editPasswordFormRef.resetFields()
      this.forgetPasswordForm.code = ''
      this.verify = 0
      this.flag = 0
    },
    DialogClosed2() {
      this.$refs.editNumberFormRef.resetFields()
      this.verify1 = false
    },
    DialogClosed3() {
      this.$refs.editEmailFormRef.resetFields()
      if (this.personalInfo.email != null) this.verify2 = true
      this.editEmailForm.code = ''
    },
    DialogClosed4() {
      this.$refs.editZipFormRef.resetFields()
      this.dialogVisibleZipEdit = false
      this.forgetZipForm.code = ''
      this.zipVerify = 0
      this.zipFlag = 0
    },
    DialogClosed5() {
      this.$refs.AddZipFormRef.resetFields()
      this.dialogVisibleZipAdd = false
    },
    DialogClosed6() {
      this.$refs.balanceRemindRef.resetFields()
      this.balanceRemindShow = false
    },
    // 今日登录日志
    async getLoginTable1() {
      const { data } = await this.$http.post(
        'front/loginLog/getTodayPageList',
        this.queryInfo1
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      this.tableData1 = data.data.list
      this.total1 = parseInt(data.data.total)
    },
    async getLoginTable2() {
      const { data } = await this.$http.post(
        'front/loginLog/getHistoryPageList',
        this.queryInfo2
      )
      if (data.code !== 200) return this.$message.error(data.msg)
      this.tableData2 = data.data.list
      this.total2 = parseInt(data.data.total)
    },
    handleSizeChange1(newSize) {
      this.queryInfo1.size = newSize
      this.getLoginTable1()
    },
    handleCurrentChange1(newCurrent) {
      this.queryInfo1.page = newCurrent
      this.getLoginTable1()
    },
    handleSizeChange2(newSize) {
      this.queryInfo2.size = newSize
      this.getLoginTable2()
    },
    handleCurrentChange2(newCurrent) {
      this.queryInfo2.page = newCurrent
      this.getLoginTable2()
    },
    async getData() {
      const { data } = await this.$http.get('front/personal/personalInfo')
      if (data.code !== 200) return this.$message.error(data.msg)
      this.personalInfo = data.data
      ss.set('personalInfo', JSON.stringify(this.personalInfo))
      // this.personalInfo.unzipPassword = false // 测试使用，之后删掉！！！！
      if (this.personalInfo.email != null) this.verify2 = true
      this.queryInfo1.customerId = this.queryInfo2.customerId = JSON.parse(
        ss.get('customer')
      ).id
    },
    // 显示添加/修改解压密码
    zipVisibleShow() {
      if (this.personalInfo.unzipPassword) {
        this.dialogVisibleZipEdit = true
      } else {
        this.dialogVisibleZipAdd = true
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.el-card {
  color: #848a9f;
  .safety-title {
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
  ._title {
    margin-bottom: 20px;
    padding-left: 13px;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    border-left: 4px solid #01bfcb;
    color: #878a9d;
    font-weight: 700;
  }
  .level {
    padding-left: 13px;
    .ul {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin: 15px 0 28px;
      .li {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100px;
        color: #b7b7c3;
        &.active {
          color: #605f6f;
          .box {
            background-color: #ff8762;
          }
        }
        .box {
          height: 8px;
          background-color: #dadde6;
        }
        .name {
          height: 32px;
          line-height: 32px;
          text-align: center;
        }
      }
    }
    .des {
      color: #699efa;
    }
  }
  .sets {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 23px 0 40px;
    .set-item {
      padding-left: 13px;
      width: 350px;
      &:first-child, &:nth-child(2) {
        margin-right: 120px;
      }
      .title {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .title-info {
          padding-left: 120px;
        }
        .icon {
          margin-right: 5px;
          color: rgb(40, 184, 140);
        }
      }
      .set-des {
        min-height: 80px;
      }
    }
  }
  .towsets {
    margin-top: -30px;
    border-bottom: 1px solid #e5e6e8;
  }
  .el-tabs {
    margin-left: 13px;
  }
}
.bindNumber {
  .title {
    margin-bottom: 20px;
    padding-left: 13px;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    border-left: 4px solid #01bfcb;
    color: #878a9d;
    font-weight: 700;
  }
  .box {
    padding-left: 12px;
    p {
      font-size: 12px;
      color: #59607c;
      line-height: 1;
      padding: 20px 0;
      span {
        font-size: 12px;
        color: #878a9d;
        margin-left: 8px;
      }
    }
  }
  .remark {
    // margin: 8px 0 20px 0;
    p {
      color: #9a9a9a;
      padding: 12px 0;
    }
  }
  .el-form {
    margin-top: 12px;
    .el-form-item {
      display: inline-block;
      font-size: 12px;
      padding-right: 20px;
      margin-bottom: 15px;
      .el-form-item__content {
        width: 450px;
        font: 700;
        .input {
          width: 120px !important;
        }
        .el-input {
          width: 280px;
        }
      }
      .el-button {
        height: 34px;
        margin-left: 12px;
      }
    }
  }
}
</style>

<style>
.el-tabs__item.is-active {
  color: #6799ee;
  /* border-top: 3px solid #6799ee; */
  /* border-bottom: 1px solid transparent; */
}
.el-tabs__item {
  color: #848a9f;
  height: 35px;
  line-height: 35px;
}

.secure .el-dialog__header {
  border-bottom: 0px;
  padding: 0;
}
.secure .el-dialog__body {
  padding: 20px;
}
.el-form--label-left .el-form-item__label {
  font-size: 12px;
  color: #59607c;
}
.el_form .el-input__inner {
  height: 34px;
  line-height: 34px;
  font-size: 14px;
}
.password_form .el-input__inner {
  height: 34px;
  line-height: 34px;
  font-size: 14px;
  padding: 0 10px;
}
.balance_mind .count-unit {
  margin-left: 8px;
}
.bindNumber .balance_mind .box .count-note {
  margin-bottom: 0;
  color: #8C8C8C;
  font-size: 12px;
  line-height: 20px;
  padding: 0;
}
.bindNumber .balance_mind.el-form .el-form-item {
  margin-bottom: 20px;
}
.bindNumber .balance_mind.el-form .balance_mind_number .el-input-number {
  line-height: 34px;
}
.bindNumber .balance_mind.el-form .balance_mind_number .el-input-number .el-input-number__increase {
  line-height: 15px;
}
</style>
