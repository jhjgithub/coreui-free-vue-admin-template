import restHelper from "../../api/restHelper";

const state = {
  list: [],
};

const actions = {
  getDay({ commit }) {
    restHelper.getday(function(res) {
      commit("GETDAY", { res });
    });
  },
};

const mutations = {
  GETDAY(state, { res }) {
    state.list = res;
  },
};

export default {
  state,
  actions,
  mutations,
};
