import { CHECK_AUTH, SIGN_OUT } from '../action-types';
import { MutationTree } from 'vuex';
import { Person } from '@/models/person';
import { AuthState, AuthMode } from '@/models/store/auth/auth-state';

const mutations: MutationTree<AuthState> = {
  [CHECK_AUTH](state: AuthState, person: Person)   {
    state.me = person;
    state.authState = AuthMode.SIGNED_IN;
  },
  [SIGN_OUT](state)   {
    state.me = undefined;
    state.authState = AuthMode.SIGNED_OUT;
  },
}

export default mutations;
