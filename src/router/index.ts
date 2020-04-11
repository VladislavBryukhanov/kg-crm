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
        redirect: '/persons',
      },
      {
        path: '/persons',
        name: 'Users',
        component: () => import('@/pages/UserList.vue'),
      },
      {
        path: '/new-person',
        name: 'CreatePerson',
        component: () => import('@/pages/PersonConstructor.vue'),
      },
      {
        path: '/edit-person',
        name: 'EditPerson',
        // ... some meta data
        component: () => import('@/pages/PersonConstructor.vue'),
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
