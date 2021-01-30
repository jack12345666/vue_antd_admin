import Vue from 'vue'
import Vuex from 'vuex'
import lease from './modules/lease'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    lease
  }
})

export default store
