'use strict'
const target = process.env.npm_lifecycle_event;
console.log("执行命令:",target);
const develop='"test"'; //测试地址
const build='""';   //线上地址


const date=new Date();
const time=date.getMonth()+"_"+date.getDate();
const config= {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  BASE_API:'"https://www.puxinwangxiao.com"'
}
target=='build-test'?config.BASE_API=develop:config.BASE_API=build
console.log("打包接口地址:",config.BASE_API);
module.exports =config

