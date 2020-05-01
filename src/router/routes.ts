import { RouteConfig } from 'vue-router';

const routes: Array<RouteConfig> = [
  {
    path: '/auth',
    name: 'SignIn',
    component: () => import('@/pages/SignIn.vue'),
    meta: { requiredUnauth: true },
  },
  {
    path: '',
    name: 'Overview',
    component: () => import('@/components/NavDrawer.vue'),
    meta: { requiredAuth: true },
    children: [
      {
        path: '',
        redirect: '/persons',
      },
      {
        path: '/persons',
        name: 'Persons',
        component: () => import('@/pages/UserList.vue'),
      },
      {
        path: '/new-person',
        name: 'CreatePerson',
        component: () => import('@/pages/PersonConstructor.vue'),
      },
      {
        path: '/edit-person/:personId',
        name: 'EditPerson',
        component: () => import('@/pages/PersonConstructor.vue'),
      },
      {
        path: '/manage-position',
        name: 'ManagePosition',
        component: () => import('@/pages/ManagePosition.vue'),
      }
    ]
  }
];

export default routes;
