import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from "vue";
import './plugins/bootstrap-vue'
import VueCompositionApi from '@vue/composition-api';
import environment from './environment'

import { BootstrapVue, BootstrapVueIcons  } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import io from "socket.io-client"

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
console.log(process.env)

Vue.config.productionTip = false;
Vue.use(VueCompositionApi)

// Bootstrap plugins
// TODO treeshake
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

// Socket.IO
const socket = io(process.env.VUE_APP_API_URL);
socket.connect()
Vue.prototype.$socket = socket
export const $socket = socket

// DayJs
import dayjs from 'dayjs';
Vue.prototype.$dayjs = dayjs().add(2, 'h')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");