import { createStore } from "vuex";

const store = createStore({
  state: {
    rail: false,
  },
  mutations: {
    toggleRail(state) {
      state.rail = !state.rail;
    },
    setRail(state, value) {
      state.rail = value;
    },
  },
  actions: {
    toggleRail({ commit }) {
      commit("toggleRail");
    },
    setRail({ commit }, value) {
      commit("setRail", value);
    },
  },
  getters: {
    rail(state) {
      return state.rail;
    },
  },
});

export default store;
