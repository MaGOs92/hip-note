import Vue from 'vue';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';

import App from './App';
import router from './router';
import store from './store';

import { dateFormated, dateRelative } from './filters/date';
import { markedDown } from './filters/marked';

const theme = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}

Vue.use(Vuetify, {theme});
Vue.filter('dateFormated', dateFormated);
Vue.filter('dateRelative', dateRelative);
Vue.filter('marked', markedDown);
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
