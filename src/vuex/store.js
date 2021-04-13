import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userProfile: {},
    authorized: false,
    meatCollection: [],
    veggieCollection: [],
    dessertCollection: [],
    pastaCollection: []
  },
  mutations: {

  },
  actions: {

  }
})
