import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '@/models/store/root-state';
import { AuthModule } from './auth';
import { PersonModule } from './person';
import { PositionModule } from './position';
import { DepartmentModule } from './department';
import { UiUtilsModule } from './ui-utils';
import { DocumentLinkModule } from './document-link';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    AuthModule,
    PersonModule,
    PositionModule,
    DepartmentModule,
    UiUtilsModule,
    DocumentLinkModule,
  }
};

export default new Vuex.Store<RootState>(store);
