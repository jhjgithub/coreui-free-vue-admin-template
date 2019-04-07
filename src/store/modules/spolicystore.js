import axios from "axios";
import restHelper from "../../api/restHelper";
import * as spolicy from "../../nslib/spolicy";
import * as misc from "../../nslib/misc";

const state = {
  elements: [],
};

const getters = {
  get_spolicy(state) {
    return state.elements;
  },
};

const actions = {
  add_spolicy({ commit }, new_spolicy) {
    restHelper.add_spolicy(new_spolicy, function(res) {
      commit("ADD_SPOLICY", new_spolicy);
    });
  },

  del_spolicy({ commit }, delid) {
    restHelper.del_spolicy(delid, function(res) {
      commit("DEL_SPOLICY", delid);
    });
  },

  async refresh_spolicy_async({ commit }) {
    var url = "http://localhost:3000/securitypolicy";

    let result = await restHelper.async_get(url);

    if (result.status == 200) {
      const data = result.data;

      // misc.print_json(result.data, "refreshed spolicy:");

      commit("REFRESH_SPOLICY", { data });
    }

    return result;
  },

  refresh_spolicy({ commit }) {
    var url = "http://localhost:3000/securitypolicy";

    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(function (result) {
          const data = result.data;

          if (result.status == 200) {
            commit("REFRESH_SPOLICY", { data });
          }
          else {
            console.log(result);
          }

          resolve(result);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  },
};

const mutations = {
  ADD_SPOLICY(state, new_spolicy) {
    // res.id = state.JokeList.length > 0 ? ++state.JokeList[state.JokeList.length - 1].id : 1;
    // state.JokeList.push(res);
  },

  DEL_SPOLICY(state, delid) {
    // for (var index in state.JokeList) {
    //   if (state.JokeList[index].id === res) state.JokeList.splice(index, 1);
    // }
  },

  REFRESH_SPOLICY(state, res) {
    state.elements = res.data;
  },
};

export default {
  getters,
  state,
  actions,
  mutations,
};

////////////////////////////////////////

export function init_sample_spolicyset() {
  let r = [];

  // for ssh
  let f1 = new spolicy.SecurityPolicy();

  f1.name = "ssh Server";
  f1.stype = spolicy.spolicy_type.firewall;
  f1.srcnet = "id-any-any";
  f1.srcport = 65536;
  f1.dstnet = "id-ssh-server";
  f1.dstport = 22;
  f1.actions.push(spolicy.spolicy_act_fw.allow);
  f1.innic = "eth0";
  f1.outnic = "any";

  /*
  let f2 = new spolicy();
  f2.stype = spolicy_type.firewall;
  f2.network[objidx.start] = "id-any-any";
  f2.network[objidx.end] = "id-web-server";
  f2.actions[0] = spolicy_act_fw.allow;
  f2.nic[objidx.start] = "any";
  f2.nic[objidx.end] = "any";

  let f3 = new spolicy();
  f3.stype = spolicy_type.firewall;
  f3.network[objidx.start] = "id-any-any";
  f3.network[objidx.end] = "id-any-server";
  f3.actions[0] = spolicy_act_fw.deny;
  f3.nic[objidx.start] = "any";
  f3.nic[objidx.end] = "any";
  */

  r.push(f1);
  /*
  r.firewall.push(f2);
  r.firewall.push(f3);

  let n1 = new spolicy();
  let n2 = new spolicy();
  let n3 = new spolicy();


  r.nat.push(n1);
  r.nat.push(n2);
  r.nat.push(n3);
  */

  // console.log(r);

  return r;
}