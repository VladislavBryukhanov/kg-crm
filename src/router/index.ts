import { SIGN_OUT } from '../store/action-types';
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';
import store from '@/store';
import { CHECK_AUTH } from '@/store/action-types';
import { AuthMode } from '@/models/store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const checkMeta = (targetKey: string) => to.matched.some(route => route.meta[targetKey]);
  const { AuthModule } = store.state;

  let redirectParams = {};

  if (!AuthModule.authState) {
    await store.dispatch(CHECK_AUTH);
  }

  const isMeAdmin = AuthModule.me && AuthModule.me.isAdmin;
  const matchPersonalId = AuthModule.me && AuthModule.me.id === to.params['personId']

  if (checkMeta('personal') && !isMeAdmin && !matchPersonalId) {
    await store.dispatch(SIGN_OUT);
  }

  if (checkMeta('requiredAdmin') && !isMeAdmin) {
    await store.dispatch(SIGN_OUT);
  }

  if (checkMeta('requiredAuth') && AuthModule.authState === AuthMode.SIGNED_OUT) {
    redirectParams = { name: 'SignIn' };
  }
  
  if (checkMeta('requiredUnauth') && AuthModule.authState === AuthMode.SIGNED_IN) {
    redirectParams = { name: 'Overview' };
  }

  next(redirectParams);
});

export default router;
