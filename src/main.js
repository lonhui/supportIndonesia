// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'lib-flexible/flexible'
import global_ from './components/global.vue'
import 'babel-polyfill'


Vue.config.productionTip = false
Vue.prototype.$axios = axios

var SocialSharing = require('vue-social-sharing')
Vue.use(SocialSharing)
Vue.prototype.GLOBAL = global

/* eslint-disable no-new */
 new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})