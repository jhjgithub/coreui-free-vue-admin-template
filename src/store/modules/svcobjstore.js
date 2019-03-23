import restHelper from "../../api/restHelper";
import * as svcobj from "../../nslib/svcobj";

const state = {
  elements: [],
};

const actions = {
  add_svcobj({ commit }, new_ipobj) {
    restHelper.add_svcobj(new_ipobj, function(res) {
      commit("ADD_SVCOBJ", new_ipobj);
    });
  },

  del_svcobj({ commit }, delid) {
    restHelper.del_svcobj(delid, function(res) {
      commit("DEL_SVCOBJ", delid);
    });
  },

  get_svcobj({ commit }) {
    // restHelper.get_svcobj(function(res) {
    //   commit("GET_SVCOBJ", { res });
    // });

    let res = init_sample_svcobj();
    commit("GET_SVCOBJ", { res });
  },
};

const mutations = {
  ADD_SVCOBJ(state, new_svcobj) {
    // res.id = state.JokeList.length > 0 ? ++state.JokeList[state.JokeList.length - 1].id : 1;
    // state.JokeList.push(res);
  },

  DEL_SVCOBJ(state, delid) {
    // for (var index in state.JokeList) {
    //   if (state.JokeList[index].id === res) state.JokeList.splice(index, 1);
    // }
  },

  GET_SVCOBJ(state, { res }) {
    state.elements = res;
  },
};

export default {
  state,
  actions,
  mutations,
};

////////////////////////////////////////

function init_sample_svcobj() {
  let svcobjset = [];

  let a = new svcobj();
  a.id = "id-ssh-svc";
  a.name = "ssh-svc";
  a.desc = "SSH svc";
  a.created_date = "1549529617446";
  a.type = svcobj.svctype.single;
  a.protocol = svcobj.svcprotocol.tcp;
  a.port_start = 22;
  a.port_end = 22;
  svcobjset.push(a);

  let b = new svcobj();
  b.id = "id-web-svc";
  b.name = "web-svc";
  b.desc = "Web svc";
  b.created_date = "1559929617446";
  b.type = svcobj.svctype.single;
  b.protocol = svcobj.svcprotocol.tcp;
  b.port_start = 80;
  b.port_end = 80;
  svcobjset.push(b);

  let c = new svcobj();
  c.id = "id-any-any";
  c.name = "Any-Any";
  c.desc = "Any service";
  c.created_date = "1539129617446";
  c.type = svcobj.svctype.range;
  c.protocol = svcobj.svcprotocol.all;
  c.port_start = svcobj.any_port;
  c.port_end = svcobj.any_port;
  svcobjset.push(c);

  return svcobjset;
}