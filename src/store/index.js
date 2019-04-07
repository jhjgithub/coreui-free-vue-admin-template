import Vue from "vue";
import Vuex from "vuex";
import joke from "./modules/joke";
import user from "./modules/user";
import ipobjstore from "./modules/ipobjstore";
import svcobjstore from "./modules/svcobjstore";
import spolicystore from "./modules/spolicystore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    joke,
    user,

    ipobjstore,
    svcobjstore,
    spolicystore
  },
});
