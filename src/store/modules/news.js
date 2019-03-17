import restHelper from "../../api/restHelper";

const state = {
  list: [],
};

const actions = {
  getNews({ commit }) {
    restHelper.getnews(function(res) {
      commit("GETNEWS", { res });
    });
  },
};

const mutations = {
  GETNEWS(state, { res }) {
    state.list = res;
  },
};

export default {
  state,
  actions,
  mutations,
};
