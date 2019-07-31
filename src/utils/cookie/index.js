import Cookies from "vue-js-cookie";
import store from "../store"
const TokenKey = 'Token';
const UserInfo='ui';
const Vuex='vx';
export function getToken() {
  return store.state.user.u.token
  //return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserInfo(info) {
  return Cookies.set(UserInfo,info);
}
export function getUserInfo() {
  const userInfo=Cookies.get(UserInfo);
  if(userInfo){
    return JSON.parse(userInfo)
  }
  return null
  // return Cookies.get(UserInfo);
}
export function removeUserInfo() {
  return Cookies.remove(UserInfo);
}

export function setVuex(vx){
  return Cookies.set(Vuex, vx)
}
export function getVuex(){

  const vx=Cookies.get(Vuex);
  if(vx){
    return JSON.parse(vx)
  }
  return null
}
export function removeVuex(vx){
  return Cookies.remove(Vuex);
}




