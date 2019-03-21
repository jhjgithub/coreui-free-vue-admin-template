const state = {
  JokeList: [
    {
      id: 1,
      title: "joke 1",
      content: "joke 111111",
    },
    {
      id: 2,
      title: "joke 2",
      content: "joke 22222",
    },
  ],
};

const actions = {
  addJoke({ commit }, newdata) {
    commit("ADDJOKE", newdata);
  },
  delJoke({ commit }, delid) {
    commit("DELJOKE", delid);
  },
};

const mutations = {
  ADDJOKE(state, res) {
    res.id = state.JokeList.length > 0 ? ++state.JokeList[state.JokeList.length - 1].id : 1;
    state.JokeList.push(res);
  },
  DELJOKE(state, res) {
    for (var index in state.JokeList) {
      if (state.JokeList[index].id === res) state.JokeList.splice(index, 1);
    }
  },
};

export default {
  state,
  actions,
  mutations,
};
