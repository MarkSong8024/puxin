// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Bus from 'utils/bus.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex'
import store from './utils/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as filter from 'utils/filter'
import { setVuex } from './utils/cookie'

import './components/icon'

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})
Vue.config.productionTip = false
Vue.use(Bus);
Vue.use(MintUI)
Vue.use(Vuex)
Vue.use(ElementUI);

window.addEventListener('beforeunload', e => {
  localStorage.setItem("vuexxx",JSON.stringify(store.state));
  setVuex(JSON.stringify(store.state))
});

const sVuex=localStorage.getItem("vuexxx");
if(sVuex=='undefined'){
  localStorage.setItem('vuexxx',JSON.stringify(store.state))
}else{
  localStorage.getItem("vuexxx")&&store.replaceState(JSON.parse(localStorage.getItem("vuexxx")));
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
