import Vue from "vue";
import Vuex from "vuex";
import news from "./modules/news";
import joke from "./modules/joke";
import imgs from "./modules/imgs";
import jokelist from "./modules/jokelist";
import today from "./modules/today";
import user from "./modules/user";
import ipobjstore from "./modules/ipobjstore";
import svcobjstore from "./modules/svcobjstore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    joke,
    news,
    imgs,
    jokelist,
    today,
    user,
    ipobjstore,
    svcobjstore,
  },
});
