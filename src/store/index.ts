import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '@/models/store/root-state';
import { AuthModule } from './auth/index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    AuthModule
  }
};

export default new Vuex.Store<RootState>(store);
