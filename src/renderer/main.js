import Vue from 'vue';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';

import App from './App';
import router from './router';
import store from './store';

import { dateFormated, dateRelative } from './filters/date';

Vue.use(Vuetify);
Vue.filter('dateFormated', dateFormated);
Vue.filter('dateRelative', dateRelative);
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
