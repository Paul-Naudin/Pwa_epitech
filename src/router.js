import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import Authentication from './views/Authentication.vue';
import NotFound from './views/NotFound.vue';
import MainView from './views/MainView.vue';
import store from './store';

const routes = [
  {
    path: '/authentication',
    name: 'Login',
    component: Authentication
  },
  {
    path: '/',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  await store.dispatch('user/loadUser');
  const userIsLoggedIn = store.getters['user/uid'];

  if (!userIsLoggedIn && to.path !== '/authentication') {
    next('/authentication');
  } else if (userIsLoggedIn && to.path === '/authentication') {
    next('/');
  } else {
    next();
  }

});


export default router