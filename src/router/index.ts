import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'SignIn',
    component: () => import('@/pages/SignIn.vue')
  },
  {
    path: '/overview',
    name: 'overview',
    component: () => import('@/components/NavDrawer.vue'),
    children: [
      {
        path: '',
        redirect: '/users',
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('@/pages/UserList.vue'),
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
