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

    // ! MEAT RECIPES METHODS

    // * Get All Meat Recipes Method
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

    // * Delete Meat Recipe Method
    async deleteMeatRecipe({state}, id) {
      try {
        await fb.meatRecipesCollection.doc(id).delete();
        alert('Successfully deleted Recipe');
      } catch(error) {
        console.log(error);
      }
    },

    // * Update Meat Recipe Method
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

    // * Create new Meat Recipe Method
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
    },

    // ! DESSERT RECIPES METHODS

    // * Get All Dessert Recipes Method
    async getDessertCollection({state}) {

      let dessertRecipesRef = fb.dessertRecipesCollection;
      try {
        let allDessertRecipesSnapshot = await dessertRecipesRef.get();
        state.dessertCollection = [];
        allDessertRecipesSnapshot.forEach(doc => {
          const singleDessertRecipe = doc.data();
          singleDessertRecipe["id"] = doc.id;
          state.dessertCollection.push(singleDessertRecipe);
          console.log(singleDessertRecipe);
        })
      } catch (error) {
        console.log(error);
      }
    },

    // * Delete Dessert Recipe Method
    async deleteDessertRecipe({state}, id) {
      try {
        await fb.dessertRecipesCollection.doc(id).delete();
        alert('Successfully deleted Recipe');
      } catch(error) {
        console.log(error);
      }
    },

    // * Update Dessert Recipe Method
    async updateDessertRecipe({}, itemForUpdate) {
      try {
        await fb.dessertRecipesCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          description: itemForUpdate.description,
          src: itemForUpdate.src
        });
        alert("Recipe was updated!");
      } catch (error) {
        console.log(error);
      }
    },

    // * Create new Dessert Recipe Method
    async createDessertRecipe({state}, payload) {
      const dessertRecipe = {
        name: payload.name,
        description: payload.description,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.dessertRecipesCollection.add(dessertRecipe);
      key = data.id;
      const fileName = payload.src.name;
      const ext = fileName.slice(fileName.lastIndexOf("."));
      const fileData = await storageRef
        .child("dessertRecipesImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      await fb.dessertRecipesCollection.doc(key).get();
      await fb.dessertRecipesCollection.doc(key).update({
        src: imageUrl
      });
    },

    // ! VEGGIE RECIPES METHODS

    // * Get All Veggie Recipes Method
    async getVeggieCollection({state}) {

      let veggieRecipesRef = fb.veggieRecipesCollection;
      try {
        let allVeggieRecipesSnapshot = await veggieRecipesRef.get();
        state.veggieCollection = [];
        allVeggieRecipesSnapshot.forEach(doc => {
          const singleVeggieRecipe = doc.data();
          singleVeggieRecipe["id"] = doc.id;
          state.veggieCollection.push(singleVeggieRecipe);
          console.log(singleVeggieRecipe);
        })
      } catch (error) {
        console.log(error);
      }
    },

    // * Delete Veggie Recipe Method
    async deleteVeggieRecipe({state}, id) {
      try {
        await fb.veggieRecipesCollection.doc(id).delete();
        alert('Successfully deleted Recipe');
      } catch(error) {
        console.log(error);
      }
    },

    // * Update Veggie Recipe Method
    async updateVeggieRecipe({}, itemForUpdate) {
      try {
        await fb.veggieRecipesCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          description: itemForUpdate.description,
          src: itemForUpdate.src
        });
        alert("Recipe was updated!");
      } catch (error) {
        console.log(error);
      }
    },

    // * Create new Veggie Recipe Method
    async createVeggieRecipe({state}, payload) {
      const veggieRecipe = {
        name: payload.name,
        description: payload.description,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.veggieRecipesCollection.add(veggieRecipe);
      key = data.id;
      const fileName = payload.src.name;
      const ext = fileName.slice(fileName.lastIndexOf("."));
      const fileData = await storageRef
        .child("veggieRecipesImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      await fb.veggieRecipesCollection.doc(key).get();
      await fb.veggieRecipesCollection.doc(key).update({
        src: imageUrl
      });
    },

    // ! PASTA RECIPES METHODS

    // * Get All Pasta Recipes Method
    async getPastaCollection({state}) {

      let pastaRecipesRef = fb.pastaRecipesCollection;
      try {
        let allPastaRecipesSnapshot = await pastaRecipesRef.get();
        state.pastaCollection = [];
        allPastaRecipesSnapshot.forEach(doc => {
          const singlePastaRecipe = doc.data();
          singlePastaRecipe["id"] = doc.id;
          state.pastaCollection.push(singlePastaRecipe);
          console.log(singlePastaRecipe);
        })
      } catch (error) {
        console.log(error);
      }
    },

    // * Delete Pasta Recipe Method
    async deletePastaRecipe({state}, id) {
      try {
        await fb.pastaRecipesCollection.doc(id).delete();
        alert('Successfully deleted Recipe');
      } catch(error) {
        console.log(error);
      }
    },

    // * Update Pasta Recipe Method
    async updatePastaRecipe({}, itemForUpdate) {
      try {
        await fb.pastaRecipesCollection.doc(itemForUpdate.id).update({
          name: itemForUpdate.name,
          description: itemForUpdate.description,
          src: itemForUpdate.src
        });
        alert("Recipe was updated!");
      } catch (error) {
        console.log(error);
      }
    },

    // * Create new Pasta Recipe Method
    async createPastaRecipe({state}, payload) {
      const pastaRecipe = {
        name: payload.name,
        description: payload.description,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.email,
        createdOn: new Date()
      };
      let imageUrl;
      let key;
      let storageRef = fb.storage;
      const data = await fb.pastaRecipesCollection.add(pastaRecipe);
      key = data.id;
      const fileName = payload.src.name;
      const ext = fileName.slice(fileName.lastIndexOf("."));
      const fileData = await storageRef
        .child("pastaRecipesImages/" + key + "." + ext)
        .put(payload.src);
      imageUrl = await fileData.ref.getDownloadURL();
      await fb.pastaRecipesCollection.doc(key).get();
      await fb.pastaRecipesCollection.doc(key).update({
        src: imageUrl
      });
    },
  }
})
