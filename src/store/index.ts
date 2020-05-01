import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '@/models/store/root-state';
import { AuthModule } from './auth';
import { PersonModule } from './person';
import { PositionModule } from './position';
import { UiUtilsModule } from './ui-utils';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    AuthModule,
    PersonModule,
    PositionModule,
    UiUtilsModule,
  }
};

export default new Vuex.Store<RootState>(store);
