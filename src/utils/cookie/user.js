import Cookies from "vue-js-cookie";
const uI = 'UI';
class UserInfo {
  setInfo(info) {
    return Cookies.set(uI, info)
  }
  removeInfo() {
    return Cookies.remove(uI)
  }

  getInfo() {
    const userInfo = Cookies.getJSON('UI');
    if (userInfo) {
      return userInfo
    }
    return null
  }
  //
  refresh() {


  }
}
export default UserInfo

