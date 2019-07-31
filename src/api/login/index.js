import ajax from '../../utils/ajax'

// 密码登录
export function LoginPwd(options){
  return ajax({
    url:'/api/v1.2/student/login',
    method: 'POST',
    option: options
  })
}
// 验证手机号是否注册
export function LoginExistMobile(options){
  return ajax({
    url:'/api/v1.2/student/exist_mobile',
    method: 'POST',
    option: options
  })
}

// 发送验证码
export function LoginSendSms(options){
  return ajax({
    url:'/api/v1.2/student/send_login_sms',
    method: 'POST',
    option: options
  })
}

// 验证码登录
export function LoginByCode(options){
  return ajax({
    url:'/api/v1.2/student/login_by_code',
    method: 'POST',
    option: options
  })
}

// 发送注册短信
export function LoginRegister(options){
  return ajax({
    url:'/api/v1.2/student/send_register_sms',
    method: 'POST',
    option: options
  })
}

// 注册
export function LoginRegisterLogin(options){
  return ajax({
    url:'/api/v1.2/student/register',
    method: 'POST',
    option: options
  })
}
//重置密码发送验证码
export function forgetPass(options){
  return ajax({
    url:'/api/v1.2/student/send_reset_sms',
    method: 'POST',
    option: options
  })
}
//确定重置密码
export function enterForgetPass(options){
  return ajax({
    url:'/api/v1.2/student/modify_password',
    method: 'POST',
    option: options
  })
}
