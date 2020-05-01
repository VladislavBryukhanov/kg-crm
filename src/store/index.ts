import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '@/models/store/root-state';
import { AuthModule } from './auth';
import { PersonModule } from './person';
import { PositionModule } from './position';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    AuthModule,
    PersonModule,
    PositionModule,
  }
};

export default new Vuex.Store<RootState>(store);
