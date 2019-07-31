<template>
  <div class="login-main">
    <div class="login-box">
      <div class="login-top">
        <img src="../../../static/images/logo.png" alt />
        <div>
          <span class="top-title">致力于培养好每一个孩子</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="login-content">
        <div class="l-title">
          <span class="l-t-left" @click="changeMode('pwd')">密码登录</span>
          <span class="l-t-right" @click="changeMode('code')">验证码登录</span>
          <div class="tab-line" :class="{'tab-red-line': loginMode == 'code'}"></div>
        </div>
        <div class="l-input">
          <el-form
            :model="login"
            status-icon
            :rules="rolePas"
            ref="loginForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="phone">
              <el-input
                type="text"
                v-model.trim="login.phone"
                autocomplete="off"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass" class="pass" v-if="isPasLogin">
              <el-input
                type="password"
                id="hintBas"
                style="width:100%"
                v-model.trim="login.pass"
                autocomplete="off"
                placeholder="请输入密码"
                @keyup.enter.native="loginFn('loginForm')"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass" class="code-login" v-else>
              <el-input
                type="text"
                id="hintBas"
                class="code-input"
                v-model.trim="login.pass"
                autocomplete="off"
                placeholder="发送验证码"
                @keyup.enter.native="loginFn('loginForm')"
              ></el-input>
              <span class="get-code" @click="getCode">{{codeTxt}}</span>
            </el-form-item>
          </el-form>
        </div>
        <div class="l-btn">
          <button class="l-dl" @click="loginFn('loginForm')">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LoginPwd, LoginSendSms, LoginByCode } from "../../api/login";
const regular = /^1[3456789]\d{9}$/; //手机验证正则
export default {
  data() {
    //手机号码校验
    var phoneNumber = (req, valid, trig) => {
      if (window._hmt === undefined) window._hmt = [];
      window._hmt.push(["_trackEvent", "输入手机号", "点击", valid]);
      const [pho0ne, phoTwo, phoThree] = [
        "请输入正确的手机号码",
        "用户名已注册",
        "验证失败"
      ];
      regular.test(valid) ? trig() : trig(new Error(pho0ne));
    };

    //验证码校验
    var phonePass = (req, valid, trig) => {
      if (window._hmt === undefined) window._hmt = [];
      window._hmt.push(["_trackEvent", "输入密码", "点击", valid]);
      let _this = this;
      const [mes0ne, mesTwo, mesThree, mesFour] = [
        "请输入验证码",
        "请输入6位验证码",
        "请输入大于3位密码",
        "请输入密码"
      ];
      if (_this.errHint == "") {
        if (_this.isPasLogin) {
          if (valid == "") {
            trig(new Error(mesFour));
          } else if (valid.length < 3) {
            trig(new Error(mesThree));
          } else {
            trig();
          }
        } else {
          valid.length == 6 ? trig() : trig(new Error(mesTwo));
        }
      } else {
        trig(new Error(this.errHint));
        this.errHint = "";
      }
    };
    return {
      loginMode: "pwd", // 默认密码登录
      isPasLogin: true,
      login: { phone: "", pass: "" },
      rolePas: {
        phone: [{ required: true, validator: phoneNumber, trigger: "blur" }],
        pass: [{ required: true, validator: phonePass, trigger: "blur" }]
      },
      isShow: true,
      codeTxt: "发送验证码",
      errHint: "",
      visible: false,
      tabPosition: "top",
      picTime: null,
      isClick: false,
      prevPass: "" // 切换登录方式记录上一个密码
    };
  },
  methods: {
    // 切换登录方式
    changeMode(type) {
      this.loginMode = type;
      this.isPasLogin = type === "pwd";
      if (this.isPasLogin) {
        // 密码登录
        this.login.pass = this.prevPass;
      } else {
        this.prevPass = this.login.pass;
        this.login.pass = "";
      }
    },
    // 获取验证码
    getCode() {
      let _this = this;
      if (_this.isClick) {
        return;
      }
      _this.isClick = true;
      if (regular.test(_this.login.phone)) {
        LoginSendSms({
          data: {
            mobile: _this.login.phone
          },
          success: res => {
            if (res.data) {
              _this.codeTxt = "60s";
              let time = 60;
              _this.picTime = setInterval(() => {
                _this.codeTxt = time-- + "s";
                if (time == 0) {
                  _this.isClick = false;
                  _this.codeTxt = "获取验证码";
                  clearInterval(_this.picTime);
                }
              }, 1000);
            } else {
              _this.isClick = false;
              _this.errHint = res.message;
              document.getElementById("hintBas").focus();
              document.getElementById("hintBas").blur();
            }
          },
          error: err => {
            _this.isClick = false;
            _this.errHint = "获取验证码异常";
            document.getElementById("hintBas").focus();
            document.getElementById("hintBas").blur();
          }
        });
      } else {
        _this.isClick = false;
        _this.errHint = "请输入正确的手机号";
        document.getElementById("hintBas").focus();
        document.getElementById("hintBas").blur();
      }
    },
    // 密码登陆
    passwordLogin() {
      let _this = this;
      LoginPwd({
        data: {
          mobile: _this.login.phone,
          password: _this.login.pass,
          client_type: "2"
        },
        success: na => {
          if (na.data) {
            _this.requiedInfo(na, _this);
          } else {
            _this.errHint = na.message;
            document.getElementById("hintBas").focus();
            document.getElementById("hintBas").blur();
          }
        },
        error: erna => {
          _this.errHint = "登录异常";
          document.getElementById("hintBas").focus();
          document.getElementById("hintBas").blur();
          console.log("登陆异常：" + erna);
        }
      });
    },
    // 验证码登录
    phoneNumberLogin() {
      let _this = this;
      LoginByCode({
        data: {
          mobile: _this.login.phone,
          code: _this.login.pass,
          client_type: "2"
        },
        success: na => {
          console.log(na.data);
          if (na.data) {
            _this.requiedInfo(na, _this);
          } else {
            _this.errHint = na.message;
            document.getElementById("hintBas").focus();
            document.getElementById("hintBas").blur();
          }
        },
        error: erna => {
          this.errHint = "登录异常";
          document.getElementById("hintBas").focus();
          document.getElementById("hintBas").blur();
          console.log("验证码登录异常:" + erna);
        }
      });
    },
    // 登录
    loginFn(formName) {
      if (window._hmt === undefined) window._hmt = [];
      window._hmt.push(["_trackEvent", "密码登陆按钮", "点击", null]);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isPasLogin ? this.passwordLogin() : this.phoneNumberLogin();
        }
      });
    },
    // 登录成功后回调
    requiedInfo(na, th) {
      const userInfo = {
        token: na.data.authorization,
        user_id: na.data.user.user_id,
        mobile: na.data.user.user_mobile,
        nickname: na.data.user.user_nickname,
        avatar: na.data.user.user_avatar,
        time: parseInt(new Date().getTime() / 1000)
      };
      th.$store.dispatch("mysetUI", userInfo);
      th.$router.replace({ path: "study_center/my_course" });
    }
  },
  beforeDestroy() {
    // 组件销毁清空定时器
    clearInterval(this.picTime);
  }
};
</script>

<style lang="less" scoped>
.login-main {
  width: 100%;
  height: calc(~"100vh - 200px");
  padding: 100px 0;
  // background: rgba(239, 239, 239, 1);
  background: url("../../../static/images/login-bg.jpg") no-repeat 0 -100px;
  .login-top {
    img {
      width: 192px;
      height: 36px;
    }
    .top-title {
      color: #33333;
      font-size: 16px;
      margin-top: 12px;
      font-weight: 400;
    }
  }
  .line {
    width: 420px;
    height: 1px;
    background: rgba(239, 239, 239, 1);
    margin: 18px auto 32px auto;
  }
  .login-box {
    position: relative;
    top: 50%;
    width: 580px;
    margin: 0 auto;
    margin-top: -296px;
    padding: 100px 0;
    background: #ffffff;
    box-shadow: 0px 0px 27px 0px rgba(199, 199, 199, 0.2);
    .login-content {
      .l-title {
        position: relative;
        span {
          cursor: pointer;
          width: 63px;
          height: 16px;
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 56px;
          &.l-t-left {
            margin-right: 108px;
          }
        }
        .tab-line {
          position: absolute;
          height: 2px;
          border-radius: 1px;
          background: #1389ff;
          bottom: 0;
          left: calc(~"45% - 92px");
          width: 50px;
          transition: all 0.7s ease;
        }
        .tab-red-line {
          left: calc(~"50% + 65px");
        }
      }
      .l-input {
        /deep/ .demo-ruleForm {
          margin: 0 auto;
          width: 420px;
        }
        margin-top: 30px;
        /deep/ .el-input__inner {
          height: 50px;
          line-height: 50px;
          border-radius: 25px;
          background: rgba(255, 255, 255, 1);
          // border: 1px solid rgba(153, 153, 153, 1);
        }
        .code-login {
          position: relative;
          .get-code {
            position: absolute;
            top: 6px;
            right: 24px;
            cursor: pointer;
          }
        }
      }
      .l-btn {
        .l-dl {
          border: none;
          cursor: pointer;
          outline: none;
          width: 420px;
          height: 50px;
          background: rgba(19, 137, 255, 1);
          border-radius: 25px;
          color: #ffffff;
          font-size: 18px;
        }
        .l-red-dl {
          background: rgba(241, 92, 85, 1);
        }
      }
    }
  }
}
@media (max-width: 1440px) {
  .login-main {
    .login-box {
      padding: 40px 0 72px 0 !important;
      margin-top: -252px;
      width: 430px;
      .login-content {
        .tab-line{
          left: calc(45% - 100px) !important;
        }
        .tab-red-line{
          left: calc(50% + 65px) !important;
        }
      }
      .l-input {
        .demo-ruleForm {
          width: 304px !important;
        }
      }
      .l-btn {
        .l-dl {
          width: 304px !important;
        }
      }
    }
  }
}
</style>
