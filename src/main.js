import Vue from 'vue'
import App from './App.vue'
import '@kouts/vue-modal/dist/vue-modal.css';

import VueModal from '@kouts/vue-modal';

import babelPolyfill from 'babel-polyfill';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router/router'

import {store} from './vuex/store';
import {auth} from './firebase';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component('Modal', VueModal);

// Potrebno instalirati babel-polyfill i importovati

// npm i -D babel-core babel-polyfill babel-preset-es2015 babel-preset-stage-0 babel-loader

// import babelPolyfill from 'babel-polyfill';

// pocetna verzija koda

// new Vue({
//   el: '#app',
//   router,
//   render: h => h(App)
// })

// nova verzija koda

Vue.config.productionTip = false;

let app
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    store.state.authorized = true;
    store.dispatch('fetchUserProfile', user)
  }
})
