webpackJsonp([5],{Z2Ou:function(t,e,n){t.exports=n.p+"static/img/logo.7f85be5.png"},fQIx:function(t,e){},q8bm:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Z1y9");var s=/^1[3456789]\d{9}$/,o={data:function(){var t=this;return{loginMode:"pwd",isPasLogin:!0,login:{phone:"",pass:""},rolePas:{phone:[{required:!0,validator:function(t,e,n){void 0===window._hmt&&(window._hmt=[]),window._hmt.push(["_trackEvent","输入手机号","点击",e]);s.test(e)?n():n(new Error("请输入正确的手机号码"))},trigger:"blur"}],pass:[{required:!0,validator:function(e,n,i){void 0===window._hmt&&(window._hmt=[]),window._hmt.push(["_trackEvent","输入密码","点击",n]);var s=t;""==s.errHint?s.isPasLogin?""==n?i(new Error("请输入密码")):n.length<3?i(new Error("请输入大于3位密码")):i():6==n.length?i():i(new Error("请输入6位验证码")):(i(new Error(t.errHint)),t.errHint="")},trigger:"blur"}]},isShow:!0,codeTxt:"发送验证码",errHint:"",visible:!1,tabPosition:"top",picTime:null,isClick:!1,prevPass:""}},methods:{changeMode:function(t){this.loginMode=t,this.isPasLogin="pwd"===t,this.isPasLogin?this.login.pass=this.prevPass:(this.prevPass=this.login.pass,this.login.pass="")},getCode:function(){var t,e=this;e.isClick||(e.isClick=!0,s.test(e.login.phone)?(t={data:{mobile:e.login.phone},success:function(t){if(t.data){e.codeTxt="60s";var n=60;e.picTime=setInterval(function(){e.codeTxt=n--+"s",0==n&&(e.isClick=!1,e.codeTxt="获取验证码",clearInterval(e.picTime))},1e3)}else e.isClick=!1,e.errHint=t.message,document.getElementById("hintBas").focus(),document.getElementById("hintBas").blur()},error:function(t){e.isClick=!1,e.errHint="获取验证码异常",document.getElementById("hintBas").focus(),document.getElementById("hintBas").blur()}},Object(i.a)({url:"/api/v1.2/student/send_login_sms",method:"POST",option:t})):(e.isClick=!1,e.errHint="请输入正确的手机号",document.getElementById("hintBas").focus(),document.getElementById("hintBas").blur()))},passwordLogin:function(){var t,e=this;t={data:{mobile:e.login.phone,password:e.login.pass,client_type:"2"},success:function(t){t.data?e.requiedInfo(t,e):(e.errHint=t.message,document.getElementById("hintBas").focus(),document.getElementById("hintBas").blur())},error:function(t){e.errHint="登录异常",document.getElementById("hintBas").focus(),document.getElementById("hintBas").blur(),console.log("登陆异常："+t)}},Object(i.a)({url:"/api/v1.2/student/login",method:"POST",option:t})},phoneNumberLogin:function(){var t,e=this,n=this;t={data:{mobile:n.login.phone,code:n.login.pass,client_type:"2"},success:function(t){console.log(t.data),t.data?n.requiedInfo(t,n):(n.errHint=t.message,document.getElementById("hintBas").focus(),document.getElementById("hintBas").blur())},error:function(t){e.errHint="登录异常",document.getElementById("hintBas").focus(),document.getElementById("hintBas").blur(),console.log("验证码登录异常:"+t)}},Object(i.a)({url:"/api/v1.2/student/login_by_code",method:"POST",option:t})},loginFn:function(t){var e=this;void 0===window._hmt&&(window._hmt=[]),window._hmt.push(["_trackEvent","密码登陆按钮","点击",null]),this.$refs[t].validate(function(t){t&&(e.isPasLogin?e.passwordLogin():e.phoneNumberLogin())})},requiedInfo:function(t,e){var n={token:t.data.authorization,user_id:t.data.user.user_id,mobile:t.data.user.user_mobile,nickname:t.data.user.user_nickname,avatar:t.data.user.user_avatar,time:parseInt((new Date).getTime()/1e3)};e.$store.dispatch("mysetUI",n),e.$router.replace({path:"study_center/my_course"})}},beforeDestroy:function(){clearInterval(this.picTime)}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login-main"},[n("div",{staticClass:"login-box"},[t._m(0),t._v(" "),n("div",{staticClass:"line"}),t._v(" "),n("div",{staticClass:"login-content"},[n("div",{staticClass:"l-title"},[n("span",{staticClass:"l-t-left",on:{click:function(e){return t.changeMode("pwd")}}},[t._v("密码登录")]),t._v(" "),n("span",{staticClass:"l-t-right",on:{click:function(e){return t.changeMode("code")}}},[t._v("验证码登录")]),t._v(" "),n("div",{staticClass:"tab-line",class:{"tab-red-line":"code"==t.loginMode}})]),t._v(" "),n("div",{staticClass:"l-input"},[n("el-form",{ref:"loginForm",staticClass:"demo-ruleForm",attrs:{model:t.login,"status-icon":"",rules:t.rolePas}},[n("el-form-item",{attrs:{prop:"phone"}},[n("el-input",{attrs:{type:"text",autocomplete:"off",placeholder:"请输入手机号"},model:{value:t.login.phone,callback:function(e){t.$set(t.login,"phone","string"==typeof e?e.trim():e)},expression:"login.phone"}})],1),t._v(" "),t.isPasLogin?n("el-form-item",{staticClass:"pass",attrs:{prop:"pass"}},[n("el-input",{staticStyle:{width:"100%"},attrs:{type:"password",id:"hintBas",autocomplete:"off",placeholder:"请输入密码"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.loginFn("loginForm")}},model:{value:t.login.pass,callback:function(e){t.$set(t.login,"pass","string"==typeof e?e.trim():e)},expression:"login.pass"}})],1):n("el-form-item",{staticClass:"code-login",attrs:{prop:"pass"}},[n("el-input",{staticClass:"code-input",attrs:{type:"text",id:"hintBas",autocomplete:"off",placeholder:"发送验证码"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.loginFn("loginForm")}},model:{value:t.login.pass,callback:function(e){t.$set(t.login,"pass","string"==typeof e?e.trim():e)},expression:"login.pass"}}),t._v(" "),n("span",{staticClass:"get-code",on:{click:t.getCode}},[t._v(t._s(t.codeTxt))])],1)],1)],1),t._v(" "),n("div",{staticClass:"l-btn"},[n("button",{staticClass:"l-dl",on:{click:function(e){return t.loginFn("loginForm")}}},[t._v("登录")])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"login-top"},[e("img",{attrs:{src:n("Z2Ou"),alt:""}}),this._v(" "),e("div",[e("span",{staticClass:"top-title"},[this._v("致力于培养好每一个孩子")])])])}]};var r=n("VU/8")(o,a,!1,function(t){n("fQIx")},"data-v-586c7131",null);e.default=r.exports}});
//# sourceMappingURL=5.fcd452a012f44143f045.js.map