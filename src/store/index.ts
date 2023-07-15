import { createStore } from "vuex";

export default createStore({
  state: {
    lang: "pl",
  },
  getters: {
    getLang(lang) {
      return lang;
    },
  },
  mutations: {
    changeLang(state, payload) {
      state.lang = payload;
    },
  },
  actions: {},
  modules: {},
});
