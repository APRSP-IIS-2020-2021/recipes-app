import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/router";

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
    setUserProfile(state, val) {
      state.userProfile = val
    }
  },
  actions: {

    async login({dispatch}, form) {

      // loginovanje korisnika
      const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password);

      // vracanje korisnika i setovanje u state-u
      dispatch('fetchUserProfile', user);

      router.push('/recipes');

    },

    async logout({commit}) {

      // odjavimo korisnika sa fb
      await fb.auth.signOut();

      // resetujemo
      commit('setUserProfile', {});
      router.push('/login');

    },

    async fetchUserProfile({commit}, user) {

      // vracanje korisnika sa fb
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // postavljanje korisnika u state-u
      commit('setUserProfile', userProfile.data());

    },

    async register({dispatch}, form) {

      // registrovanje user-a
      const {user} = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);

      // kreiranje korisnika u usersCollection na firebase-u
      await fb.usersCollection.doc(user.uid).set({
        email: form.email,
        password: form.password,
        name: form.name,
        lastName: form.lastName
      });

      // vracanje korisnika i setovanje u state-u
      dispatch('fetchUserProfile', user);

      router.push('/login');

    },

    // ! Meat Recipes Methods
    // * Get All Recipes Methods
    async getMeatCollection({state}) {

      let meatRecipesRef = fb.meatRecipesCollection;
      try {
        let allMeatRecipesSnapshot = await meatRecipesRef.get();
        state.meatCollection = [];
        allMeatRecipesSnapshot.forEach(doc => {
          const singleMeatRecipe = doc.data();
          singleMeatRecipe["id"] = doc.id;
          state.meatCollection.push(singleMeatRecipe);
          console.log(singleMeatRecipe);
        })
      } catch (error) {
        console.log(error);
      }

    },

    async deleteMeatRecipe({state}, id) {
      try {
        await fb.meatRecipesCollection.doc(id).delete();
        alert('Successfully deleted Recipe');
      } catch(error) {
        console.log(error);
      }
    },

    async updateMeatRecipe({}, itemForUpdate) {
      try {
        await fb.meatRecipesCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          description: itemForUpdate.description,
          src: itemForUpdate.src
        });
        alert("Recipe was updated!");
      } catch (error) {
        console.log(error);
      }
    },

    async createMeatRecipe({state}, payload) {
      const meatRecipe = {
        name: payload.name,
        description: payload.description,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.meatRecipesCollection.add(meatRecipe);
      key = data.id;
      const fileName = payload.src.name;
      const ext = fileName.slice(fileName.lastIndexOf("."));
      const fileData = await storageRef
        .child("meatRecipesImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      await fb.meatRecipesCollection.doc(key).get();
      await fb.meatRecipesCollection.doc(key).update({
        src: imageUrl
      });
    }

  }
})
