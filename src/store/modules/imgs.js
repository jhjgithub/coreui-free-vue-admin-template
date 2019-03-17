import restHelper from "../../api/restHelper";

const state = {
  imgs: [],
};

const actions = {
  getImgs({ commit }) {
    restHelper.getimgs(function(res) {
      commit("GETIMGS", { res });
    });
  },
};

const mutations = {
  GETIMGS(state, { res }) {
    state.imgs = res;
  },
};

export default {
  state,
  actions,
  mutations,
};
