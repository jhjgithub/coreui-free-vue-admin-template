const state = {
  user: [
    {
      username: "11",
      password: "11",
    },
  ],
  seccLogin: 0,
};

const actions = {
  login({ commit }, user) {
    commit("LOGIN", user);
  },
};

const mutations = {
  LOGIN(state, res) {
    state.user.forEach(function(eee) {
      if (eee.username === res.username) {
        if (eee.password === res.password) {
          state.seccLogin = 1;
        }
      }
    }, this);
  },
};

export default {
  state,
  actions,
  mutations,
};
