// import axios from 'axios'
// import store from 'utils/store'
// export default function ajax(options) {
//   const token = store.state.user.u ? store.state.user.u.token : ''
//   const promise = new Promise((resolve, reject) => {
//     const instanc = axios.create({
//       baseURL: process.env.BASE_API,
//       method: 'GET',
//       headers: {
//         authorization: token,
//       },
//       data: options.option.data,
//       timeout: 5000,
//       responseType: 'string'
//     })
//     instanc.interceptors.request.use(function (config) {
//       if (config.data == undefined) {
//         return config;
//       }
//       //发送的时候
//       if (JSON.stringify(config.data).match(/time":"\d+|time":\d+/)) {
//         const newConfig = { ...config };
//         const data = JSON.stringify(config.data).replace(/time":"\d+|time":\d+/g, ($1) => { return $1.replace(/\d+/g, ($1) => { return parseInt($1 / 1000) }) });
//         newConfig.data = JSON.parse(data);
//         return newConfig
//       }
//       return config;
//     }, function (err) {
//       return Promise.reject(err)
//     })
//     instanc.interceptors.response.use(function (response) {
//       const data = JSON.stringify(response.data).replace(/(Time":\d+|Time":"\d+|time":"\d+)/g, ($1) => { return $1.replace(/\d+/g, ($1) => { return parseInt($1 * 1000) }) });
//       return new Function("return " + data)();
//     }, function (err) {
//       console.log('请求错误', err)
//       return false
//     })
//     instanc(options).then(res => {
//       resolve(res);
//     }).catch(err => {
//       reject(err)
//     })
//   })
//   promise.then(res => {
//     options.option.success(res)
//   }).catch(err => {
//     options.option.error(err)
//   })
// }


import axios from 'axios';
import store from "utils/store"
import router from '../router'
export default function ajax(options) {

  const token = store.state.user.u ? store.state.user.u.token : '';
  const promise = new Promise((resolve, reject) => {
    const instanc = axios.create({
      baseURL: process.env.BASE_API,
      method: "GET", //默认get
      headers: {
        authorization: token
      },      //请求头信
      data: options.option.data,
      timeout: 5000,   //超时时间
      responseType: "json",
    })
    instanc.interceptors.request.use(function (config) {
      return config
    }, function (err) {
      return Promise.reject(err);
    })
    instanc.interceptors.response.use(function (response) {
      // if (response.data.message == '服务器错误:无效token') {
      if (response.data.status == -1) {
        router.replace({ path: '/login' })
        return;
      }
      return response.data;
    }, function (err) {
      return false
      //console.log("异常 关闭Loading图标")
    })
    instanc(options).then(res => {
      resolve(res);
      return false;
    }).catch(err => {
      reject(err);
    })
  })
  promise.then(res => {
    options.option.success(res)
  }).catch(err => {
    // options.option.error(err)
  })
}
