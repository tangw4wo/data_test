import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    client:false
  },
  mutations: {
    clientChange:(state,boolean) =>{
      state.client=boolean;
    }
  },
  actions: {}
});
