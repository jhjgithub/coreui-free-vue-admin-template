import restHelper from "../../api/restHelper";

const state = {
  list: [
    {
      id: 1,
      text: "tttt",
    },
  ],
};

const actions = {
  getJoke({ commit }) {
    restHelper.getjoke(function(res) {
      commit("GETJOKE", { res });
    });
  },
};

const mutations = {
  GETJOKE(state, { res }) {
    state.list = res;
  },
};

export default {
  state,
  actions,
  mutations,
};
