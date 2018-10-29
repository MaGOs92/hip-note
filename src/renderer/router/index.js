import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/components/Home').default,
    },
    {
      path: '/editor',
      name: 'Editor',
      component: require('@/components/editor/Editor').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
