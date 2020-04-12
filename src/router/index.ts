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
  let redirectParams = {};
  const { AuthModule } = store.state;

  if (!AuthModule.authState) {
    await store.dispatch(CHECK_AUTH);
  }

  if (to.matched.some((route => route.meta.requiredAuth))) {
    if (AuthModule.authState === AuthMode.SIGNED_OUT) {
      redirectParams = { name: 'SignIn' };
    }
  } else if (to.matched.some((route => route.meta.requiredUnauth))) {
    if (AuthModule.authState === AuthMode.SIGNED_IN) {
      redirectParams = { name: 'Overview' };
    }
  }

  next(redirectParams);
});

export default router;
