import '@/api/firebase.config';
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from '@/core/vuetify'
import '@/core/filters';

Vue.config.productionTip = false;

// TODO validate file uploading
// TODO paging
// TODO image resizing

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
