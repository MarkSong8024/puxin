import UserInfo from "@/utils/cookie/user"
const uI = new UserInfo;
const user = {
  state: {
    u: null
  },
  mutations: {
    SETUSERINFO: (state, info) => {
      state.u = info;
      info ? uI.setInfo(info) : uI.removeInfo();

      let user = JSON.parse(localStorage.getItem('vuexxx'));
      user.user.u = info;
      localStorage.setItem('vuexxx', JSON.stringify(user));
    },
    GETSAVEUI: (state) => {
      const ui = uI.getInfo();
      state.u = ui;
    },
    QUERYLOGIN: (state) => {
      let vx = localStorage.getItem('vuexxx');
      if (vx) {
        vx = JSON.parse(vx);
        vx.user.u = null;
      }
      localStorage.setItem('vuexxx', JSON.stringify(vx));
      state.u = null;
      console.log("退出登录");
    }
  },
  actions: {
    async mysetUI({ commit }, info) {
      commit('SETUSERINFO', info);
    },
    async getSaveUi({ commit }) {
      commit('GETSAVEUI')
    },
    async quitLogin({ commit }) {
      commit('QUERYLOGIN');
    }
  }
}
export default user
