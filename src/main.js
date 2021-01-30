import Vue from 'vue'
import App from './App.vue'
import './plugins/antd'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'
import CustomComponent from './components'
import * as filters from './utils/filter'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.use(CustomComponent, {})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
